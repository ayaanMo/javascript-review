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
        reject(error);
    }
}
MyPromise.PENDING = 'pending';
MyPromise.FULFILLED = 'fulfilled';
MyPromise.REJECTED = 'rejected';
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
            if (typeof onFulfilled === 'function') {
                onFulfilled(this.PromiseResult);
            } else {
            }
        });
    } else if (this.PromiseState === MyPromise.REJECTED) {
        setTimeout(() => {
            if (typeof onRejected === 'function') {
                onRejected(this.PromiseResult);
            } else {
            }
        });
    } else if (this.PromiseState === MyPromise.PENDING) {
        this.onFulfilledCallback.push(() => {
            setTimeout(() => {
                onFulfilled(this.PromiseResult);
            });
        });
        this.onRejectedCallback.push(() => {
            setTimeout(() => {
                onRejected(this.PromiseResult);
            });
        });
    }
};
console.log(1);
let promise1 = new MyPromise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        console.log('A', promise1.PromiseState);
        resolve('这次一定');
        console.log('B', promise1.PromiseState);
        console.log(4);
    });
});
promise1.then(
    result => {
        console.log('C', promise1.PromiseState);
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason);
    }
);
console.log(3);
/* const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success');
    }, 2000);
});
promise.then(value => {
    console.log(1);
    console.log('resolve', value);
});
promise.then(value => {
    console.log(2);
    console.log('resolve', value);
});
promise.then(value => {
    console.log(3);
    console.log('resolve', value);
}); */
