{
    Function.prototype.myApply = function (context) {
        // 第一步先判断context是否存在
        var context = context || window;
        // 第二步 将被调用的函数变成对象自己的属性
        let fn = Symbol();
        context[fn] = this;
        // 第三步 判断是否存在参数,不存在参数就直接运行
        let res;
        if (!arguments[1]) {
            res = context[fn]();
        } else {
            let args = [];
            //第四步 存在参数的情况
            for (let i = 0; i < arguments[1].length; i++) {
                args.push('arguments[1][' + i + ']');
            }
            console.log(args);
            res = eval('context[fn](' + args + ')');
        }
        delete context[fn];
        return res;
    };
    function foo(name, age) {
        this.name = name;
        this.age = age;
    }
    let obj = {};
    foo.myApply(obj, ['lucy', 18]);
    console.log(obj);
}
