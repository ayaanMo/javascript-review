const MyPromise = require('../index');
// const MyPromise = require('../mypromise');
/**
 * Promise.all()方法用于将多个Promise实例，包装成一个新的Promse实例
 * 1.将接受一个数组作为参数；
 * 2.数组的每个元素都是Promise的实例，如果不是Promise的实例则使用Promise.resolve方法，将参数转为Promise实例
 * 3.参数可以不是数组，但是必须具有Iterator接口，且返回的每个成员都是Promise实例
 * 4.整体的状态由各个元素执行的结果决定，都为fulfilled时，将元素的返回值组成一个数组，传递给回调函数
 * 5.一旦有一个元素返回的转改是rejected，则整体的状态将是rejected，并且将第一个被rejected的实例的返回值，传递给回调函数
 */
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (
            promises != null &&
            typeof promises[Symbol.iterator] === 'function'
        ) {
            if (promises.length === 0) {
                return resolve(promises);
            }
            let result = [];
            let count = 0;
            for (let [index, item] of promises.entries()) {
                MyPromise.resolve(item).then(
                    value => {
                        count++;
                        result[index] = value;
                        count === promises.length && resolve(result);
                    },
                    reason => {
                        reject(reason);
                    }
                );
            }
        } else {
            return reject(new TypeError('promises is not iterable'));
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
// let p1 = MyPromise.all();
// let p2 = MyPromise.all(123);
// console.log(p1);
// console.log(p2);
// var a = new MyPromise((resolve, reject) => {
//     reject('123123');
// });
// var b = new MyPromise((resolve, reject) => {
//     reject('456');
// });
// var c = new MyPromise((resolve, reject) => {
//     resolve('32424234');
// });

// MyPromise.all([a, c]).then(values => {
//     console.log(values);
// });
// const promise1 = MyPromise.resolve(3);
// const promise2 = 42;
// const promise3 = new MyPromise((resolve, reject) => {
//     setTimeout(resolve, 100, 'foo');
// });

// MyPromise.all([promise1, promise2, promise3]).then(values => {
//     console.log(values);
// });

var p1 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 1000, 'one');
});
var p2 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 2000, 'two');
});
var p3 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 3000, 'three');
});
var p4 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 4000, 'four');
});
var p5 = new MyPromise((resolve, reject) => {
    reject('reject');
});

MyPromise.all([p1, p2, p3, p4, p5]).then(
    values => {
        console.log(values);
    },
    reason => {
        console.log(reason);
    }
);

//From console:
//"reject"
