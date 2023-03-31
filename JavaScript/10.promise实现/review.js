MyPromise.PENDING = 'pending';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';
function MyPromise(fn) {
    this.PromiseState = MyPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    try {
        fn(resolve.bind(this), reject.bind(this));
    } catch (error) {
        reject.call(this, error);
    }

    function resolve(value) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.FULFILLED;
            this.PromiseResult = value;
            this.onFulfilledCallback.forEach(callback => {
                callback();
            });
        }
    }
    function reject(reason) {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseState = MyPromise.REJECTED;
            this.PromiseResult = reason;
            this.onRejectedCallback.forEach(callback => {
                callback();
            });
        }
    }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : reason => {
                      throw reason;
                  };
        if (this.PromiseState === MyPromise.FULFILLED) {
            // 2.2.4 onFulfilled 或 onRejected 只在执行环境堆栈只包含平台代码之后调用 [3.1]
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.PromiseResult);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        } else if (this.PromiseState === MyPromise.REJECTED) {
            // 2.2.4 onFulfilled 或 onRejected 只在执行环境堆栈只包含平台代码之后调用 [3.1]
            setTimeout(() => {
                try {
                    let x = onRejected(this.PromiseResult);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        } else if (this.PromiseState === MyPromise.PENDING) {
            // 这个地方是为了避免then函数比resolve和reject先执行了，把各自的回调存起来
            this.onFulfilledCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            this.onRejectedCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        }
    });
    return promise2;
};
function resolvePromise(promise2, x, resolve, reject) {
    // 2.3.1 如果Promise和x引用同一对象，则以TypeError为原因拒绝Promise
    if (promise2 === x) {
        throw new TypeError('Chaining cycle detected for promise');
    }
    // 2.3.2 如果 x 是一个 promise 实例，则采用它的状态
    if (x instanceof MyPromise) {
        // 这个接受x的状态  不是很理解 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
        /**
         *2.3.2.1 如果 x 是 pending 状态，那么保留它（递归执行这个 promise 处理程序），直到 pending 状态转为 fulfilled 或 rejected 状态
         *2.3.2.2 如果或当 x 状态是 fulfilled，resolve 它，并且传入和 promise1 一样的值 value
         *2.3.2.3 如果或当 x 状态是 rejected，reject 它，并且传入和 promise1 一样的值 reason
         */
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject);
        }, reject);
    } else if (
        // 2.3.3 此外，如果 x 是个对象或函数类型
        x !== null &&
        (typeof x === 'object' || typeof x === 'function')
    ) {
        try {
            // 2.3.3.1 把 x.then 赋值给 then 变量
            var then = x.then;
            let flag = false;
            if (typeof then === 'function') {
                try {
                    // 2.3.3.3 如果 then 是函数类型，那个用 x 调用它（将 then 的 this 指向 x）,第一个参数传 resolvePromise ，第二个参数传 rejectPromise
                    then.call(
                        x,
                        // 2.3.3.3.1 如果或当 resolvePromise 被调用并接受一个参数 y 时，执行 [[Resolve]](promise, y)
                        y => {
                            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
                            if (!flag) {
                                flag = true;
                                resolvePromise(promise2, y, resolve, reject);
                            }
                        },
                        // 2.3.3.3.2 如果或当 rejectPromise 被调用并接受一个参数 r 时，执行 reject(r)
                        r => {
                            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
                            if (!flag) {
                                flag = true;
                                reject(r);
                            }
                        }
                    );
                    // 2.3.3.4 如果 then 执行过程中抛出了异常，
                } catch (error) {
                    // 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略异常
                    if (!flag) {
                        flag = true;
                        // 2.3.3.3.4.2 否则，则 reject 这个异常
                        reject(error);
                    }
                }
            } else {
                resolve(x);
            }
        } catch (error) {
            reject(error);
        }
    } else {
        // 2.3.4 如果 x 即不是函数类型也不是对象类型，直接 resolve x（resolve(x)）
        resolve(x);
    }
}
/**
 * 1.如果参数是一个promise的实例，则Promise.resolve不做任何修改直接返回这个实例
 * 2.如果参数是一个对象，并且带有then方法，则立即执行then内部方法，然后再返回一个promise
 * 3.如果参数不存在，则直接返回一个新的promise 然后是fulfilled状态
 * 4.其他类型的参数，都是直接返回该值
 * @param {*} target
 */

MyPromise.resolve = function (target) {
    if (target === null && target === undefined) {
        return new MyPromise((resolve, reject) => {
            resolve();
        });
    }
    if (
        typeof target === 'object' &&
        target.then &&
        typeof target.then === 'function'
    ) {
        return new MyPromise((resolve, reject) => {
            target.then(resolve, reject);
        });
    }
    if (target instanceof MyPromise) {
        return target;
    }
    return new MyPromise((resolve, reject) => {
        resolve(target);
    });
};

MyPromise.reject = function (target) {
    return new MyPromise((reslove, reject) => {
        reject(target);
    });
};
const MyPromise = require('./10.promise实现/review');

/**
 * Promise.all的实现
 * 1.传入的参数原型链上必须要实现了迭代器的接口；
 * 2.回传是一个promise
 */
MyPromise.all = function (params) {
    try {
        if (
            params[Symbol.iterator] &&
            typeof params[Symbol.iterator] === 'function'
        ) {
            const result = [];
            return new MyPromise((resolve, reject) => {
                params.forEach(item => {
                    MyPromise.resolve(item).then(
                        value => {
                            result.push(value);
                            result.length === params.length && resolve(result);
                        },
                        reason => {
                            reject(reason);
                        }
                    );
                });
            });
        }
    } catch (error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        });
    }
};
// var p1 = new MyPromise((resolve, reject) => {
//     resolve(1);
// });
// var p2 = new MyPromise((resolve, reject) => {
//     reject(2);
// });
// MyPromise.all([p1, p2]).then(
//     value => {
//         console.log(value, 'value');
//     },
//     reason => {
//         console.log(reason, 'reason');
//     }
// );
MyPromise.allSettled = function (params) {
    try {
        if (
            params[Symbol.iterator] &&
            typeof params[Symbol.iterator] === 'function'
        ) {
            const result = [];
            return new MyPromise((resolve, reject) => {
                params.forEach(item => {
                    MyPromise.resolve(item).then(
                        value => {
                            result.push({
                                status: 'fulfilled',
                                value: value,
                            });
                            result.length === params.length && resolve(result);
                        },
                        reason => {
                            result.push({
                                status: 'rejected',
                                value: reason,
                            });
                            result.length === params.length && resolve(result);
                        }
                    );
                });
            });
        }
    } catch (error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        });
    }
};
// var p1 = new MyPromise((resolve, reject) => {
//     resolve(1);
// });
// var p2 = new MyPromise((resolve, reject) => {
//     reject(2);
// });
// MyPromise.allSettled([p1, p2]).then(
//     value => {
//         console.log(value, '31313');
//     },
//     reason => {
//         console.log(reason);
//     }
// );
MyPromise.race = function (params) {
    try {
        if (
            params[Symbol.iterator] &&
            typeof params[Symbol.iterator] === 'function'
        ) {
            return new MyPromise((resolve, reject) => {
                params.forEach(item => {
                    MyPromise.resolve(item).then(
                        value => {
                            resolve(value);
                        },
                        reason => {
                            reject(reason);
                        }
                    );
                });
            });
        }
    } catch (error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        });
    }
};
// var p1 = new MyPromise((resolve, reject) => {
//     resolve(1);
// });
// var p2 = new MyPromise((resolve, reject) => {
//     reject(2);
// });
// MyPromise.race([p1, p2]).then(
//     value => {
//         console.log(value);
//     },
//     reason => {
//         console.log(reason);
//     }
// );
MyPromise.any = function (params) {
    try {
        if (
            params[Symbol.iterator] &&
            typeof params[Symbol.iterator] === 'function'
        ) {
            let count = 0;
            return new MyPromise((resolve, reject) => {
                params.forEach(item => {
                    MyPromise.resolve(item).then(
                        value => {
                            resolve(value);
                        },
                        reason => {
                            count += 1;
                            if (count === params.length) {
                                console.log(44444);
                                reject(
                                    new AggregateError(
                                        [],
                                        'AggregateError: All promises were rejected'
                                    )
                                );
                            }
                        }
                    );
                });
            });
        }
    } catch (error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        });
    }
};
//  var p1 = new MyPromise((resolve, reject) => {
//      reject(3);
//  });
//  var p2 = new MyPromise((resolve, reject) => {
//      reject(2);
//  });
//  MyPromise.any([p2, p1]).then(
//      value => {
//          console.log(value);
//      },
//      reason => {
//          console.log(reason);
//      }
//  );
// let promise1 = new MyPromise((resolve, reject) => {
//     resolve('resolve111');
// });
// promise1
//     .then(
//         value => {
//             return new MyPromise((resolve, reject) => {
//                 resolve(value);
//             });
//         },
//         () => {}
//     )
//     .then(
//         value => {
//             console.log(value);
//         },
//         () => {}
//     );
// console.log('--------------');
// let promise2 = new Promise((resolve, reject) => {
//     resolve('resolve');
// });
// promise2
//     .then(
//         value => {
//             return new Promise((resolve, reject) => {
//                 resolve(value);
//             });
//         },
//         () => {}
//     )
//     .then(
//         value => {
//             console.log(value);
//         },
//         () => {}
//     );
// MyPromise.deferred = function () {
//     let result = {};
//     result.promise = new MyPromise((resolve, reject) => {
//         result.resolve = resolve;
//         result.reject = reject;
//     });
//     return result;
// };
module.exports = MyPromise;
