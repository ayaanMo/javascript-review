{
    function _new(func) {
        if (func == null || typeof func !== 'function') {
            throw new TypeError('this is not a function');
        }
        const newObj = Object.create(func.prototype);
        const args = [].slice.call(arguments, 1);
        const result = func.apply(newObj, args);
        return (result =
            result != null &&
            (typeof result === 'object' || typeof result === 'function')
                ? result
                : newObj);
    }
}
