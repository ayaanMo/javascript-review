// 数据类型判断
// 所有类在继承Object的时候，改写了toString()方法；只有Object原型上的方法可以输出数据类型
// 测试一下
function typeOf(obj) {
    console.log(Object.prototype.toString.call(obj)); // [object Array]
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    console.log(res); // Array]

    res = res.substring(0, res.length - 1).toLowerCase();
    return res;
}
console.log(typeOf(['a']));
