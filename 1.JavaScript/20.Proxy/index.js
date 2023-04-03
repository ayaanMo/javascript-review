/**
 * Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程；
 * Proxy可以理解为，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
 * get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
 * set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
 * has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
 * deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
 * ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
 * getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
 * defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
 * preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
 * getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
 * isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
 * setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
 * apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
 * construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
 */
{
    const obj = new Proxy(
        {},
        {
            get: function () {
                console.log(...arguments);
            },
            set: function (target, propKey, value, receiver) {
                console.log(target, propKey, value, receiver);
            },
        }
    );
    obj.name = 'jame';
    console.log(obj.name);
    const obj2 = {};
    const defineObj = Object.defineProperty(obj2, 'name', {
        get: function () {
            console.log(...arguments, '1231231');
        },
        set: function (target, propKey, value, receiver) {
            console.log(target, propKey, value, receiver);
        },
    });
    console.log(defineObj.name, 'defineObj');
}
{
    var handler = {
        get: function (target, name) {
            if (name === 'prototype') {
                return Object.prototype;
            }
            return 'Hello, ' + name;
        },

        apply: function (target, thisBinding, args) {
            return args[0];
        },

        construct: function (target, args) {
            return { value: args[1] };
        },
    };

    var fproxy = new Proxy(function (x, y) {
        return x + y;
    }, handler);

    console.log(fproxy(1, 2));
}
{
    const person = { name: 'james' };
    const proxy = new Proxy(person, {
        get: function (target, propKey, receiver) {
            console.log(receiver);
            if (propKey in target) {
                return target[propKey];
            } else {
                throw new TypeError(
                    'The attribute does not exist for this person'
                );
            }
        },
    });
    console.log(person.age);
    console.log(proxy.name);
    console.log(proxy.age);
}
{
    /**
     * get实现属性的链式操作
     * @param {*} value
     * @returns
     * 利用闭包和proxy的特性实现链式操作，将所有方法先存入到一个数组中，一旦触发get就循环执行
     */
    var pipe = function (value) {
        var funcStack = [];
        var oproxy = new Proxy(
            {},
            {
                get: function (pipeObject, fnName) {
                    if (fnName === 'get') {
                        return funcStack.reduce(function (val, fn) {
                            return fn(val);
                        }, value);
                    }
                    funcStack.push(window[fnName]);
                    return oproxy;
                },
            }
        );

        return oproxy;
    };

    var double = n => n * 2;
    var pow = n => n * n;
    var reverseInt = n => n.toString().split('').reverse().join('') | 0;

    pipe(3).double.pow.reverseInt.get;
}
