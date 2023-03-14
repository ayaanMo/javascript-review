// 顾名思义就是每过n秒仅执行一次回调函数。如单位时间内多次触发函数，也只有一次生效。
function throttleDate(func, wait) {
    var context, args;
    var previous = 0;

    return function () {
        var now = +new Date();
        console.log(+new Date());
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    };
}
function throttleTimer(func, wait) {
    var timeout;
    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(context, args);
                clearTimeout(timeout);
                timeout = null;
            }, wait);
        }
    };
}
