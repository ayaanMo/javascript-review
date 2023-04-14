{
    Function.prototype.myCall = function (context) {
        const context = context || window;
        const fn = Symbol();
        context[fn] = this;
        let args = [].slice.call(arguments, 1);
        const result = context[fn](...args);
        delete context[fn];
        return result;
    };
}
{
    Function.prototype.myApply = function (context, arr = []) {
        const context = context || window;
        const fn = Symbol();
        context[fn] = this;
        let result;
        if (arr.length > 0) {
            result = context[fn]();
        } else {
            context[fn](...arr);
        }
        delete context[fn];
        return result;
    };
}
{
    Function.prototype.myBind = function (context) {
        const self = this;
        const args = [].slice.call(arguments, 1);
        function bindFunc() {
            const params = [].slice.call(arguments, 0);
            return self.apply(
                this instanceof inheritProto ? this : context,
                args.concat(params)
            );
        }
        function inheritProto() {}
        inheritProto.prototype = self.prototype;
        inheritProto.constructor = bindFunc;
        bindFunc.prototype = new inheritProto();
        return bindFunc;
    };
}
