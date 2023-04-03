{
    function _new(func) {
        if (Object.prototype.toString.call(func) !== '[object Function]') {
            throw '请传入函数类型';
        }
        let newObj = Object.create(func.prototype);
        let args = [].slice.call(arguments, 1);
        let res = func.apply(newObj, args);
        return res !== null &&
            (typeof res === 'object' || typeof res === 'function')
            ? res
            : newObj;
    }
}
