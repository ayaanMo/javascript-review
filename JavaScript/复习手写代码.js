console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5');
    });
});
process.nextTick(function () {
    console.log('6');
});
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8');
});

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12');
    });
});
// 1 7 6 8 2 4 3 5 9 11 10 12
let a = 3;
function aa(val) {
    console.log(val);
    val = 4;
    console.log(val);
    console.log(a);
}
aa(a);
let b = { a: 3 };
function bb(val) {
    console.log(val);
    val.a = 5;
    console.log(val);
    console.log(b);
}
bb(b);
{
    // 寄生式组合继承实现
    function Animals(sex) {
        this.colors = [];
        this.sex = sex;
    }
    Animals.prototype.getColors = function () {
        return this.colors;
    };
    function Dog(name, sex) {
        console.log(new.target.name);
        this.name = name;
        Animals.call(this, sex);
    }
    function createObj(prototype) {
        function f() {}
        f.prototype = prototype;
        return new f();
    }
    function inheritancePrototype(Parent, Child) {
        let newObj = createObj(Parent.prototype);
        newObj.constructor = Child;
        Child.prototype = newObj;
    }
    inheritancePrototype(Animals, Dog);
    let dog1 = new Dog('james', 18);
    dog1.colors.push('white');
    let dog2 = new Dog('lucy', 16);
    dog2.colors.push('pink');
    console.log(dog1.getColors());
    console.log(dog2.getColors());
    console.log(dog1);
    console.log(dog2);
}
{
    class Animals {
        constructor(age) {
            this.colors = ['red'];
            this.age = age;
            console.log(new.target.name);
        }
        static baseStaticField = 90;
        getColors() {
            return this.colors;
        }
    }
    class Dog extends Animals {
        constructor(name, age) {
            super(age);
            console.log(super.colors);
            console.log(super.baseStaticField);
            console.log(super.getColors());
            this.name = name;
        }
    }
    let dog1 = new Dog('james', 18);
    dog1.colors.push('white');
    let dog2 = new Dog('lucy', 16);
    dog2.colors.push('pink');
    console.log(dog1.getColors());
    console.log(dog2.getColors());
    console.log(dog1);
    console.log(dog2);
}
{
    class Base {
        static baseStaticField = 90;
        baseMethod() {
            return 10;
        }
    }
    class Extended extends Base {
        constructor() {
            console.log(super.baseStaticField);
        }
        extendedField = super.baseMethod(); // 10
        static extendedStaticField = super.baseStaticField; // 90
    }
    let d = new Extended();
    console.log(d);
}
{
    function _new(func) {
        if (Object.prototype.toString.call(func) !== '[object Function]') {
            throw new TypeError('This is not a function');
        }
        const newObj = Object.create(func.prototype);
        const args = [].slice.call(arguments, 1);
        const result = func.apply(newObj, args);
        result =
            result !== null &&
            (typeof result === 'object' || typeof result === 'function')
                ? result
                : newObj;
        return result;
    }
}
{
    // call的实现
    Function.prototype.myCall = function (context) {
        context = context || window;
        let fn = Symbol();
        context[fn] = this;
        let args = [];
        for (let i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        console.log(...args);
        let result = context[fn](...args);
        delete context[fn];
        return result;
    };
    function ab(b, c) {
        console.log(this.a);
        console.log(b);
        console.log(c);
    }
    let obj = { a: 3 };
    ab.myCall(obj, 5, 6);
}
{
    // apply的实现
    Function.prototype.myApply = function (context, args) {
        context = context || window;
        if (typeof context !== 'object') {
            throw new TypeError('This is not a object');
        }
        if (!(args instanceof Array)) {
            throw new TypeError('This param is not a array');
        }
        let fn = Symbol();
        context[fn] = this;
        let result = null;
        if (args.length === 0) {
            result = context[fn]();
        } else {
            result = context[fn](...args);
        }
        delete context[fn];
        return result;
    };
    function ab(b, c) {
        console.log(this.a);
        console.log(b);
        console.log(c);
    }
    let obj = { a: 3 };
    ab.myApply(obj, [5, 6]);
}
{
    // bind的实现
    Function.prototype.myBind = function (context) {
        context = context || window;
        let args = [].slice.call(arguments, 1);
        let self = this;
        function func() {
            let params = [].slice.call(arguments, 0);
            return self.apply(
                this instanceof fNOP ? this : context,
                args.concat(params)
            );
        }
        function fNOP() {}
        fNOP.prototype = self.prototype;
        func.prototype = new fNOP();
        return func;
    };
    function ab(b, c) {
        console.log(this.a);
        console.log(b);
        console.log(c);
    }
    let obj = { a: 3 };
    ab.myBind(obj, 5, 6)();
}
{
    // 偏函数
    function add(a, b, c, d) {
        return a + b + c + d;
    }
    function partial(fn) {
        let args = [].slice.call(arguments, 1);
        return function () {
            let params = [].slice.call(arguments);
            return fn.apply(null, args.concat(params));
        };
    }
    let plus = partial(add, 5, 5);
    console.log(plus(6, 7));
    console.log(plus(9, 9));
}
{
    // 柯里化
    function mul(a, b, c) {
        return a * b * c;
    }
    function corey(fn) {
        return function next(...args) {
            if (fn.length === args.length) {
                return fn(...args);
            } else {
                return function (...params) {
                    return next(...args, ...params);
                };
            }
        };
    }
    let mu = corey(mul);
    console.log(mu(2)(2)(3));
}
{
    // 浅拷贝
    function clone(obj) {
        if (obj === null && typeof obj !== 'object') {
            throw new TypeError('This is not an object');
        }
        let newobj = obj instanceof Array ? [] : {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                newobj[key] = obj[key];
            }
        }
        return newobj;
    }
    let obj = { a: 3, b: { c: 4 } };
    let newObj = clone(obj);
    console.log(newObj);
    newObj.b.c = 5;
    console.log(obj);
    console.log(newObj);
    console.log(obj.b === newObj.b);
}
{
    // 深拷贝
    function cloneDeep(target, hash = new WeakMap()) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        if (target instanceof HTMLElement) return target;
        if (hash.get(target)) return hash.get(target);
        const source = new target.constructor();
        hash.set(target, source);
        Reflect.ownKeys(target).forEach(key => {
            source[key] = cloneDeep(target[key], hash);
        });
        return source;
    }
    let obj = { a: 3, b: { c: 4 } };
    let newObj = cloneDeep(obj);
    console.log(newObj);
    newObj.b.c = 5;
    console.log(obj);
    console.log(newObj);
    console.log(obj.b === newObj.b);
}
{
    // 防抖
}
