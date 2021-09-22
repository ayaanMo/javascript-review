class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
let dog = new Dog('James', 18);
console.log(dog);
