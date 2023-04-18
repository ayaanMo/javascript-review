{
    function debounce(fn, wait, immediate) {
        let timer = null;
        return function () {
            const context = this;
            const args = [].slice.call(arguments, 0);
            if (timer) clearTimeout(timer);
            if (immediate) {
                const callnow = !timer;
                timer = setTimeout(() => {
                    timer = null;
                }, wait);
                if (callnow) fn.apply(context, args);
            } else {
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, wait);
            }
        };
    }
}
{
    function throttle(fn, wait) {
        let previous = 0;
        return function (...args) {
            let now = +new Date();
            const context = this;
            if (now > previous + wait) {
                fn.apply(context, args);
                previous = now;
            }
        };
    }
}
{
    function throttle(fn, wait) {
        let timer = null;
        return function (...args) {
            if (timer) return;
            const context = this;
            timer = setTimeout(() => {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        };
    }
}
