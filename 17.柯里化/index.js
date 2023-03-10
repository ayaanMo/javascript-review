{
    /*  sum(1, 2, 3);
    sum(1)(2, 3);
    sum(1)(2)(3); */
    function curry(fn) {
        return function next(...args) {
            if (fn.length === args.length) {
                return fn(...args);
            }
            return function (...arg) {
                return next(...args, ...arg);
            };
        };
    }
    function fn(a, b, c) {
        return a + b + c;
    }
    let sum = curry(fn);
    console.log(sum(1, 2, 3));
    console.log(sum(1)(2, 3));
    console.log(sum(1)(2)(3));
}
