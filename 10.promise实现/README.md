总结:

    2023.03.06
        1.定义一个class Promise，构造函数定义一个运行函数fn，形参定义两个resolve和reject
        2.定义三个静态成员变量，pending、fulfilled、rejected
        3.resolve和reject两个私有方法，进行实现，都是状态为pending方法的时候才能进行调用
        4.利用try/catch 包裹运行函数fn，代码运行错误的时候调用rejected
        5.实现初步then函数，定义在原型对象上，两个形参(onFulfilled和onRejected)必须是函数类型，进行一个三目运算，
            onFulfilled=typeof onFulfilled ==="Function"?onFulfilled:value=>value;
            onRejected=typeof onRejected ==="Function"?onRejected:reason=>{throw reason};

    
