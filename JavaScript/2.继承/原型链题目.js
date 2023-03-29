function Father() {}
let son = new Father();

// 对象的__proto__指向父级的prototype
son.__proto__ === Father.prototype; // true
// 对象的构造器指向父构造函数
son.constructor === Father; //true
// 构造函数.prototype.constructor指向构造函数本身，所以实例对象的构造器也指向：构造函数.prototype.constructor
son.constructor === Father.prototype.constructor; //true

// 构造函数.prototype.constructor指向它本身
Father.prototype.constructor === Father; //true
// 构造函数.prototype是一个对象，对象的父级是Object，所以Father.prototype.__proto__指向Object.prototype
Father.prototype.__proto__ === Object.prototype; //true
// 构造函数Father的父级是Function，所以Father.__proto__指向Function.prototype
Father.__proto__ === Function.prototype; //true
// 构造函数的构造器是它的父级函数，所以...
Father.constructor === Function; //true
// 1) 构造函数.prototype.constructor指向构造函数本身，所以Function.prototype.constructor === Function; 2) 构造函数的构造器就是它的父级，所以Function.constructor === Function; 3) 所以两者相等
Father.constructor === Function.prototype.constructor; //true

// Function自己也是它的父构造函数的实例。这里是因为：构造函数.prototype.constructor指向构造函数本身
Function.prototype.constructor === Function; //true
// Function.prototype是一个对象，对象的上级是Object，所以...
Function.prototype.__proto__ === Object.prototype; //true
// Function自己也是它的父构造函数的实例，但它的父构造函数还是Function，所以...
Function.__proto__ === Function.prototype; //true
// Function.__proto__指向Function.prototype，是一个对象，对象没有prototype属性，所以是undefined
Function.__proto__.prototype === undefined; //true
// Function.__proto__指向Function.prototype, 构造函数.prototype.constructor指向自身，所以...
Function.__proto__.constructor === Function; //true
// Function.__proto__指向Function.prototype, 是一个对象，这个对象是Object的实例，所以...
Function.__proto__.__proto__ === Object.prototype; //true
// Function.__proto__.__proto__指向Object.prototype，构造函数.prototype.constructor指向构造函数自身，所以...
Function.__proto__.__proto__.constructor === Object; //true
// Function.__proto__.__proto__指向Object.prototype，Object.prototype的上一层是原型链的终点，JS规定值为null
Function.__proto__.__proto__.__proto__ === null; //true

// Object也是一个构造函数，构造函数.prototype.constructor指向构造函数自身
Object.prototype.constructor === Object; //true
// Object.prototype的上一层是原型链的终点，即null
Object.prototype.__proto__ === null; //true
// Object还是它父构造函数的一个实例，所以Object.__proto__指向了Function.prototype
Object.__proto__ === Function.prototype; //
// Object.__proto__指向它的父构造函数.prototype，是一个对象，所以父构造函数.prototype再上一层则指向了Object.prototype
Object.__proto__.__proto__ === Object.prototype; //
// Object.__proto__指向它的父构造函数.prototype，构造函数.prototype.constructor指向自身，所以...
Object.__proto__.constructor === Function; //
// 1）Object.__proto__指向父构造函数.prototype，是一个对象；2）对象.__proto__指向Object.prototype；3）Object.prototype.__proto__为终点null
Object.__proto__.__proto__.__proto__ === null; //
