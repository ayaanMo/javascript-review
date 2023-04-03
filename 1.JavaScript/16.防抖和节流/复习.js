// 事件被触发n秒后再执行，如果在n秒内被再次出发，则时间重置
function debounce(fn, wait) {
    let timer;
    return function () {
        let context = this;
        let args = [...arguments];
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    };
}

// 每过n秒仅执行一次回调函数。如单位时间内多次触发函数，也只有一次生效。
// 时间戳模式
function throttle(fn, wait) {
    let previous = 0;
    return function () {
        let content = this;
        let args = [...arguments];
        let nowDate = +new Date();
        if (nowDate > previous + wait) {
            fn.apply(content, args);
            previous = nowDate;
        }
    };
}
// 定时器模式
function throttleTimer(fn, wait) {
    let timer;
    return function () {
        let context = this;
        let args = [...arguments];
        if (timer) return;
        timer = setTimeout(function () {
            fn.apply(context, args);
            clearTimeout(timer);
            timer = null;
        }, wait);
    };
}
