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
{
    function Animals(name) {
        this.colors = [];
        this.name = name;
    }
    Animals.prototype.getColors = function () {
        return this.colors;
    };
    function Dogs(name, age) {
        this.age = age;
        Animals.call(this, name);
    }
    function NewObject(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    function InheritPrototype(P, C) {
        const newObj = NewObject(P.prototype);
        newObj.constructor = C;
        C.prototype = newObj;
    }
    InheritPrototype(Animals, Dogs);
}
