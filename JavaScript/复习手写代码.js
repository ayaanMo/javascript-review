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
    /**
     * @desc 函数防抖
     * @param func 函数
     * @param wait 延迟执行毫秒数
     * @param immediate true 表立即执行，false 表非立即执行(立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果)
     * @returns
     */
    function debounce(fn, wait, immediate) {
        let timer = null;
        return function () {
            let args = [].slice.call(arguments);
            if (timer) clearTimeout(timer);
            const self = this;
            if (immediate) {
                // 状态判断 当timer还存在的时候 说明还在n秒内 n秒一到  就可以立即执行了
                let callnow = !timer;
                timer = setTimeout(() => {
                    timer = null;
                }, wait);
                if (callnow) fn.apply(self, args);
            } else {
                timer = setTimeout(() => {
                    fn.apply(self, args);
                }, wait);
            }
        };
    }
}
{
    /**
     *顾名思义就是每过n秒仅执行一次回调函数。如单位时间内多次触发函数，也只有一次生效。
     */
    function throttleDate(fn, wait) {
        let previous = 0;
        return function () {
            let args = [].slice.call(arguments);
            const self = this;
            let now = +new Date();
            if (previous + wait < now) {
                fn.apply(self, args);
                previous = now;
            }
        };
    }
    function throttleTimer(fn, wait) {
        let timer = null;
        return function () {
            let args = [].slice.call(arguments);
            const self = this;
            if (timer) return;
            timer = setTimeout(() => {
                fn.apply(self, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        };
    }
}

{
    //set get delete clear has
    const map = new Map([
        [1, 2],
        [3, 4],
    ]);
    console.log(map.has(1));
    console.log(map.get(1));
    console.log(map.delete(3));
    console.log(map);
    console.log(map.clear());
    console.log(map);
    console.log(map.set(5, 6).get(5));
    console.log(map);
    let obj = {};
    map.set(obj, 8);
    map.set(obj, 9);
    console.log(map);
    console.log(...map);
}
{
    // set get  has delete
    let obj = {};
    let obj2 = {};
    const weak = new WeakMap();
    weak.set(obj, 4);
    console.log(weak.get(obj));
    console.log(weak.has(obj));
    console.log(weak.set(obj2, 5).get(obj2));
    console.log(weak.get(obj2));
    console.log(weak.delete(obj));
    console.log(weak);
}
{
    //add  has delete clear
    const set = new Set([6, 7]);
    set.add(4);
    let obj = {};
    let arr = [];
    let obj1 = {};
    set.add(obj);
    set.add(obj1);
    set.add(arr);
    console.log(set);
    console.log(set.has(obj));
    console.log(set.delete(obj1));
    console.log(set.clear());
    console.log(set);
}
{
    let person = {};
    let personName = 'lihua';
    Object.defineProperty(person, 'namep', {
        get: function () {
            console.log('触发了get方法');
            return personName;
        },
        set: function (val) {
            console.log('触发了set方法');
            personName = val;
        },
    });
    console.log(person.namep);
    personName = 'liming';
    console.log(person.namep);
    person.namep = 'huahua';
    console.log(person.namep);
}
{
    let person = {
        age: 0,
        name: 'zhy',
    };
    let handler = {
        get(obj, key) {
            console.log('触发了get');
            return key in obj ? obj[key] : 66;
        },
        set(obj, key, val) {
            console.log('触发了set');
            obj[key] = val;
            return false;
        },
        construct(target, args) {
            console.log('触发了construct');
            console.log(target);
            console.log(args);
        },
    };
    function A() {}
    let proxy = new Proxy(person, handler);
    console.log(proxy.name);
    proxy.age = 33;
    console.log(proxy.age);
    function A() {}
    let proxy1 = new Proxy(A, handler);
    let p1 = new proxy1();
    console.log(p1);
}
{
    let person = {
        age: 0,
        school: 'xdu',
        children: {
            name: '小明',
            child: {
                age: 100,
            },
        },
    };
    let handler = {
        get(obj, key) {
            console.log('触发了get');
            console.log(key);
            return key in obj ? obj[key] : 88;
        },
        set(obj, key, val) {
            console.log('触发了set');
            obj[key] = val;
            return true;
        },
    };
    let proxy = new Proxy(person, handler);
    // console.log(proxy.children.name);
    console.log(proxy.children.child.age);
}
{
    // 自定义一个迭代器
    function Counter(value) {
        this.init = value;
    }
    Counter.prototype[Symbol.iterator] = function () {
        let count = 1,
            limit = this.init;
        return {
            next() {
                if (limit >= count) {
                    return { value: count++, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
        };
    };
    let count = new Counter(4);
    const iterator = count[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    for (let i of count) {
        console.log(i);
    }
}
{
    function* generator() {
        let a = yield 1;
        let b = yield 2;
        let c = yield 3;
        console.log(a, b, c);
    }
    let gen = generator();
    console.log(gen.next());
    console.log(gen.next(5));
    console.log(gen.next(3));
    console.log(gen.next(2));
    console.log(gen.next());
}
{
    function* generator() {
        let a = yield 1;
        let b = yield 2;
        let c = yield 3;
        console.log(a, b, c);
    }
    let gen = generator();
    console.log(gen.next());
    console.log(gen.return(5));
}
{
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        });
    });
    let p2 = new Promise((resolve, reject) => {
        console.log('我是p2');
        resolve(3);
    });
    async function person() {
        const v1 = await p1.then(value => {
            console.log(value);
            return value;
        });
        const v2 = await p2.then(value => {
            return value;
        });
        return v1 * v2;
    }
    person().then(value => {
        console.log(value);
    });
}
{
    // instanceof 的实现
    function instanceOf(target, source) {
        let flag = false;
        while (target) {
            if (
                Object.getPrototypeOf(target) === Object.getPrototypeOf(source)
            ) {
                return (flag = true);
            }
            console.log(Object.getPrototypeOf(target));
            target = Object.getPrototypeOf(target);
        }
        return flag;
    }
    console.log(instanceOf(function () {}, Function));
    console.log(function () {} instanceof Function);
}
{
    // 链表结构
    function Node(value) {
        this.value = value;
        this.next = null;
    }
    function LinkList() {
        this.head = null;
    }
    LinkList.prototype.add = function (data) {
        let node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (true) {
                if (current.next === null) {
                    current.next = node;
                    break;
                }
                current = current.next;
            }
        }
    };
    LinkList.prototype.insert = function (index, data) {
        let node = new Node(data);
        let current = this.head;
        let prev = null;
        while (true) {
            if (index === current.value) {
                prev = current.next;
                current.next = node;
                if (current.next !== null) {
                    node.next = prev;
                    prev = null;
                    break;
                }
            }
            current = current.next;
        }
    };
    LinkList.prototype.delete = function (index) {
        let current = this.head;
        let prev = null;
        while (true) {
            if (index === current.value) {
                prev.next = current.next;
                break;
            }
            prev = current;
            current = current.next;
        }
    };
    let link = new LinkList();
    link.add(3);
    console.log(link);
    link.add(4);
    console.log(link);
    link.add(5);
    console.log(link);
    link.insert(4, 6);
    console.dir(link, { depth: null });
    link.delete(5);
    console.dir(link, { depth: null });
}
