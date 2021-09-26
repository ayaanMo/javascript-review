/**
 * 深浅拷贝
 */
// 浅拷贝 只考虑对象类型
/**
 * 思路：
 *  1.先判断是不是object类型；
 *  2.判断是数组还是对象，创建一个新的obj；
 *  3.循环遍历对象
 */
function shallowCopy(obj) {
    if (typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        //   hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
// 简单版深拷贝：只考虑普通对象属性，不考虑内置对象和函数
function easyDeepClone(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? easyDeepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}
// 复杂版深拷贝：基于简单版的基础上，还考虑了内置对象比如Date、RegExp等对象和函数以及解决了循环引用的问题
// WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
const isObject = target =>
    (typeof target === 'object' || typeof target === 'function') && target !== null;
function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    let constructor = target.constructor;
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(target);
    }
    if (isObject(target)) {
        map.set(target, true);
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
