const MyPromise = require('../index');
/**
 * 参数分成四种情况：
 * 1.如果参数是一个Promise的实例，则Promise.resolve不做任何修改直接返回这个实例
 * 2.参数是一个thenable对象,然后立即执行then内部的方法
 * 3.参数不具有then的方法的对象，或者根本不是对象，则返回一个新的Promise对象，状态为resolved，PromiseResutl为该值
 * 4.不带任何参数，直接返回一个resolved状态的Promise对象
 */
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

// MyPromise.resolve = function (value) {
//     // 如果这个值是一个 promise ，那么将返回这个 promise
//     if (value instanceof MyPromise) {
//         return value;
//     } else if (value instanceof Object && 'then' in value) {
//         // 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
//         return new MyPromise((resolve, reject) => {
//             value.then(resolve, reject);
//         });
//     }

//     // 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)
//     return new MyPromise(resolve => {
//         resolve(value);
//     });
// };

const promise1 = MyPromise.resolve(123);

promise1.then(value => {
    console.log(value);
    // expected output: 123
});

// Resolve一个thenable对象
var p1 = MyPromise.resolve({
    then: function (onFulfill) {
        onFulfill('Resolving');
    },
});
console.log(p1 instanceof MyPromise); // true, 这是一个Promise对象

setTimeout(() => {
    console.log('p1 :>> ', p1);
}, 1000);

p1.then(
    function (v) {
        console.log(v); // 输出"fulfilled!"
    },
    function (e) {
        // 不会被调用
    }
);

// Thenable在callback之前抛出异常
// myPromise rejects
var thenable = {
    then: function (resolve) {
        throw new TypeError('Throwing');
        resolve('Resolving');
    },
};

var p2 = MyPromise.resolve(thenable);
p2.then(
    function (v) {
        // 不会被调用
    },
    function (e) {
        console.log(e); // TypeError: Throwing
    }
);
