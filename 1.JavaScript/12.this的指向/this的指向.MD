1. 如何准确判断this指向的是什么？
（1）函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
（2）函数是否通过call, apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
（3）函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
（4）如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
（5）如果把Null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
（6）如果是箭头函数，箭头函数的this继承的是外层代码块的this。
（7）new绑定 > 显式绑定 > 隐式绑定 > 默认绑定
https://github.com/YvetteLau/Blog/issues/6

2. 箭头函数
    （1）函数体内的this对象，继承的是外层代码块的this。

    （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

    （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

    （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

    （5）箭头函数没有自己的this，所以不能用call()、apply()、bind()这些方法去改变this的指向.

3. this的五种绑定规则(https://mp.weixin.qq.com/s/B-yVmcNjkPGOAVBDN9cQ7Q)
   (1)  默认绑定

            1. 默认绑定通常指的是函数独立调用，不涉及其他绑定规则，非严格模式指向的是window严格模式下指向的是undefined

   (2)  隐式绑定

            函数调用是在某个对象上触发的，即调用位置上存在上下文对象，通俗来说就是"XXX.func()",如果存在链式调用，则此时的this永远指向的都是最后调用它的那个对象
            隐式绑定会有两种情况会发生绑定丢失的情况：

                1.  使用另一个变量作为函数的别名，然后直接使用别名进行运行方法
                2.  将函数作为参数进行传递的时候会进行隐式赋值
                3.  回调函数中的this会指向window，所以需要提前存储下this对象

   (3)  显式绑定

            显式绑定的几种形式：call、apply、bind

                1. call和apply传递的分别是若干参数和数组
                2. call和apply会立即执行函数
                3. bind会返回一个新的函数，不会立即执行函数

   (4)  new 绑定
   (5)  ES6箭头函数绑定

        箭头函数没有自己的this，它的this是指向外层作用域的this，且指向函数定义时的this而不是运行中的this

   (6)箭头函数扩展

        箭头函数没有this，它的this是通过作用域链查到外层作用域的this，且指向函数定义时的this而非执行时。
        不可以用作构造函数，不能使用new命令，否则会报错
        箭头函数没有arguments对象，如果要用，使用rest参数代替
        不可以使用yield命令，因此箭头函数不能用作Generator函数。
        不能用call/apply/bind修改this指向，但可以通过修改外层作用域的this来间接修改。
        箭头函数没有prototype属性。
