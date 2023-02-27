/**
 * 由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法
 * call和apply 可以让括号内的对象继承括号外函数的属性
 */
function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
    this.getName = function () {
        return this.name;
    };
}
function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = new Animal();
let dog1 = new Dog('jack');
console.log(dog1);
dog1.colors.push('brown');
console.log(dog1.colors);
let dog2 = new Dog();
console.log(dog2.colors);
