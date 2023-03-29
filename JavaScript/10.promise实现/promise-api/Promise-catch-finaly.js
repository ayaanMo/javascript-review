const MyPromise = require('../index');
MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};
MyPromise.prototype.finally = function (callBack) {
    return this.then(callBack, callBack);
};
