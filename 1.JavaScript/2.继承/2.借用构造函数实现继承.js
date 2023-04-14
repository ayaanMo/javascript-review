/**
 * 由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法
 * call和apply 可以让括号内的对象继承括号外函数的属性
 * 使用“Call”方法实现继承的潜在问题是，它可能导致为子类的每个实例创建重复的方法，这可能会占用大量内存且效率低下。这被称为“构造函数窃取”模式
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