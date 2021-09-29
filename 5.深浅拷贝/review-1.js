// 基本元素拷贝
// 更深一层的对象是不会被克隆 还是属于引用对象关系  属于浅拷贝
function basicClone(param) {
    // 1.先判断传入的参数是不是对象
    if (typeof param !== 'object') return;
    // 2.判断是对象还是数组
    let res = param instanceof Array ? [] : {};
    for (let key in param) {
        // hasOwnProperty(propertyName)方法是用来检测属性是否为对象的自由属性
        if (param.hasOwnProperty(key)) {
            // 第一种写法浅拷贝
            // res[key] = param[key];
            // 第二种写法深拷贝
            res[key] = typeof param[key] === 'object' ? basicClone(param[key]) : param[key];
        }
    }
    return res;
}
let param = { a: 1, b: 2, c: { d: 4 } };
let res = basicClone(param);
res.a = 3;
res.c.d = 7;
console.log(res);
console.log(param);
function Animal() {
    this.zoo = '野生动物园';
}
function Elephant() {
    this.name = 'Judy';
    this.age = '3';
}
Elephant.prototype = new Animal();
let el = new Elephant();
// 输出 { name: 'Judy', age: '3'}这里就不会打印zoo属性
console.log(basicClone(el));
