{
    //    new的实现
    function _new(func) {
        // 第一步判断传入进来的是不是函数
        if (Object.prototype.toString.call(func) !== '[object Function]') {
            throw '这不是一个构造函数';
        }
        // 第二步创建一个实例，并且该新对象的__proto__指向func的原型对象
        let newObj = Object.create(func.prototype);
        // 第三步 获取arguments形参 arguments是类数组并没有slice方法 [].slice.call(arguments,1)这样arguments就有了slice方法 等同于 arguments.slice(1)
        let args = [].slice.call(arguments, 1);
        // 第四步 该func内部的this是指向这个新的对象
        let result = func.apply(newObj, args);
        // 第五步判断返回的是不是一个对象
        var isObject = typeof result === 'object' && result !== null;
        var isFunction = typeof result === 'function';
        if (isObject || isFunction) {
            return result;
        }
        // 第六步如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
        return newObj;
    }

    function Foo() {}
    function Boo(name, age) {
        this.age = age;
        this.name = name;
    }
    console.log(_new(Foo));
    console.log(_new(Boo, 'jack', 18));
}
