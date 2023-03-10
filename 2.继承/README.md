总结：

    1.定义父类构造函数，父类构造函数内部定义成员变量，原型对象上存放公共方法；
    2.定义子类构造函数，子类构造函数内部通过call继承父类的公共属性；
    3.通过Object.create(父类.prototype),创建一个原型对象指向父类的实例
        实现: function object(o){
            function f(){};
            f.prototype = o;
            return new f();
        }
        function inheritPrototype(parent,child){
            let prototype = object(parent.prototype);
            prototype.constructor = child;
            child.prototype = prototype
        }
