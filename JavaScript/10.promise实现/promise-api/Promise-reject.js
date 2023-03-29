const MyPromise = require('../index');
/**
 * Promise.reject(reason) 会返回一个新的Promise，并且状态为rejected
 */
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => {
        reject(reason);
    });
};

MyPromise.reject(new Error('fail')).then(
    function () {
        // not called
    },
    function (error) {
        console.error(error); // Error: fail
    }
);
MyPromise.reject(new Error()).then(
    function () {
        // not called
    },
    function (error) {
        console.error(error); // Error: fail
    }
);
