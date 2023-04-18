// 浅拷贝
function clone(target) {
    if (target == null || typeof target != 'object') return target;
    let newObject = target instanceof Array ? [] : {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            newObject[key] = target[key];
        }
    }
    return newObject;
}
// 检查浅拷贝函数是否能够正确地拷贝一个对象
const obj = {a: 1, b: {c: 2}};
const clonedObj = clone(obj);
console.log(clonedObj); // {a: 1, b: {c: 2}}
console.log(clonedObj === obj); // false
console.log(clonedObj.b === obj.b); // true