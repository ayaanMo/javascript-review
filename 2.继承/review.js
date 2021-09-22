// 对象
/**
 * 对象拥有的属性是__proto__和constructor
 * 1.对象的__proto__是去找它的父级构造函数的原型（对象）
 * 2.对象的constructor是指向它的父级构造函数
 */
// 函数
/**
 * 函数拥有的属性是prototype
 * 1.函数的prototype是去找它的父级原型对象
 * 2.原型可以用来共享方法；
 * 3.原型中this的指向是实例；
 */

/**
 *  1.构造函数.prototype = 原型
 *  2.构造函数 调用new = 实例
 *  3.实例.__proto__ = 原型
 *  4.原型.constructor = 构造函数
 *  5.实例.constructor = 构造函数
 *  6.原型.__proto__ = Object原型
 *  7.Object原型.__proto__ = null;
 *  8.Object原型.constructor = Object构造函数
 *  9.Object.prototype = Object原型
 */
//example
// 对象的__proto__指向父级的prototype
son.__proto__ === Father.prototype;
console.log(true);
// 对象的构造器指向父构造函数
son.constructor === Father;
console.log(true);
// 构造函数.prototype.constructor指向构造函数本身，所以实例对象的构造器也指向：构造函数.prototype.constructor
son.constructor === Father.prototype.constructor;
console.log(true);
// 构造函数.prototype.constructor指向它本身
Father.prototype.constructor === Father;
console.log(true);
// 构造函数.prototype是一个对象，对象的父级是Object，所以Father.prototype.__proto__指向Object.prototype
Father.prototype.__proto__ === Object.prototype;
console.log(true);
// 构造函数Father的父级是Function，所以Father.__proto__指向Function.prototype
Father.__proto__ === Function.prototype;
console.log(true);
// 构造函数的构造器是它的父级函数，所以...
Father.constructor === Function;
// 1) 构造函数.prototype.constructor指向构造函数本身，所以Function.prototype.constructor === Function; 2) 构造函数的构造器就是它的父级，所以Function.constructor === Function; 3) 所以两者相等
Father.constructor === Function.prototype.constructor;

// Function自己也是它的父构造函数的实例。这里是因为：构造函数.prototype.constructor指向构造函数本身
Function.prototype.constructor === Function;
// Function.prototype是一个对象，对象的上级是Object，所以...
Function.prototype.__proto__ === Object.prototype;
// Function自己也是它的父构造函数的实例，但它的父构造函数还是Function，所以...
Function.__proto__ === Function.prototype;
// Function.__proto__指向Function.prototype，是一个对象，对象没有prototype属性，所以是undefined
Function.__proto__.prototype === undefined;
// Function.__proto__指向Function.prototype, 构造函数.prototype.constructor指向自身，所以...
Function.__proto__.constructor === Function;
// Function.__proto__指向Function.prototype, 是一个对象，这个对象是Object的实例，所以...
Function.__proto__.__proto__ === Object.prototype;
// Function.__proto__.__proto__指向Object.prototype，构造函数.prototype.constructor指向构造函数自身，所以...
Function.__proto__.__proto__.constructor === Object;
// Function.__proto__.__proto__指向Object.prototype，Object.prototype的上一层是原型链的终点，JS规定值为null
Function.__proto__.__proto__.__proto__ === null;

// Object也是一个构造函数，构造函数.prototype.constructor指向构造函数自身
Object.prototype.constructor === Object;
// Object.prototype的上一层是原型链的终点，即null
Object.prototype.__proto__ === null;
// Object还是它父构造函数的一个实例，所以Object.__proto__指向了Function.prototype
Object.__proto__ === Function.prototype;
// Object.__proto__指向它的父构造函数.prototype，是一个对象，所以父构造函数.prototype再上一层则指向了Object.prototype
Object.__proto__.__proto__ === Object.prototype;
// Object.__proto__指向它的父构造函数.prototype，构造函数.prototype.constructor指向自身，所以...
Object.__proto__.constructor === Function;
// 1）Object.__proto__指向父构造函数.prototype，是一个对象；2）对象.__proto__指向Object.prototype；3）Object.prototype.__proto__为终点null
Object.__proto__.__proto__.__proto__ === null;
