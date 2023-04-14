{
    function curry(fn) {
        return function next(...args) {
            if (fn.length === args.length) {
                return fn(...args);
            } else {
                return function (...arg) {
                    return next(...arg, ...args);
                };
            }
        };
    }
    function add(a, b, c) {
        return a + b + c;
    }
    const f = curry(add);
    console.log(f(2)(1)(5));
}
