function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white'];
}
Animal.prototype.getName = function () {
    return this.name;
};
function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
}

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
function inheritPrototype(child, parent) {
    // 该实例的原型对象指向的是parent
    let prototype = object(parent.prototype);
    // 将该实例指向子类构造函数
    prototype.constructor = child;
    // 子类函数的原型对象指向该实例
    child.prototype = prototype;
}
inheritPrototype(Dog, Animal);
let dog1 = new Dog('奶昔', 2);
dog1.colors.push('brown');
let dog2 = new Dog('哈赤', 1);
console.log(dog2);
