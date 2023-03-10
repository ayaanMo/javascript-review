const MyPromise = require('./index');

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
        console.log('fulfilled:', result);
    },
    reason => {
        console.log('rejected:', reason);
    }
);
console.log(3);
