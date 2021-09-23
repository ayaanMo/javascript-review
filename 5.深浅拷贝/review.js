/**
 * 简单拷贝
 * 浅拷贝 只考虑对象类型  对深层是对象的还是属于引用关系 没有实现对象隔离
 *  再深层次的对象属性值改变 原对象也会被改变
 */
function shallowCopy(obj) {
    // 1. 先判断是不是对象
    if (typeof obj !== 'object') return;
    // 2.判断该对象是数组还是对象
    let newObj = obj instanceof Array ? [] : {};
    // 3.循环遍历对象 然后赋值给新的对象
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
let obj = { a: 3, b: { c: 3 } };
let newObj = shallowCopy(obj);
newObj.b.c = 4;
console.log(newObj);
console.log(obj);
/**
 *  简单深度拷贝
 *  思路：
 *  1.先判断是不是对象
 *  2.根据传入的对象来判断组还是对象，来创建新的对象
 *  3.循环递归赋值给新对象属性
 */
function easyDeepClone(obj) {
    if (typeof obj !== 'object') return;
    let newObj = obj instanceof Array ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] !== 'object' ? obj[key] : easyDeepClone(obj[key]);
        }
    }
    return newObj;
}
let easyObj = { a: 3, b: { c: 3 }, d: { f: function a() {} } };
let easyNewObj = easyDeepClone(easyObj);
easyNewObj.b.c = 4;
console.log(easyObj);
console.log(easyNewObj);
/**
 * @param {*} obj
 * @return {*}
 * 思路：
 * 1.
 */
function deepClone(obj) {
    let newObj = {};
    return newObj;
}
