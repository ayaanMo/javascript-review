{
    // console.log(null instanceof Object);
    // console.log({} instanceof Object);
    // console.log([] instanceof Array);
    // console.log(Object.getPrototypeOf(function () {}));
    function instaceOf(left, right) {
        let prototype = right.prototype;
        let proto = Object.getPrototypeOf(left);
        while (true) {
            if (proto === null) {
                return false;
            }
            if (proto === prototype) {
                return true;
            }
            proto = Object.getPrototypeOf(proto);
        }
    }
    // 定义构造函数
    function C() {}
    function D() {}

    var o = new C();
    console.log(instaceOf(o, C)); // true，因为 Object.getPrototypeOf(o) === C.prototype

    console.log(instaceOf(o, D)); // false，因为 D.prototype 不在 o 的原型链上

    instaceOf(o, Object); // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
    instaceOf(C.prototype, Object); // true，同上

    C.prototype = {};
    var o2 = new C();

    instaceOf(o2, C); // true

    instaceOf(o, C); // false，C.prototype 指向了一个空对象，这个空对象不在 o 的原型链上。

    D.prototype = new C(); // 继承
    var o3 = new D();
    instaceOf(o3, D); // true
    instaceOf(o3, C); // true 因为 C.prototype 现在在 o3 的原型链上
}
