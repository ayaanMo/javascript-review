const MyPromise = require('../index');
/**
 * Promise.any
 * 1.参数可以不是数组，但是必须具有Iterator接口，且返回的每个成员都是Promise实例
 * 2.会执行所有实例，只要有一个状态为fulfilled 则Promise.any的状态就为fulfilled;
 * 3.当所有实例都为rejcted的时候，该实例才会为rejected
 * 4.不为promise实例的对象则通过resolve转成Promise对象
 */
MyPromise.any = function (promises) {
    return new MyPromise((resolve, reject) => {
        try {
            if (
                promises !== null &&
                typeof promises[Symbol.iterator] === 'function'
            ) {
                if (promises.length === 0) {
                    throw new AggregateError([], 'All promises were rejected');
                }
                let count = 0;
                let error = [];
                for (let [index, item] of promises.entries()) {
                    MyPromise.resolve(item).then(
                        value => {
                            resolve(value);
                        },
                        reason => {
                            error.push(reason);
                            count++;
                            count === promises.length &&
                                reject(
                                    new AggregateError(
                                        [],
                                        'All promises were rejected'
                                    )
                                );
                        }
                    );
                }
            } else {
                throw new TypeError('promises is not iterable');
            }
        } catch (error) {
            return reject(error);
        }
    });
};
MyPromise.resolve = function (promise) {
    if (promise === null || promise === undefined) {
        return new MyPromise(resolve => {
            resolve();
        });
    } else if (promise instanceof MyPromise) {
        return promise;
    } else if (typeof promise === 'object' && promise.then) {
        return new MyPromise((resolve, reject) => {
            promise.then(resolve, reject);
        });
    } else {
        return new MyPromise(resolve => {
            resolve(promise);
        });
    }
};
MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};
/**
 * 验证Promise.any()方法
 */

// console.log(new AggregateError('All promises were rejected'));

MyPromise.any([]).catch(e => {
    console.log(e);
});

const pErr = new MyPromise((resolve, reject) => {
    reject('总是失败');
});

const pSlow = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 500, '最终完成');
});

const pFast = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, '很快完成');
});

MyPromise.any([pErr, pSlow, pFast]).then(value => {
    console.log(value);
    // 期望输出: "很快完成"
});

const pErr1 = new MyPromise((resolve, reject) => {
    reject('总是失败');
});

const pErr2 = new MyPromise((resolve, reject) => {
    reject('总是失败');
});

const pErr3 = new MyPromise((resolve, reject) => {
    reject('总是失败');
});

MyPromise.any([pErr1, pErr2, pErr3]).catch(e => {
    console.log(e);
});
