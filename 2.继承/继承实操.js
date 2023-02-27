{
    // 组合继承
    function Animal(name) {
        this.name = name;
        this.colors = ['white', 'red'];
    }
    Animal.prototype.getName = function () {
        return this.name;
    };
    function Dog(name, age) {
        Animal.apply(this, [name]);
        this.age = age;
    }
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog();
    let dog1 = new Dog('Jack', 18);
    dog1.colors.push('black');
    let dog2 = new Dog('Lucy', 5);
    console.log(dog1);
    console.log(dog2);
}
{
    // 寄生式组合继承
}
