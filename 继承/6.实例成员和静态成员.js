// 实例成员和静态成员
/**
 * 一般来说，公共属性定义到构造函数里面，公共方法我们放到原型对象身上（原型上的方法才会被实例共享）
 *  实例成员：
 *      1.在构造函数内部，通过this添加的成员
 *      2.只能通过实例化的对象来访问
 *  静态成员：
 *      1.在构造函数本身上添加的成员
 *      2.只能通过构造函数来访问
 */
function Person(name, age) {
  this.age = age;
  this.name = name;
}
Person.sex = '女';
const p1 = new Person('James', 18);
console.log(p1.name);
console.log(p1.age);
console.log(p1.sex);
console.log(Person.name);
console.log(Person.sex);
