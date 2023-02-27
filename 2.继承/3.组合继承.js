// 基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性
function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
}
Animal.prototype.getName = function () {
    return this.name;
};
function Dog(name, age) {
    // 只能继承父类函数的属性以及一些变量而不能继承父类函数的原型对象上的方法
    Animal.call(this, name);
    this.age = age;
}
// 可以继承父类方法原型对象上的方法
Dog.prototype = new Animal();
Dog.prototype.constructor = Dog;

let dog1 = new Dog('奶昔', 2);
dog1.colors.push('brown');
console.log(dog1);
let dog2 = new Dog('哈赤', 1);
console.log(dog2.getName());
console.log(dog2);
// { name: "哈赤", colors: ["black", "white"], age: 1 }
