{
    // 简单版本深拷贝
    function cloneEasy(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        let cloneObj = {};
        for (let key in obj) {
            cloneObj[key] = cloneEasy(cloneObj[key]);
        }
        return cloneObj;
    }
    const obj = {
        person: {
            name: 'lin',
        },
    };

    const newObj = cloneEasy(obj);
    obj.person.name = 'xxx'; // 改变原来的对象

    console.log('原来的对象', obj);
    console.log('新的对象', newObj);

    console.log('更深层的指向同一地址', obj.person == newObj.person);
}
{
    /**
     * 1.解决对象属性为Date
     * 2.解决对象属性为RegExp
     * 3.解决对象是数组
     * @param {*} target
     */
    function cloneEasy(target) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        // 考虑到有可能是数组
        let cloneObj = new target.constructor();
        for (let key in target) {
            cloneObj[key] = cloneEasy(target[key]);
        }
        return cloneObj;
    }

    const obj = {
        a: null,
        b: new Date(),
        c: /abc/,
        d: [],
        e: {
            name: 'lin',
        },
    };

    const newObj = cloneEasy(obj);
    obj.e.name = 'xxx'; // 改变原来的对象

    console.log('原来的对象', obj);
    console.log('新的对象', newObj);
    console.log('更深层的指向同一地址', obj.person == newObj.person);
}
{
    // 处理Symbol
    function cloneEasy(target) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return target;
        if (target instanceof RegExp) return target;
        let cloneSource = new target.constructor();
        Reflect.ownKeys(target).forEach(item => {
            cloneSource[item] = cloneEasy(target[item]);
        });
        return cloneSource;
    }

    const obj = {
        a: null,
        b: new Date(),
        c: /abc/,
        d: [],
        e: {
            name: 'lin',
        },
        d: Symbol(),
    };
    const newObj = cloneEasy(obj);
    obj.e.name = 'xxx'; // 改变原来的对象

    console.log('原来的对象', obj);
    console.log('新的对象', newObj);
    console.log('更深层的指向同一地址', obj.e == newObj.e);
}
{
    // 处理循环引用
    function cloneDeep(target, has = new Map()) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return target;
        if (target instanceof RegExp) return target;
        if (has.get(target)) return has.get(target);
        let source = new target.constructor();
        has.set(target, source);
        Reflect.ownKeys(target).forEach(key => {
            source[key] = cloneDeep(target[key], has);
        });
        return source;
    }
    const obj = {
        a: null,
        b: new Date(),
        c: /abc/,
        d: [],
        e: {
            name: 'lin',
        },
        g: new Boolean(),
    };
    let f = Symbol();
    obj[f] = 3;
    obj['ccc'] = obj;
    Object.getPrototypeOf(obj.e).getName = function () {};
    const newObj = cloneDeep(obj);
    obj.e.name = 'xxx'; // 改变原来的对象

    console.log('原来的对象', obj);
    console.log('新的对象', newObj);
    console.log('更深层的指向同一地址1', obj.e == newObj.e);
    console.log(
        '更深层的指向同一地址2',
        Object.getPrototypeOf(obj.e) == Object.getPrototypeOf(newObj.e)
    );
}
{
    /**
     * 支持对象、数组、日期、正则的拷贝。
     * 处理原始类型（原始类型直接返回，只有引用类型才有深拷贝这个概念）。
     * 处理 Symbol 作为键名的情况。
     * 处理函数（函数直接返回，拷贝函数没有意义，两个对象使用内存中同一个地址的函数，问题不大）。
     * 处理 DOM 元素（DOM 元素直接返回，拷贝 DOM 元素没有意义，都是指向页面中同一个）。
     * 额外开辟一个储存空间 WeakMap，解决循环引用递归爆栈问题（引入 WeakMap 的另一个意义，配合垃圾回收机制，防止内存泄漏）。
     * @param {*} target
     * @param {*} hash
     * @returns
     */
    function cloneDeep(target, hash = new WeakMap()) {
        if (target === null) return target;
        if (typeof target !== 'object') return target;
        if (target instanceof Date) return new Date(target);
        if (target instanceof RegExp) return new RegExp(target);
        if (target instanceof HTMLElement) return target;
        if (hash.get(target)) return hash.get(target);
        let source = new target.constructor();
        hash.set(target, source);
        Reflect.ownKeys(target).forEach(key => {
            source[key] = cloneDeep(target[key], hash);
        });
        return source;
    }
    const obj = {
        a: null,
        b: new Date(),
        c: /abc/,
        d: [],
        e: {
            name: 'lin',
        },
        g: new Boolean(),
    };
    let f = Symbol();
    obj[f] = 3;
    obj['ccc'] = obj;
    Object.getPrototypeOf(obj.e).getName = function () {};
    const newObj = cloneDeep(obj);
    obj.e.name = 'xxx'; // 改变原来的对象

    console.log('原来的对象', obj);
    console.log('新的对象', newObj);
    console.log('更深层的指向同一地址1', obj.e == newObj.e);
    console.log(
        '更深层的指向同一地址2',
        Object.getPrototypeOf(obj.e) == Object.getPrototypeOf(newObj.e)
    );
}
{
    function Foo() {}
    Foo.prototype.getName = function () {};
    function Bar() {}
    Bar.prototype = new Foo();
    Bar.prototype.constructor = Bar;
    const obj = {
        a: null,
        b: new Date(),
        c: /abc/,
        d: [],
        e: {
            name: 'lin',
        },
        g: new Bar(),
    };
    let f = Symbol();
    obj[f] = 3;
    obj['ccc'] = obj;
    let obj2 = {};
    Reflect.ownKeys(obj).forEach(key => {
        obj2[key];
    });
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            console.log(prop);
        }
    }
}
