Function.prototype.call = function(context, ...args) {
  // 判断是否为undefined或null，如果是则指向全局对象
  context = context || window;
  // 为context添加一个fn属性，值为当前函数
  context.fn = this;
  // 执行context.fn，并将args传入
  const result = context.fn(...args);
  // 删除context.fn
  delete context.fn;
  // 返回执行结果
  return result;
}
Function.prototype.bind = function(context, ...args1) {
  // 保存当前函数
  const fn = this;
  // 返回一个新函数
  return function(...args2) {
    // 将context作为this传入fn函数，并将args1和args2合并传入
    return fn.apply(context, [...args1, ...args2]);
  }
}

// 发布订阅模式
class EventEmitter {
  constructor() {
    // 事件对象，存放订阅的名字和事件
    this.events = {};
  }
  // 订阅事件的方法
  on(eventName, callback) {
    if (!this.events[eventName]) {
      // 注意：一个事件名可以订阅多个事件函数
      this.events[eventName] = [callback];
    } else {
      // 存在则push到指定数组的尾部保存
      this.events[eventName].push(callback);
    }
  }
  // 触发事件的方法
  emit(eventName, ...rest) {
    // 遍历执行所有订阅的事件
    this.events[eventName] && this.events[eventName].forEach((f) => f.apply(this, rest));
  }
  // 移除订阅事件
  remove(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((f) => f !== callback);
    }
  }
  // 只执行一次订阅的事件，然后移除
  once(eventName, callback) {
    // 绑定的时fn，但是我们需要在内部将其包装一下，使其执行完毕自动解绑
    const fn = (...rest) => {
      callback.apply(this, rest);
      this.remove(eventName, fn);
    };
    this.on(eventName, fn);
  }
}
// 数组扁平化
const flatten = (arr) => {
  // 判断arr中是否还有数组
  while (arr.some((item) => Array.isArray(item))) {
    // 使用concat和展开运算符将arr扁平化一层
    arr = [].concat(...arr);
  }
  return arr;
}; 

// 示例
const arr = [1, [2, [3, 4]]];
console.log(flatten(arr)); // [1, 2, 3, 4]
// promise.all实现
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    // 存放每个promise的结果
    const result = [];
    // 计数器，用于判断所有promise是否都已经执行完毕
    let count = 0;
    // 遍历每个promise
    promises.forEach((promise, index) => {
      // 调用Promise.resolve，兼容传入非Promise对象
      Promise.resolve(promise).then((res) => {
        // 将结果存入对应的位置
        result[index] = res;
        // 计数器加1
        count++;
        // 所有promise都执行完毕，resolve结果数组
        if (count === promises.length) {
          resolve(result);
        }
      }).catch((err) => {
        // 任意一个promise出错，reject错误信息
        reject(err);
      });
    });
  });
};// promise的实现
class MyPromise {
  constructor(executor) {
    // promise的三种状态
    this.PENDING = 'pending';
    this.FULFILLED = 'fulfilled';
    this.REJECTED = 'rejected';
    // 初始化状态为pending
    this.status = this.PENDING;
    // 初始化值为undefined
    this.value = undefined;
    // 初始化原因为undefined
    this.reason = undefined;
    // 存放成功回调的数组
    this.onFulfilledCallbacks = [];
    // 存放失败回调的数组
    this.onRejectedCallbacks = [];
    // 成功回调
    const resolve = (value) => {
      // 只有状态为pending时才能转换状态
      if (this.status === this.PENDING) {
        // 将状态改为fulfilled
        this.status = this.FULFILLED;
        // 保存成功的值
        this.value = value;
        // 依次执行所有成功回调
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };
    // 失败回调
    const reject = (reason) => {
      // 只有状态为pending时才能转换状态
      if (this.status === this.PENDING) {
        // 将状态改为rejected
        this.status = this.REJECTED;
        // 保存失败的原因
        this.reason = reason;
        // 依次执行所有失败回调
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      // 执行executor函数
      executor(resolve, reject);
    } catch (err) {
      // 如果executor函数抛出异常，直接执行失败回调
      reject(err);
    }
  }
  // then方法
  then(onFulfilled, onRejected) {
    // 如果onFulfilled不是函数，将其设为默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    // 如果onRejected不是函数，将其设为默认函数
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason };
    // 返回一个新的promise
    const promise2 = new MyPromise((resolve, reject) => {
      // 如果状态为fulfilled，执行onFulfilled
      if (this.status === this.FULFILLED) {
        // 使用setTimeout将其变为异步执行，以便获取promise2
        setTimeout(() => {
          try {
            // 执行onFulfilled，并获取返回值
            const x = onFulfilled(this.value);
            // 处理返回值，并将其传入resolve中
            this.handleResolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 如果执行onFulfilled时抛出异常，直接执行reject
            reject(err);
          }
        }, 0);
      }
      // 如果状态为rejected，执行onRejected
      if (this.status === this.REJECTED) {
        // 使用setTimeout将其变为异步执行，以便获取promise2
        setTimeout(() => {
          try {
            // 执行onRejected，并获取返回值
            const x = onRejected(this.reason);
            // 处理返回值，并将其传入resolve中
            this.handleResolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            // 如果执行onRejected时抛出异常，直接执行reject
            reject(err);
          }
        }, 0);
      }
      // 如果状态为pending，将onFulfilled和onRejected存入对应的数组中
      if (this.status === this.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // 使用setTimeout将其变为异步执行，以便获取promise2
          setTimeout(() => {
            try {
              // 执行onFulfilled，并获取返回值
              const x = onFulfilled(this.value);
              // 处理返回值，并将其传入resolve中
              this.handleResolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              // 如果执行onFulfilled时抛出异常，直接执行reject
              reject(err);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          // 使用setTimeout将其变为异步执行，以便获取promise2
          setTimeout(() => {
            try {
              // 执行onRejected，并获取返回值
              const x = onRejected(this.reason);
              // 处理返回值，并将其传入resolve中
              this.handleResolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              // 如果执行onRejected时抛出异常，直接执行reject
              reject(err);
            }
          }, 0);
        });
      }
    });
    // 返回新的promise
    return promise2;
  }
  // 处理返回值
  handleResolvePromise(promise2, x, resolve, reject) {
    // 如果返回值为promise2，直接抛出错误
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 如果返回值为promise，需要等待其状态改变后再执行resolve或reject
    if (x instanceof MyPromise) {
      x.then((value) => {
        this.handleResolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      // 如果返回值为普通值，直接执行resolve
      resolve(x);
    }
  }
  // catch方法
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  // finally方法
  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value),
      (reason) => MyPromise.resolve(onFinally()).then(() => { throw reason })
    );
  }
  // 静态resolve方法
  static resolve(value) {
    // 如果value为promise，直接返回
    if (value instanceof MyPromise) {
      return value;
    }
    // 如果value为thenable对象，将其转换为promise对象并返回
    if (value && typeof value.then === 'function') {
      return new MyPromise((resolve, reject) => {
        value.then(resolve, reject);
      });
    }
    // 如果value为普通值，返回一个fulfilled状态的promise
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }
  // 静态reject方法
  static reject(reason) {
    // 返回一个rejected状态的promise
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
// 电话号码正则
const phoneRegex = /^1[3456789]\d{9}$/;
// 查找字符串包含${}的正则
const regex = /\$\{.*?\}/g;// 使用正则表达式查找字符串中包含${}的部分
const regex = /\$\{.*?\}/g;
// Generator实现
function* generator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

// 使用示例
const gen = generator();
console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// 将Generator函数转换为Promise对象
function generatorToPromise(generatorFunc) {
  return new Promise((resolve, reject) => {
    const gen = generatorFunc();
    function step(nextFunc) {
      let next;
      try {
        next = nextFunc();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        (v) => {
          step(() => gen.next(v));
        },
        (e) => {
          step(() => gen.throw(e));
        }
      );
    }
    step(() => gen.next());
  });
}

// 使用示例
const asyncFunc = generatorToPromise(function* () {
  const result1 = yield Promise.resolve(1);
  console.log(result1); // 1
  const result2 = yield Promise.resolve(2);
  console.log(result2); // 2
  return result1 + result2;
});
asyncFunc.then((result) => {
  console.log(result); // 3
});
// 柯里化函数
function curry(fn) {
  return function curried(...args) {
    // 如果传入的参数个数小于函数参数个数，返回一个新的函数
    if (args.length < fn.length) {
      return function (...args2) {
        return curried(...args.concat(args2));
      };
    }
    // 如果传入的参数个数大于等于函数参数个数，直接执行函数
    return fn.apply(this, args);
  };
}

// 使用示例
function add(a, b, c) {
  return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// 柯里化函数的另一种实现方式
function curry2(fn) {
  return function curried(...args) {
    // 如果传入的参数个数小于函数参数个数，返回一个新的函数
    if (args.length < fn.length) {
      return curried.bind(null, ...args);
    }
    // 如果传入的参数个数大于等于函数参数个数，直接执行函数
    return fn.apply(this, args);
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}
const curriedMultiply = curry2(multiply);
console.log(curriedMultiply(1)(2)(3)); // 6
console.log(curriedMultiply(1, 2)(3)); // 6
console.log(curriedMultiply(1)(2, 3)); // 6
console.log(curriedMultiply(1, 2, 3)); // 6
// 哈希算法
// 哈希算法是一种将任意长度的消息压缩到某一固定长度的消息摘要的函数。
// 常见的哈希算法有MD5、SHA-1、SHA-256等。以下是一个使用SHA-256算法计算消息摘要的示例代码：

const crypto = require('crypto');

function sha256(data) {
  const hash = crypto.createHash('sha256');
  hash.update(data);
  return hash.digest('hex');
}

console.log(sha256('hello world')); // 输出：b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
// 二分查找
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// 使用示例
const arr = [1, 3, 5, 7, 9];
console.log(binarySearch(arr, 3)); // 1
console.log(binarySearch(arr, 4)); // -1
// 链表结构
// 链表是一种常见的数据结构，它由一系列节点组成，每个节点包含两个部分：数据和指向下一个节点的指针。
// 链表有单向链表、双向链表和循环链表等多种形式。
// 以下是一个单向链表的实现示例：

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 在链表末尾添加节点
  append(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // 在链表指定位置插入节点
  insert(index, val) {
    if (index < 0 || index > this.size) {
      return false;
    }
    if (index === 0) {
      this.prepend(val);
      return true;
    }
    if (index === this.size) {
      this.append(val);
      return true;
    }
    const node = new ListNode(val);
    let curr = this.head;
    for (let i = 0; i < index - 1; i++) {
      curr = curr.next;
    }
    node.next = curr.next;
    curr.next = node;
    this.size++;
    return true;
  }

  // 在链表头部添加节点
  prepend(val) {
    const node = new ListNode(val, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
  }

  // 删除链表指定位置的节点
  delete(index) {
    if (index < 0 || index >= this.size) {
      return false;
    }
    if (index === 0) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      this.size--;
      return true;
    }
    let curr = this.head;
    for (let i = 0; i < index - 1; i++) {
      curr = curr.next;
    }
    curr.next = curr.next.next;
    if (!curr.next) {
      this.tail = curr;
    }
    this.size--;
    return true;
  }

  // 获取链表指定位置的节点值
  get(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    return curr.val;
  }

  // 修改链表指定位置的节点值
  set(index, val) {
    if (index < 0 || index >= this.size) {
      return false;
    }
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr.next;
    }
    curr.val = val;
    return true;
  }

  // 反转链表
  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    [this.head, this.tail] = [this.tail, this.head];
  }
}

// 使用示例
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
list.insert(2, 1.5);
list.delete(4);
console.log(list.get(2)); // 1.5
list.set(2, 2);
list.reverse();
// 偏函数是指固定一个函数的一些参数，然后产生另一个更小元的函数。
// 以下是一个实现偏函数的示例代码：

function partial(fn, ...args) {
  return function (...rest) {
    return fn(...args, ...rest);
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}
const partialMultiply = partial(multiply, 2);
console.log(partialMultiply(3, 4)); // 24
console.log(partialMultiply(4, 5)); // 40

// 在上面的代码中，partial函数接收一个函数fn和一些参数args，返回一个新函数，这个新函数接收一些参数rest，然后调用fn函数并传入args和rest两部分参数。通过partial函数，我们可以将一个多参数函数转换为一个偏函数，这个偏函数只接收部分参数，从而方便我们进行函数组合和复用。// 由于前端框架处理大数据时需要考虑性能问题，因此可以使用链表来存储和操作数据，因为链表的插入和删除操作时间复杂度为O(1)，而数组的插入和删除操作时间复杂度为O(n)。可以使用上述链表实现对大数据的高效处理。
// 由于前端框架处理大数据时需要考虑性能问题，因此可以使用链表来存储和操作数据，因为链表的插入和删除操作时间复杂度为O(1)，而数组的插入和删除操作时间复杂度为O(n)。可以使用上述链表实现对大数据的高效处理。
// 以下是一个使用链表处理大数据的示例代码：

// 创建一个链表
const list = new LinkedList();

// 向链表中添加大量数据
for (let i = 0; i < 1000000; i++) {
  list.append(i);
}

// 在链表指定位置插入数据
list.insert(500000, 999999);

// 删除链表指定位置的数据
list.delete(100000);

// 获取链表指定位置的数据
console.log(list.get(500000)); // 999999

// 修改链表指定位置的数据
list.set(500000, 888888);

// 反转链表
list.reverse();

// instanceof的实现
function myInstanceOf(obj, constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// 使用示例
function Person() {}
const p = new Person();
console.log(myInstanceOf(p, Person)); // true
console.log(myInstanceOf(p, Object)); // true
console.log(myInstanceOf(p, Array)); // false
// new的实现
function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// 使用示例
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old.`);
};
const p1 = myNew(Person, 'Alice', 18);
p1.sayHello(); // Hello, my name is Alice, I'm 18 years old.
