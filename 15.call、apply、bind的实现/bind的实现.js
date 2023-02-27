{
    // bind的实现
    Function.prototype.myBind = function (context) {
        // 1.调用bind的时候可以传多个参数
        let p_args = [].slice.call(arguments, 1);
        let self = this;
        function bindFunc() {
            // 3.返回出去的函数也可以传入参数
            let c_args = [].slice.call(arguments, 0);
            // 4.调用bind的函数可能存在返回值,调用bind方法的函数的内部this，指向入参的第一个对象
            let that = context;
            // 6.假如作为构造函数被调用的时候 this的指向将是实例
            if (this instanceof prototypeFunc) that = this;
            return self.apply(that, p_args.concat(c_args));
        }
        // 5.bind 返回出去的函数作为构造函数的时候的处理
        function prototypeFunc() {}
        prototypeFunc.prototype = this.prototype;
        bindFunc.prototype = new prototypeFunc();
        // 2.bind绑定的时候返回的是一个函数
        return bindFunc;
    };
    function foo(name, age) {
        console.log(this.class);
        this.name = name;
        this.age = age;
    }
    // var obj = { class: 3 };
    // var fn = foo.myBind(obj, 'lucy');
    // fn();
    // var f = new fn('19');
    // console.log(f);
    // var obj = { class: 3 };
    // console.log(foo.myBind);
    // console.log(obj.myBind);

    // var value = 2;
    // var foo = {
    //     value: 1,
    //     bar: bar.bind(null),
    // };

    // function bar() {
    //     console.log(this.value);
    // }

    // foo.bar(); // 2
}
