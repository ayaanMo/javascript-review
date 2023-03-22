// 浅拷贝
function clone(target) {
    if (target == null || typeof target != 'object') return;
    let newObject = target instanceof Array ? [] : {};
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            newObject[key] = target[key];
        }
    }
    return newObject;
}
