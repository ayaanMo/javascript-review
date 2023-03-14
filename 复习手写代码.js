{
    // 数据类型判断
    function typeOf(obj) {
        let result = Object.prototype.toString.call(obj).split(' ')[1];
        result = result.substring(0, result.length - 1).toLowerCase();
        return result;
    }
    console.log(typeOf(1));
}
{
    // 寄生式组合继承
    // 核心内容
    function create(prototype) {
        function f() {}
        f.prototype = prototype;
        return new f();
    }
    function inheritPrototype(c, p) {
        let prototype = create(p.prototype);
        prototype.constructor = c;
        c.prototype = prototype;
    }
}
{
    // 深拷贝
    function cloneDeep(target, hash = new WeakMap()) {
        if (obj === null) return target;
        if (typeof obj !== 'object') return target;
        if (obj instanceof Date) return new Date(target);
        if (obj instanceof RegExp) return new RegExp(target);
        if (obj instanceof HTMLElement) return target;
        if (hash.get(target)) return hash.get(target);
        let source = new target.constructor();
        hash.set(target, source);
        Reflect.ownKeys(target).forEach(key => {
            source[key] = cloneDeep(target[key], hash);
        });
        return source;
    }
}
{
    // new的实现
    function _new(ctor) {
        if (typeof ctor !== 'function') {
            throw new Error('This is not a function.');
        }
        let args = [].slice.call(arguments, 1);
        let newObj = Object.create(ctor.prototype);
        let result = ctor.apply(newObj, args);
        return (result =
            result !== null &&
            (typeof result === 'object' || typeof result === 'function')
                ? result
                : newObj);
    }
}
{
    // call的实现
    Function.prototype.myCall = function (context) {
        var context = context || window;
        var fn = Symbol();
        context[fn] = this;
        let arr = [];
        for (let i = 1; i < args.length; i++) {
            arr.push('arr[' + i + ']');
        }
        let result = eval('context[fn](' + arr + ')');
        delete context[fn];
        return result;
    };
    // apply的实现
    Function.prototype.myApply = function (context, arr) {
        var context = context || window;
        var fn = Symbol();
        context[fn] = this;
        let result = null;
        if (!arr) {
            result = context[fn]();
        } else {
            let arr = [];
            for (let i = 1; i < args.length; i++) {
                arr.push('arr[' + i + ']');
            }
            result = eval('context[fn](' + arr + ')');
        }
        delete context[fn];
        return result;
    };
    // bind的实现
    Function.prototype.myBind = function (context) {
        let args = [].slice.call(arguments, 1);
        let fn = this;
        function bindFunc() {
            let arg = [].slice.call(arguments, 0);
            return fn.apply(
                this instanceof InheritPrototype ? this : context,
                args.concat(arg)
            );
        }
        function InheritPrototype() {}
        InheritPrototype.prototype = fn.prototype;
        bindFunc.prototype = new InheritPrototype();
        bindFunc.constructor = bindFunc;
        return bindFunc;
    };
}
{
    // 防抖
    function debounce(fn, wait) {
        let timer;
        return function () {
            let args = [].slice.call(arguments, 0);
            let context = this;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        };
    }
    // 节流
    function throttleDate(fn, wait) {
        let preDate = 0;
        return function () {
            let nowDate = +new Date();
            let args = [].slice.call(arguments, 0);
            let context = this;
            if (nowDate > preDate + wait) {
                fn.apply(context, args);
                preDate = nowDate;
            }
        };
    }
    function throttleTimer(fn, wait) {
        let timer = null;
        return function () {
            let args = [].slice.call(arguments, 0);
            let context = this;
            if (timer) return;
            timer = setTimeout(() => {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        };
    }
}
{
    // 柯里化 是思想 将函数分拆成一元函数
    function add(a, b, c) {
        return a + b + c;
    }
    function curry(fn) {
        return function next(...args) {
            if (fn.length === args.length) {
                return fn(...args);
            } else {
                return function (...arg) {
                    return next(...args, ...arg);
                };
            }
        };
    }
    let sum = curry(add);
    console.log(sum(1, 2, 3));
    console.log(sum(1)(2)(3));
    console.log(sum(1)(2, 3));
}
{
    // 偏函数 存在一个预设的概念，预设一个值，后面函数可以传递其他的值
    function partial(fn) {
        let args = [].slice.call(arguments, 1);
        return function () {
            let arg = [...arguments];
            console.log(args.concat(arg));
            return fn.apply(this, args.concat(arg));
        };
    }
    function mul(a, b, c) {
        return a * b * c;
    }
    let f = partial(mul, 1);
    console.log(f(2, 3));
    console.log(f(4, 5));
    console.log(f(3, 7));
}
