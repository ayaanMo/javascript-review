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

function createDom(fiber) {
    const dom =
        fiber.type == 'TEXT_ELEMENT'
            ? document.createTextNode('')
            : document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);

    return dom;
}

const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
    //Remove old or changed event listeners
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    // Remove old properties
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, nextProps))
        .forEach(name => {
            dom[name] = '';
        });

    // Set new or changed properties
    Object.keys(nextProps)
        .filter(isProperty)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            dom[name] = nextProps[name];
        });

    // Add event listeners
    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });
}
/**
 * 第五步 Render和Commit阶段
 * commit阶段完成后，用一个变量来保存旧的fiber树（称为currentRoot）来和当前要修改的fiber树进行比较
 * 每个wipRoot上新增一个属性alternate用来链接旧的fiber树(上一次commit后的)
 *
 */
function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    // commit阶段完成后，保存当前fiber树
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
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom);
    } else {
        commitDeletion(fiber.child, domParent);
    }
}
/**
 *
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
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

let nextUnitOfWork = null;
let currentRoot = null;
let wipRoot = null;
let deletions = null;

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
    // WipRoot: Work in progress
    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
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
 *  处理完一个fiber节点，会将childfiber作为下一个任务单元
 *  如果没有child节点则会把兄弟节点作为下一个任务单元
 *  如果既没有child节点也没有兄弟节点，那么会去找父节点的兄弟节点作为下一个任务单元
 *  如果一直没找到，会沿着父节点一直往上找，直到找到root节点，宣布完成了整个fiber tree的render
 * @param {*} fiber
 * @returns
 */
function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;
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

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
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
        nextUnitOfWork = wipRoot;
        deletions = [];
    };

    wipFiber.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
}

function updateHostComponent(fiber) {
    // 创建一个dom元素，挂载到fiber的dom属性
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;

        const sameType = oldFiber && element && element.type == oldFiber.type;

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
        if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index === 0) {
            wipFiber.child = newFiber;
        } else if (element) {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;
        index++;
    }
}

const Zact = {
    createElement,
    render,
    useState,
};
// 注释一下，babel 会将 JSX 编译的时候会调用我们的createElement方法 将jsx解析成我们要的js代码
/** @jsx Zact.createElement */
function Counter() {
    const [state, setState] = Zact.useState(1);
    return (
        <h1 onClick={() => setState(c => c + 1)} style="user-select: none">
            Count: {state}
        </h1>
    );
}
const element = <Counter />;
const container = document.getElementById('root');
Zact.render(element, container);
