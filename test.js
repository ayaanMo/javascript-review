// 数据类型判断
console.log('----数据类型判断-----');
function typeOf(obj) {
    let result = Object.prototype.toString.call(obj).split(' ')[1];
    result = result.substring(0, result.length - 1).toLowerCase();
    return result;
}
console.log(typeOf(123));
console.log(typeOf('123'));
// 组合继承
console.log('----组合继承-----');
function Animal(params = {}) {
    this.name = params['name'];
    this.age = params['age'];
    this.colors = ['white', 'black'];
}
Animal.prototype.getName = function () {
    return this.name;
};
function Dog(params) {
    Animal.call(this, params);
    this.sex = params['sex'];
}
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;
let dog1 = new Dog({ name: 'James', age: 3, sex: '公' });
let dog2 = new Dog({ name: 'Lucy', age: 4, sex: '母' });
dog1.colors.push('red');
console.log(dog1);
console.log(dog2);
// 数组去重
console.log('----数组去重-----');
function unique(arr) {
    let result = arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    });
    return result;
}
console.log(unique([1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7, 7]));
