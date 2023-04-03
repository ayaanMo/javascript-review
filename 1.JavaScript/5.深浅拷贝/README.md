总结:

    1.核心内容是通过递归来循环遍历object，将对象中的每个属性循环到最基本的基本类型
    2.判断逻辑：

        * 遍历为null直接return
        * 为基本类型直接return
        * 为特殊类型 Date、RegExp、HTMLElement 通过各自的构造方法直接return
        * 引入WeakMap 通过判断是否存在，来存储对象循环引用的问题
        * 其他对象直接通过各自的构造器创造新的实例，来进行复制  new target.constructor()
        * 循环的时候使用Reflect.ownKeys解决for in无法遍历出Symbol最为键值的属性
