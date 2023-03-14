const MyPromise = require('../index');
/**
 * Promise.race 哪个实例率先改变状态，则该状态就跟着改变，那个率先改变的Promise实例的返回值，就传给回调
 */

MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        if (
            promises !== null &&
            typeof promises[Symbol.iterator] === 'function'
        ) {
            if (promises.length === 0) return resolve(promises);
            for (let item of promises) {
                MyPromise.resolve(item).then(resolve, reject);
            }
        } else {
            return reject(new TypeError('promises is not iterator'));
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
/**
 * 验证Promise.race()方法
 */

// 数组全是非Promise值，测试通过
let p1 = MyPromise.race([1, 3, 4]);
setTimeout(() => {
    console.log('p1 :>> ', p1);
});

// 空数组，测试通过
let p2 = MyPromise.race([]);
setTimeout(() => {
    console.log('p2 :>> ', p2);
});

const p11 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const p22 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

// // 数组里有非Promise值，测试通过
MyPromise.race([p11, p22, 10]).then(value => {
    console.log('p3 :>> ', value);
    // Both resolve, but p22 is faster
});
// expected output: 10

// 数组里有'已解决的Promise' 和 非Promise值 测试通过
let p12 = MyPromise.resolve('已解决的Promise');
setTimeout(() => {
    MyPromise.race([p12, p22, 10]).then(value => {
        console.log('p4 :>> ', value);
    });
    // expected output:已解决的Promise
});

// Promise.race的一般情况 测试通过
const p13 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const p14 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});

MyPromise.race([p13, p14]).then(value => {
    console.log('p5 :>> ', value);
    // Both resolve, but promise2 is faster
});

MyPromise.race('123123123').then(value => {
    console.log('p600:>> ', value);
});
