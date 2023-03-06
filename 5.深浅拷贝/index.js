{
    // 深拷贝
    const isObject = target =>
        (typeof target === 'object' || typeof target === 'function') &&
        target !== null;
    /**
     * 支持对象、数组、日期、正则的拷贝。
     * 处理原始类型（原始类型直接返回，只有引用类型才有深拷贝这个概念）。
     * 处理 Symbol 作为键名的情况。
     * 处理函数（函数直接返回，拷贝函数没有意义，两个对象使用内存中同一个地址的函数，问题不大）。
     * 处理 DOM 元素（DOM 元素直接返回，拷贝 DOM 元素没有意义，都是指向页面中同一个）。
     * 额外开辟一个储存空间 WeakMap，解决循环引用递归爆栈问题（引入 WeakMap 的另一个意义，配合垃圾回收机制，防止内存泄漏）。
     * @param {*} target
     * @param {*} map
     * @returns
     */
    function deepClone(target, map = new WeakMap()) {
        if (map.get(target)) {
            return target;
        }
        // 获取当前值的构造函数：获取它的类型
        let constructor = target.constructor;
        // 检测当前对象target是否与正则、日期格式对象匹配
        if (/^(RegExp|Date)$/i.test(constructor.name)) {
            // 创建一个新的特殊对象(正则类/日期类)的实例
            return new constructor(target);
        }
        if (isObject(target)) {
            map.set(target, true); // 为循环引用的对象做标记
            const cloneTarget = Array.isArray(target) ? [] : {};
            for (let prop in target) {
                if (target.hasOwnProperty(prop)) {
                    cloneTarget[prop] = deepClone(target[prop], map);
                }
            }
            return cloneTarget;
        } else {
            return target;
        }
    }
}
{
    function deepClone(target, hash = new WeakMap()) {
        // 额外开辟一个存储空间WeakMap来存储当前对象
        if (target === null) return target; // 如果是 null 就不进行拷贝操作
        if (target instanceof Date) return new Date(target); // 处理日期
        if (target instanceof RegExp) return new RegExp(target); // 处理正则
        if (target instanceof HTMLElement) return target; // 处理 DOM元素

        if (typeof target !== 'object') return target; // 处理原始类型和函数 不需要深拷贝，直接返回

        // 是引用类型的话就要进行深拷贝
        if (hash.get(target)) return hash.get(target); // 当需要拷贝当前对象时，先去存储空间中找，如果有的话直接返回
        const cloneTarget = new target.constructor(); // 创建一个新的克隆对象或克隆数组
        hash.set(target, cloneTarget); // 如果存储空间中没有就存进 hash 里

        Reflect.ownKeys(target).forEach(key => {
            // 引入 Reflect.ownKeys，处理 Symbol 作为键名的情况
            cloneTarget[key] = deepClone(target[key], hash); // 递归拷贝每一层
        });
        return cloneTarget; // 返回克隆的对象
    }
}
{
    let a = { a: { b: 3 }, c: 4 };
    let b = { a: 4 };
    let a1 = Object.assign(b, a);
    console.log(a1);
    a.a.b = 5;
    console.log(a1);
}
{
    let arr = ['lin', 'is', 'handsome', { a: 3 }];
    let newArr = arr.slice(0);
    console.log(newArr);
    arr[3].a = 4;
    console.log(newArr);
}
