/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行(立即执行版的意思是触发事件后函数会立即执行，然后 n 秒内不触发事件才能继续执行函数的效果)
 */
// 事件被触发后延迟n秒再执行回调，如果在这n秒内又被触发，则重新计时
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = [...arguments];
        if (timeout) clearTimeout(timeout);
        console.log(timeout, '一直再触发timeout');
        if (immediate) {
            const callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) func.apply(context, args);
        } else {
            timeout = setTimeout(() => {
                console.log('可以做事了');
                func.apply(context, args);
            }, wait);
        }
    };
}
