// call实现
{
    Function.prototype.myCall = function (context) {
        // 第一步 判断context是否不存在
        var context = context || window;
        // 第二步 函数变成传入进来的对象的属性,这里用Sumbol的原因防止传入的对象也有该属性同名的内容
        let fn = Symbol();
        context[fn] = this;
        // 第三步 考虑到参数列表的情况 转成数组
        let args = [];
        for (let i = 1; i < arguments.length; i++) {
            args.push('arguments[' + i + ']');
        }
        // 第四步 执行函数
        let res = eval('context[fn](' + args + ')');
        // 第五步 删除属性方法
        delete context[fn];
        // 第六步 考虑返回值的情况
        return res;
    };
    // function foo(name, age) {
    //     this.name = name;
    //     this.age = age;
    // }
    // let obj = {};
    // foo.myCall(obj, 'lucy', 18);
    // console.log(obj);
    function foo(name, age) {
        this.name = name;
        this.age = age;
        console.log(this);
        console.log(this.a);
    }
    var obj = { a: 1 };
    var a = 2;

    foo('jack', 17);
    foo.myCall(obj, 'lucy', 13);
}
