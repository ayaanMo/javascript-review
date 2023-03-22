function typeOf(target) {
    let result = Object.prototype.toString.call(target).split(' ')[1];
    result = result.substr(0, result.length - 1).toLowerCase();
    if (
        result === 'undefined' ||
        result === 'number' ||
        result === 'string' ||
        result === 'boolean' ||
        result === 'symbol' ||
        result === 'bigint' ||
        result === 'function'
    ) {
        return result;
    }
    return 'object';
}
console.log(typeOf(undefined));
console.log(typeOf(null));
console.log(typeOf(123));
console.log(typeOf('undefined'));
console.log(typeOf(false));
console.log(typeOf(Symbol()));
console.log(typeOf(BigInt(3)));
console.log(typeOf({}));
console.log(typeOf(null));
console.log(typeOf([]));
console.log(typeOf(function () {}));
