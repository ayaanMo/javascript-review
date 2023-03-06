{
    // _new的实现
    /**
     * 1.创建一个新的对象，并且该形参函数内部的this指向该新的对象；
     * 2.该对象的构造函数指向该函数，并且该对象的原型对象为该函数的原型；
     * 3.需考虑该函数会存在参数
     * 4.这个构造函数有可能有返回值，假如返回值为引用值类型，则直接返回反之则返回该新的对象
     */
    function _new(fn) {
        if (typeof fn !== 'function') {
            throw '参数不是一个函数类型';
        }
        let newObj = Object.create(fn.prototype);
        let args = [].slice.call(arguments, 1);
        let result = fn.apply(newObj, args);
        return (result =
            result !== null &&
            (typeof result === 'object' || typeof result === 'function'))
            ? result
            : newObj;
    }
}
{
    // call的实现
    /**
     * 1.该函数是定义在原始Function的原型上的
     * 2.通过将函数绑定在对象，作为属性
     * 3.传入的对象如果不在则直接内部的上下文为window
     * 4.通过隐式绑定来改变函数内部的this
     * 5.要考虑存在参数列表传递
     * 6.参数列表可以通过es6里面数组扩展运算符或者便来来处理
     */
    Function.prototype.myCall = function (context) {
        let context = context || window;
        let fn = Symbol();
        context[fn] = this;
        let args = [];
        for (let i = 1; i < arguments.length; i++) {
            args.push('args[' + i + ']');
        }
        let res = eval('context[fn](' + args + ')');
        delete context[fn];
        return res;
    };
}
{
    // apply
    /**
     *   跟apply同理，只是考虑第二个入参是数组
     */
    Function.prototype.myBind = function (context, arr) {
        let context = context || window;
        let fn = Symbol();
        context[fn] = this;
        let result;
        if (!arr) {
            result = context[fn]();
        } else {
            let args = [];
            for (let i = 0; i < arr.length; i++) {
                args.push('arr[' + i + ']');
            }
            result = eval('context[fn](' + args + ')');
        }
        delete context[fn];
        return result;
    };
}
{
    // bind的实现
    /**
     *  1.函数存在于Function的原型上
     *  2.需要考虑参数列表
     *  3.返回值为一个新的函数
     *  4.还需要考虑返回回去的函数有可能需要做构造函数，内部的this，以及方法本身原型不能被丢掉,并且该函数可能存在返回值
     */
    Function.prototype.myBind = function (context) {
        let self = this;
        let args = [].slice.call(arguments, 1);
        function bindFunc() {
            let bindArgs = [].slice.call(arguments, 0);
            let res = self.apply(
                this instanceof prototypeFunc ? this : context,
                args.concat(bindArgs)
            );
            return res;
        }
        function prototypeFunc() {}
        prototypeFunc.prototype = self.prototype;
        bindFunc.prototype = new prototypeFunc();
        bindFunc.constructor = bindFunc;
        return bindFunc;
    };
}
{
    // 寄生式组合继承
    /**
     * 共享属性定义在构造函数中，方法定义在原型上
     * 通过构造函数来继承父类构造函数的内部属性
     */
    function Foo(hobby) {
        this.name = [];
        this.hobby = hobby;
    }
    Foo.prototype.getHobby = function () {
        return this.hobby;
    };
    function Bar(hobby, age) {
        this.age = age;
        Foo.call(this, hobby);
    }
    function createObj(obj) {
        function f() {}
        f.prototype = obj;
        return new f();
    }
    function inheritPrototype(p, c) {
        let newObj = createObj(p.prototype);
        newObj.constructor = c;
        c.prototype = newObj;
    }
    inheritPrototype(Foo, Bar);
}
{
    // 深拷贝
    /**
     * 1.基础类型不处理；
     * 2.针对Date、RegExp不做特殊处理
     * 3.对象的循环引用
     * 4.symbol作为键值的处理
     * 5.递归
     */
    function cloneDeep(target, hash = new WeakMap()) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        if (hash.get(target)) return hash.get(target);
        const source = new target.constructor();
        hash.set(target, source);
        Reflect.ownKeys(target).forEach(keys => {
            source[keys] = cloneDeep(target[keys], hash);
        });
        return source;
    }
}
{
    // 防抖
    /**
     *事件被触发后延迟n秒再执行回调，如果在这n秒内又被触发，则重新计时
     */
    function debounce(fn, wait) {
        let timer;
        return function () {
            let context = this;
            let args = [].slice.call(arguments, 0);
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        };
    }
}
{
    // 节流
    /**
     * 在规定的时间内只会执行一次
     */
    function throttleDate(fn, wait) {
        let previous = 0;
        return function () {
            let context = this;
            let args = [].slice.call(arguments, 0);
            let nowDate = +new Date();
            if (nowDate > previous + wait) {
                fn.apply(context, args);
            }
        };
    }
    function throttleTimer(fn, wait) {
        let timer;
        return function () {
            let context = this;
            let args = [].slice.call(arguments, 0);
            if (!timer) {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                    timer = null;
                    clearTimeout(timer);
                }, wait);
            }
        };
    }
}
