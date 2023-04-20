/**
 * Promise 的特点：

异步操作结果的占位符：Promise 是一种用于处理异步操作的对象，它可以将异步操作的结果保存在内部，并允许在未来某个时间点访问这些结果。
状态管理机制：Promise 对象有三种状态：进行中、已完成和已失败。并且一旦进入了其中一种状态，就不能再改变。
链式调用：Promise 对象提供了 then 方法来注册回调函数，可以链式调用多个 then 方法，依次处理异步操作的结果。
Promise 的优缺点：

优点：

可以避免回调地狱，使代码更加可读、易于维护。
Promise 对象具有状态管理机制，能够统一处理异步操作的结果，并且支持链式调用，可以简化异步代码的编写。
缺点：

Promise 对象的使用需要学习一定的语法和方法，对初学者来说可能会有一定的学习成本。
Promise 对象的错误处理相对比较复杂，需要使用 catch 方法或者在每个 then 方法后面都添加错误处理回调函数。
Promise 链：

Promise 链是指通过多次调用 then 方法，依次处理异步操作的结果的过程。在 Promise 链中，then 方法返回的是一个新的 Promise 对象，因此可以继续调用 then 方法，形成链式调用的效果。

Promise 构造函数执行和 then 函数执行的区别：

Promise 构造函数执行是在创建 Promise 对象时立即执行的，它会接收一个回调函数作为参数，并在回调函数中执行异步操作。

then 函数执行则是在 Promise 对象状态改变时触发的，它的参数是两个回调函数：第一个回调函数用于处理异步操作成功的结果，第二个回调函数用于处理异步操作失败的结果。当 Promise 对象状态改变时，then 方法会根据当前状态调用相应的回调函数

 * 2.1
 * 第一步：初始结构
 * 1.定义整体结构;
 * 2.考虑new promise 入参是一个函数还是同步执行函数
 * 3.promise入参函数有两个形参resolve和reject对应的函数方法
 * 4.promise内部有三个状态padding、fulfilled、reject，定义三个静态常量
 * 5.实例初始化的状态为padding
 * 第二步:resolve和reject的实现
 * 6.resolve和reject的内部实现，当前实例状态为padding的时候才能进行状态改变，并且三种状态相互之间是不能相互改变的
 * 7.满足resolve和reject的执行条件，resolve执行成功状态变成fulfilled reject执行失败，结果返回是rejected 结果存入 PromiseState
 * 8.resolve和reject都有回传值的结果，定义为PromiseResult
 * 2.3
 * 第三步 then的实现
 * 1.根据实例内部的状态值，判断是走onFulfilled还是onRejected
 * 2.处理new Promise执行函数的时候，出现异常的情况，直接调用reject  一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法
 * 3.then函数中的onFulfilled和onRejected函数是可选函数，如果不是函数类型直接忽略，所谓的忽略是原值直接返回
 * 第四步  异步的实现
 * 1.(2.2.4)then函数中的onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
 * 2.手写代码发现then函数比resolve先执行，这个时候then的内部Promise状态还属于padding状态，所以这个地方需要处理then方法内部promisetate状态为padding的时候，增加两个实例的成员
 * 变量onFulfilledCallbacks和onRejectedCallbacks 让两个异步函数保证时在resolve之后再触发调用；
 * 3.由于再轮循回调函数的时候要确保其是在其他同步代码全部执行完之后再执行，这个时候存入数组的回调也要加上setTimeout
 * 第五步 then方法的链式调用
 * 第六步
 */
class MyPromise {
    // 1.promise 存在三种状态，定义静态成员变量 pending、fulfilled、rejected
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(fn) {
        // 4.原生promise使用PromiseState保存实例的状态属性，初始状态为padding
        this.PromiseState = MyPromise.PENDING;
        // 6.原生promise存储resolve和reject的时候都会存储一个结果参数，命名规则遵循promise
        this.PromiseResult = null;
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
        //3.promise内部定义了两个形参 resolve和reject 并且实现两个方法 初始化赋值为null 后面不管是reject和reslove的调用都会为其重新赋值
        function resolve(result) {
            // 5.执行resolve的时候，前一状态必须为padding
            if (this.PromiseState === MyPromise.PENDING) {
                // 5.1如果状态是padding则把实例的状态改成fulfilled
                this.PromiseState = MyPromise.FULFILLED;
                // 6.1将resolve的结果值存入PromiseResult
                this.PromiseResult = result;
                // 12.3这个地方在then的时候存入成功的回调，再调用resolve的时候重新执行成功回调
                this.onFulfilledCallbacks.forEach(callback => {
                    callback(result);
                });
            }
        }
        // 5.2执行reject的时候，前一状态必须为padding
        function reject(reason) {
            // 5.3如果状态是padding则把实例的状态改成rejected
            if (this.PromiseState === MyPromise.PENDING) {
                this.PromiseState = MyPromise.REJECTED;
                // 6.2将reject的结果值存入PromiseResult
                this.PromiseResult = reason;
                // 12.4这个地方在then的时候存入成功的回调，再调用reject的时候重新执行成功回调
                this.onRejectedCallbacks.forEach(callback => {
                    callback(reason);
                });
            }
        }
        // 9.new Promise内部执行函数的时候 异常情况的处理，直接走reject的处理
        try {
            // 2.new Prmise(()=>{}) 需要传递一个参数,并且这个函数是立即执行 两个形参是resolve和reject
            // 7.防止resolve和reject内部的this丢失，此时的this是指向实例对象
            fn(resolve.bind(this), reject.bind(this));
        } catch (error) {
            // 9.1.针对fn函数执行时候的异常处理
            reject.call(this, error);
        }
    }

    then(onFulfilled, onRejected) {
        // 10. 2.2.1 onFulfilled 和 onRejected 都是可选参数 如果不是函数则值会被忽略，所谓的忽略不是完全不管，而是将值原本的返回 onFulfilled返回原本的value，onRejected返回reason
        /* onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : reason => {
                      throw reason;
                  }; */
        // 2.2.7 then方法一定返回一个promise
        const promise2 = new MyPromise((resolve, reject) => {
            // 8.调用then方法的时候 根据实例内部的状态值来判断，为fulfilled的时候走onFulfilled
            if (this.PromiseState === MyPromise.FULFILLED) {
                //11.设置onFulfilled为异步执行 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
                setTimeout(() => {
                    try {
                        // 2.2.7.3 如果 onFulfilled 不是一个函数，并且 promise1 状态是 fulfilled，那么 promise2 一定会接受到与 promse1 一样的值 value
                        if (typeof onFulfilled !== 'function') {
                            resolve(this.PromiseResult);
                        } else {
                            let x = onFulfilled(this.PromiseResult);
                            // 2.2.7.1 如果 onFulfilled 或 onRejected 返回的是一个 x，那么它会以[[Resolve]](promise2, x) 处理解析
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        // 2.2.7.2 如果 onFulfilled 或 onRejected 里抛出了一个异常，那么 promise2 必须捕获这个错误（接受一个 reason 参数）
                        reject(error);
                    }
                });
            }
            // 8.1为fulfilled的时候走onRejected
            else if (this.PromiseState === MyPromise.REJECTED) {
                //11.1 设置onRejected为异步执行 2.2.4 onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用
                setTimeout(() => {
                    try {
                        // 2.2.7.4 如果 onRejected 不是一个函数，并且 promise1 状态是 rejected，promise2 一定会接受到与 promise1 一样的值 reason
                        if (typeof onRejected !== 'function') {
                            reject(this.PromiseResult);
                        } else {
                            let x = onRejected(this.PromiseResult);
                            // 2.2.7.1 如果 onFulfilled 或 onRejected 返回的是一个 x，那么它会以[[Resolve]](promise2, x) 处理解析
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (error) {
                        // 2.2.7.2 如果 onFulfilled 或 onRejected 里抛出了一个异常，那么 promise2 必须捕获这个错误（接受一个 reason 参数）
                        reject(error);
                    }
                });
                /**
                 * 12.在代码执行顺序的情况下，假如跟resolve加上异步的情况，then属于微任务先执行了，这个时候的Promise的状态还是pendding，等到执行resolve的时候不会重新触发then方法
                 * 所以这个地方会重新在考虑到手写的promise实现的时候 then应该是在resolve后再执行
                 */
            } else if (this.PromiseState === MyPromise.PENDING) {
                // 12.1这个定法定义实例的成员对象用于存储成功函数的回调
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onFulfilled !== 'function') {
                                // 2.3.2.2 如果或当 x 状态是 fulfilled，resolve 它，并且传入和 promise1 一样的值 value
                                resolve(this.PromiseResult);
                            } else {
                                // 13.由于onFulfilled也是异步函数，所以这个地方也加上定时器，使其变成宏任务

                                let x = onFulfilled(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
                // 12.2这个定法定义实例的成员对象用于存储失败函数的回调
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            if (typeof onRejected !== 'function') {
                                // 2.3.2.3 如果或当 x 状态是 rejected，reject 它，并且传入和 promise1 一样的值 reason
                                reject(this.PromiseResult);
                            } else {
                                // 13.1 由于onFulfilled也是异步函数，所以这个地方也加上定时器，使其变成宏任务

                                let x = onRejected(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
                });
            }
        });
        return promise2;
    }
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise  promise.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
    // 2.3.1 如果返回的 promise1 和 x 是指向同一个引用（循环引用），则抛出错误
    if (x === promise2) {
        throw new TypeError('Chaining cycle detected for promise');
    }
    // 2.3.2 如果 x 是一个 promise 实例，则采用它的状态
    if (x instanceof MyPromise) {
        // 2.3.2.1 如果 x 是 pending 状态，那么保留它（递归执行这个 promise 处理程序），直到 pending 状态转为 fulfilled 或 rejected 状态
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject);
        }, reject);
        // 2.3.3 此外，如果 x 是个对象或函数类型
    } else if (
        x !== null &&
        (typeof x === 'object' || typeof x === 'function')
    ) {
        try {
            // 2.3.3.1 把 x.then 赋值给 then 变量
            var then = x.then;
        } catch (error) {
            // 2.3.3.2 如果捕获（try，catch）到 x.then 抛出的错误的话，需要 reject 这个promise
            return reject(error);
        }
        if (typeof then === 'function') {
            // 2.3.3.3 如果 then 是函数类型，那个用 x 调用它（将 then 的 this 指向 x），第一个参数传 resolvePromise ，第二个参数传 rejectPromise
            // 2.3.3.3.1 如果或当 resolvePromise 被调用并接受一个参数 y 时，执行 [[Resolve]](promise, y)
            // 2.3.3.3.2 如果或当 rejectPromise 被调用并接受一个参数 r 时，执行 reject(r)
            let called = false; // 避免多次调用
            try {
                then.call(
                    x,
                    // 2.3.3.3.1 如果或当 resolvePromise 被调用并接受一个参数 y 时，执行 [[Resolve]](promise, y)
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    // 2.3.3.3.2 如果或当 rejectPromise 被调用并接受一个参数 r 时，执行 reject(r)
                    r => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // 2.3.3.4 如果 then 不是函数类型，直接 resolve x（resolve(x)）
            resolve(x);
        }
    } else {
        //2.3.4 如果 x 即不是函数类型也不是对象类型，直接 resolve x（resolve(x)）
        return resolve(x);
    }
}

MyPromise.deferred = function () {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });
    return result;
};
module.exports = MyPromise;
