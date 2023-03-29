function typeOf(obj) {
    let type = Object.prototype.toString.call(obj).split(' ')[1];
    type = type.substring(0, type.length - 1).toLowerCase();
    return type;
}
console.log(typeOf(123));
console.log(typeOf([1, 2, 3]));
console.log(typeOf('123'));
console.log(typeOf(true));
console.log(typeOf({}));
console.log(typeOf(function name(params) {}));
