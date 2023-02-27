{
    // 寄生式组合继承
    function Animals(name) {
        this.name = name;
        this.animals = [];
    }
    Animals.prototype.getAnimals = function () {
        return this.animals;
    };
    function Cat(name, age) {
        Animals.call(this, name);
        this.age = age;
    }
    function createObj(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    function merge(parent, child) {
        let newObj = createObj(parent.prototype);
        newObj.constructor = child;
        child.prototype = newObj;
    }
}
