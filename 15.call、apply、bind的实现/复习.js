{
    Function.prototype.myCall = function (context) {
        var context = context || window;
        let fn = Symbol();
        context[fn] = this;
        let args = [];
        for (let i = 1; i < arguments.length; i++) {
            args.push('arguments[' + i + ']');
        }
        let res = eval('context[fn](' + args + ')');
        delete context[fn];
        return res;
    };
}
{
    Function.prototype.myApply = function (context, arr) {
        var context = context || window;
        let fn = Symbol();
        context[fn] = this;
        let res;
        if (!arr) {
            res = context[fn]();
        } else {
            if (Object.prototype.toString.call(arr) !== '[object Array]') {
                throw '请检查传递的参数类型是否是数组';
            }
            let args = [];
            for (let i = 0; i < arr.length; i++) {
                args.push('arr[' + i + ']');
            }
            res = eval('context[fn](' + args + ')');
        }
        delete context[fn];
        return res;
    };
}
{
    Function.prototype.myBind = function (context) {
        let self = this;
        let args = [].slice.call(arguments, 1);
        function bindFunc() {
            let bindArgs = [].slice.call(arguments, 0);

            return self.call(
                this instanceof prototypeFunc ? this : context,
                args.concat(bindArgs)
            );
        }
        function prototypeFunc() {}
        prototypeFunc.prototype = self.prototype;
        bindFunc.prototype = new prototypeFunc();
        bindFunc.prototype.constructor = bindFunc;
        return bindFunc;
    };
}
