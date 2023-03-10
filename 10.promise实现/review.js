function MyPromise(fn) {
    this.PromiseState = MyPromise.PENDING;
    this.PromiseResult = null;
    this.onRejectedCallback = [];
    this.onFulfilledCallback = [];
    const resolve = value => {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseResult = value;
            this.PromiseState = MyPromise.FULFILLED;
            this.onFulfilledCallback.forEach(callback => {
                callback(value);
            });
        }
    };
    const reject = reason => {
        if (this.PromiseState === MyPromise.PENDING) {
            this.PromiseResult = reason;
            this.PromiseState = MyPromise.REJECTED;
            this.onRejectedCallback.forEach(callback => {
                callback(reason);
            });
        }
    };
    try {
        fn(resolve.bind(this), reject.bind(this));
    } catch (error) {
        reject.call(this, error);
    }
}
MyPromise.PENDING = 'pending';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
        if (this.PromiseState === MyPromise.FULFILLED) {
            setTimeout(() => {
                try {
                    if (typeof onFulfilled === 'function') {
                        let x = onFulfilled(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } else {
                        resolve(this.PromiseResult);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        } else if (this.PromiseState === MyPromise.REJECTED) {
            setTimeout(() => {
                try {
                    if (typeof onRejected === 'function') {
                        let x = onRejected(this.PromiseResult);
                        resolvePromise(promise2, x, resolve, reject);
                    } else {
                        reject(this.PromiseResult);
                    }
                } catch (error) {
                    reject(error);
                }
            });
        } else if (this.PromiseState === MyPromise.PENDING) {
            this.onFulfilledCallback.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onFulfilled === 'function') {
                            let x = onFulfilled(this.PromiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        } else {
                            resolve(this.PromiseResult);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            this.onRejectedCallback.push(() => {
                setTimeout(() => {
                    try {
                        if (typeof onRejected === 'function') {
                            let x = onRejected(this.PromiseResult);
                            resolvePromise(promise2, x, resolve, reject);
                        } else {
                            reject(this.PromiseResult);
                        }
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
    if (x === promise2) {
        throw new TypeError('Chaining cycle detected for promise');
    }
    if (x instanceof MyPromise) {
        x.then(y => {
            resolvePromise(promise2, y, resolve, reject);
        }, reject);
    } else if (
        x !== null &&
        (typeof x === 'object' || typeof x === 'function')
    ) {
        try {
            var then = x.then;
        } catch (error) {
            return reject(error);
        }
        if (typeof then === 'function') {
            let called = false;
            try {
                then.call(
                    x,
                    y => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise2, y, resolve, reject);
                    },
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
            resolve(x);
        }
    } else {
        resolve(x);
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
