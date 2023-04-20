/**
 * 第一步：解析JSX转换成JS
 * @param {*} type
 * @param {*} props
 * @param  {...any} children
 * @returns
 */
function createElement(type, props, ...children) {
    return {
        // 标记 元素类型
        type,
        // 元素的属性
        props: {
            ...props,
            // 子元素
            children: children.map(child =>
                // 标记 是否是普通文本类型还是DOM节点
                typeof child === 'object' ? child : createTextElement(child)
            ),
        },
    };
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: [],
        },
    };
}
// 下一个工作单元
let nextUnitOfWork = null;
// 当前节点
let currentRoot = null;
// WipRoot: Work in progress
let wipRoot = null;
// 需要删除的节点
let deletions = null;
/**
 * 在React16的版本之前，react是通过stack reconciler，利用调用栈实现遍历
 * 16版本之后react推出了并发模式，原理将虚拟DOM树划分成一个小任务，这里就有了Fiber树，然后浏览器的任务都是由任务队列调度，这个时候如果实在主线程空闲的状态的时候再去处理Fiber，
 * react推出了Scheduler来实现任务调度，这个地方是是通过requestLdleCallback来实现  这两个过程就是任务分片和任务调度
 * Fiber的结构 ReactElement对象是虚拟DOM的一种表示方法，一个ReactElement对象对应一个FiberNode
 * {
 *      type:element.type
 *      props:element.props
 *      child:Fiber 子节点
 *      sibling:Fiber 兄弟节点
 *      parent:Fiber 父节点
 * }
 * @param {*} element
 * @param {*} container
 * render阶段负责：
 *  生成Fiber树
 *  为Fiber创建对应的DOM节点。确保进入commit前，每个Fiber上都有节点。但DOM节点的更新、插入、删除由commit负责
 * commit阶段再次遍历Fiber树,将DOM节点挂载到文档上
 */
function render(element, container) {
    debugger;
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        },
        // 和上一次的commit阶段的就fiber树建立链接
        alternate: currentRoot,
    };
    deletions = [];
    nextUnitOfWork = wipRoot;
}

/**
 * 任务调度，在主线程上，每个空闲的时间片长度不一，希望在一个时间片有限的时间内尽量多的执行任务
 * 因此在处理完一个单位任务之后查询是否存在空闲，再决定是否只执行下一个单位任务
 * 调用requestIdleCallback(callback)
 * 一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态
 * @param {*} deadline
 */
function workLoop(deadline) {
    // 是否要暂停
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        // 执行一个工作单元并返回下一个工作单元
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        // 判断空闲时间是否足够
        // IdeleDeaedline.timeRemaining() 返回一个时间DOMHighResTimeStamp，并且是浮点类型的数值，它用来表示当前闲置周期的预估剩余毫秒数
        shouldYield = deadline.timeRemaining() < 1;
    }
    // 所有工作单元都执行完后，我们一并 进行 提交 操作，commitRoot 里进行所有元素 往 dom 树 上添加的动作
    // WipRoot: Work in progress 进入commit阶段的判断条件：有一棵树在渲染流程中，并且render阶段已执行完毕
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
}
/**
 * 第五步 Render和Commit阶段
 * commit阶段完成后，用一个变量来保存旧的fiber树（称为currentRoot）来和当前要修改的fiber树进行比较
 * 每个wipRoot上新增一个属性alternate用来链接旧的fiber树(上一次commit后的)
 *
 */
function commitRoot() {
    // 移除第六步中收集的旧节点
    deletions.forEach(commitWork);
    // commit当前wipRoot的child元素
    commitWork(wipRoot.child);
    // commit阶段完成后，保存当前fiber树 改变当前root指向
    currentRoot = wipRoot;
    wipRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    let domParentFiber = fiber.parent;
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.dom;

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        // 更新dom的属性(新增新属性和移除旧属性) 及事件的添加和移除处理
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}
/**
 * 删除节点
 * @param {*} fiber
 * @param {*} domParent
 */
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
}
requestIdleCallback(workLoop);
/**
 * 每个元素都是一个fiber，每一个fiber都是一个任务单元
 * fiber节点完成下述三件事:
 *  1.把element添加到DOM上;
 *  2.为该fiber节点的子节点新建fiber
 *  3.挑出下一个任务单元
 * fiber数据结构说明是为了更方便的找到下一个任务单元，因此每个fiber都会指向它的第一个子节点，它的下一个兄弟节点和父节点
 *  fiber找下一个节点的规则
 *  沿着child指针向下遍历，直到叶子节点
 *  叶子节点依赖sibling指针向右遍历该层兄弟节点
 *  兄弟节点遍历完毕再沿parent指针回到上一层
 *  直到回到根节点停止
 * @param {*} fiber
 * @returns
 * 处理单位任务
 *  1.创建DOM
 *  2.为当前Fiber的所有子元素创建Fiber,并且构建连接
 *  3.按照深度优先遍历的顺序(child>sibling>parent) 确定下一个待处理的任务
 */
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
    // 区分 函数式组件
    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }
    // 如果有child fiber 则返回child
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        // 如果有sibling fiber，则返回sibling
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        // 否则返回 parent fiber
        nextFiber = nextFiber.parent;
    }
}
// 保存当前的fiber
let wipFiber = null;
// 保存当前执行hool的索引，区分每次执行是哪个hook
let hookIndex = null;
/**
 * 处理函数组件
 * @param {*} fiber
 */
function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    // 执行函数式组件获取children
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}
/**
 * 处理普通组件
 * @param {*} fiber
 */
function updateHostComponent(fiber) {
    // 创建一个dom元素，挂载到fiber的dom属性
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber?.props?.children);
}
function createDom(fiber) {
    const dom =
        fiber.type == 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);
    // 会将旧属性和新属性进行比对，然后会针对 事件 属性
    updateDom(dom, {}, fiber.props);

    return dom;
}
// 事件属性
const isEvent = key => key.startsWith('on');
// 除时间属性和特殊属性 children
const isProperty = key => key !== 'children' && !isEvent(key);
// 是否为新增属性
const isNew = (prev, next) => key => prev[key] !== next[key];
// 是否要移除属性
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
    //Remove old or changed event listeners 移除旧事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    // Remove old properties 移除旧属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = '';
        });

    // Set new or changed properties 添加或更新新属性
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name];
        });

    // Add event listeners 添加监听新的监听事件
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
}
/**
 *  第六步 Reconciliation 协调阶段
 * @param {*} wipFiber
 * @param {*} elements
 */
function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        const sameType = oldFiber && element && element.type == oldFiber.type;
        // 类型相同，更新属性
        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE',
            };
        }
        // 类型不同，但是新fiber元素存在，则进行更新（新增新的fiber）
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT',
            };
        }
        // 类型不同，但是就fiber树存在，则进行移除（先保存起来，在commit阶段一并移除）
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }
        // 下个循环对兄弟fiber进行比较
        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }
        // 如果是第一个子元素，则把新的fiber挂到wioFiber的child属性上
        if (index === 0) {
            wipFiber.child = newFiber;
        } else if (element) {
            // 其他的子元素，挂到上一个子元素的sibling属性上去
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
}
function useState(initial) {
    const oldHook =
        wipFiber.alternate &&
        wipFiber.alternate.hooks &&
        wipFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: [],
    };

    const actions = oldHook ? oldHook.queue : [];
    actions.forEach(action => {
        hook.state = action(hook.state);
    });

    const setState = action => {
        hook.queue.push(action);
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot,
        };
        // 设置为下一个工作单元，这样就可以开启一个新的渲染
        nextUnitOfWork = wipRoot;
        deletions = [];
    };

    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
}

const Zact = {
    createElement,
    render,
    useState,
};
// 注释一下，babel 会将 JSX 编译的时候会调用我们的createElement方法 将jsx解析成我们要的js代码
/** @jsx Zact.createElement */
const element = (
    <div style="background: salmon">
        <h1>Hello World</h1>
        <h2 style="text-align:right">from Didact</h2>
    </div>
);
// function Counter() {
//     const [state, setState] = Zact.useState(1);
//     return (
//         <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
//             Count: {state}
//         </h1>
//     );
// }
// const element = <Counter />;
const container = document.getElementById('root');
Zact.render(element, container);
