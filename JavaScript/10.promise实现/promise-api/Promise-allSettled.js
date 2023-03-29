const MyPromise = require('../index');
/**
 * 所有promise实例全部都结束 不管成功都是失败
 */
MyPromise.allSettled = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (
            promises !== null &&
            typeof promises[Symbol.iterator] === 'function'
        ) {
            if (promises.length === 0) return resolve(promises);
            let count = 0;
            let result = [];
            for (let [index, item] of promises.entries()) {
                count++;
                MyPromise.resolve(item).then(
                    value => {
                        result.push({ status: 'fulfilled', value: value });
                        count === promises.length && resolve(result);
                    },
                    reason => {
                        result.push({ status: 'rejected', reason: reason });
                        count === promises.length && resolve(result);
                    }
                );
            }
        } else {
            return new TypeError('promises is not iterable');
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
var p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject(123);
    }, 1000);
});
var p2 = new MyPromise((resolve, reject) => {
    reject(new Error('123123'));
});
var p3 = new MyPromise((resolve, reject) => {
    resolve(789);
});
MyPromise.allSettled([p1, p2, p3])
    .then(first => {
        // 只要有一个 fetch() 请求成功
        console.log(first);
    })
    .catch(error => {
        // 所有三个 fetch() 全部请求失败
        console.log(error);
    });
