function multiply(a, b, c) {
    return a * b * c;
}
//生产偏函数的工厂
function partial(fn, a) {
    return function (b, c) {
        return fn(a, b, c);
    };
}

//变量parMulti接受返回的新函数
var parMulti = partial(multiply, 1);

//在调用的时候传入剩余的参数
parMulti(2, 3); // 6

/* 例如bind函数可以让我们传入一个或多个想要预设的参数，之后返回一个新函数，并拥有指定的this值和预设参数。
当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。 */
function addition(x, y) {
    return x + y;
}
const plus5 = addition.bind(null, 5);
plus5(10); // output -> 15
plus5(20); // output -> 25

// 我们预先传入了参数5，并返回了一个新函数赋值给plus5，此函数可以接受剩余的参数。调用plus5传入剩余参数10得出最终结果15，如传入20得出25。偏函数通过设定预设值，帮我们实现代码上的复用。
