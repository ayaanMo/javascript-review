// call、apply相关用法
// call方法可以用来代替另一个对象调用一个方法，call方法可以将一个函数的对象上下文从初始的上下文改变为obj指定的新对象，如果没有提供obj参数，那么Global对象被用于obj。
// Function.call(obj[, param1[, param2[, [,...paramN]]]]);
// Function.apply(obj[, argArray]);
// call()可以让括号里的对象来继承括号外函数的属性
// call和apply的区别就是接受参数的方式不同
// apply接收的是参数数组  Function.call(obj[, param1[, param2[, [,...paramN]]]]);
// call传递给函数的参数必须罗列出来 Function.apply(obj[, argArray]);
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.add = function () {
    return 3;
  };
}
function Student(name, age, grade) {
  this.grade = grade;
  Person.call(this, name, age);
}
let stu = new Student('张三', 18, '二年级');
console.log(stu);

/** 字符串截取substring substr slice */
// 包前不包后 返回最新的截取字符串
// 如果startIndex和endIndex相等则返回字符串，如果endIndex大于startIndex  则会调转两个位置  并且startIndex和endIndex都是非负整数 假如为负数则返回整个字符串
// substring(startIndex, endIndex);
let str01 = 'Hello World';
console.log(str01.substring(3, 7)); // lo W
console.log(str01.substring(-3)); //Hello World
// 如果start为负数 则从尾部开始算起  第二个参数代表是截取的长度
// substr(start,length)
let str02 = 'Hello World';
console.log(str02.substr(3, 7)); //lo Worl
console.log(str02.substr(-3, 2)); //rl
// start和end可以为负数，负数相当于就是从末尾开始算起
// slice(start,end)
let str03 = 'Hello World';
console.log(str03.slice(3, 7)); //lo W
console.log(str03.slice(-3)); //rld
