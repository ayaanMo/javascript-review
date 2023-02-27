{
    /**
     * 分析
     * 1.定义父级构造方法 将成员变量初始化在构造函数中
     * 2.定义父级原型上的方法，好让实例通过链式能找到
     * 3.定义子类构造方法
     * 4.让子类的的原型等于父类的实例
     * 5.这个时候子类的原型对象的constructor指向将被改变，重新指定子类原型对象的constructor
     * 6.创建子类的实力 这个时候是可以调用到父类的成员变量和父类的原型上的方法
     * 缺点：
     * 1.子类的实力无法向上级构造函数传参
     * 2.由于父类的成员变量是引用类型，会被随意篡改，而导致变量被污染
     */
    // 原型链继承
    function Animals() {
        this.colors = ['white', 'red'];
    }
    Animals.prototype.getColor = function () {
        return this.colors;
    };
    function Dog() {}
    Dog.prototype = new Animals();
    Dog.prototype.constructor = Dog;
    let dog1 = new Dog();
    dog1.colors.push('gray');
    let dog2 = new Dog();
    console.log(dog2.getColor());
}
{
    //组合继承
    function Person(name) {
        this.name = name;
        this.hobby = ['swim'];
    }
    Person.prototype.getHobby = function () {
        return this.hobby;
    };
    function Girl(name, age) {
        Person.call(this, name);
        this.age = age;
    }
    Girl.prototype = new Person();
    Girl.prototype.constructor = Girl;
    let lucy = new Girl('lucy', 18);
    lucy.hobby.push('basketball');
    console.log(lucy.hobby);
    let lily = new Girl('lily', 17);
    console.log(lily.hobby);
    console.log(lily.name + lily.age);
}
{
    //寄生式继承 最经典的继承 class的实现原理就是寄生式继承
    function Animals() {
        this.colors = ['white'];
    }
    Animals.prototype.getColor = function () {
        return this.colors;
    };
    function Dog(name) {
        this.name = name;
        Animals.call(this);
    }
    //Object.create()
    function F() {}
    F.prototype = Animals.prototype;
    Dog.prototype = new F();
    Dog.prototype.constructor = Dog;
    let dog1 = new Dog();
    dog1.colors.push('gray');
    console.log(dog1.getColor());
    let dog2 = new Dog();
    console.log(dog2.getColor());
}
