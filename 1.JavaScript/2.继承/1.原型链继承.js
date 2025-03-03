// 原型链继承
// 原型链继承的缺陷
// 缺陷1：原型中包含的引用类型属性将被所有实例共享；
// 缺陷2：子类在实例化的时候不能给父类构造函数传参；
// 缺陷3：无法实现多继承；
// 缺陷4：来自原型对象的所有属性被所有实例共享；
// 缺陷5：创建子类实例时，无法向父类构造函数传参。
function Animal() {
  this.colors = ["black", "white"];
}
// prototype是函数独有的，prototype就是一个对象，prototype里面有两个属性：__proto__和constructor
// 原型可以用来共享方法
// 原型中的this指向实例
Animal.prototype.getColor = function () {
  return this.colors;
};
function Dog() {}
Dog.prototype = new Animal();
let dog1 = new Dog();
dog1.colors.push("brown");
let dog2 = new Dog();
console.log(dog2.colors); // ['black', 'white', 'brown']
