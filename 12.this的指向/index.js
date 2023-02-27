// 应用了默认绑定，this指向全局对象（非严格模式下），严格模式下，this指向undefined，undefined上没有this对象，会抛出错误
// 如果在node环境中运行，结果就是 Hello,undefined.这是因为node中name并不是挂在全局对象上的
// 需要注意的是：对象属性链中只有最后一层会影响到调用位置。
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    let name = 'YvetteLau';
    sayHi();
    // 默认绑定  Hello YvetteLau
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    person.sayHi();
    // 隐式绑定  Hello YvetteLau
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person2 = {
        name: 'Christina',
        sayHi: sayHi,
    };
    var person1 = {
        name: 'YvetteLau',
        friend: person2,
    };
    person1.friend.sayHi();
    // 隐式绑定  Hello Christina
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    var Hi = person.sayHi;
    Hi();
    // 肯定不是隐式绑定，但是也不一定就是默认绑定 Hello Wiliam
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person2 = {
        name: 'Christina',
        sayHi: sayHi,
    };
    var person1 = {
        name: 'YvetteLau',
        friend: person2,
    };
    person1.friend.sayHi();
    // hello Christina
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person1 = {
        name: 'YvetteLau',
        sayHi: function () {
            setTimeout(function () {
                console.log('Hello,', this.name);
            });
        },
    };
    var person2 = {
        name: 'Christina',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    person1.sayHi();
    setTimeout(person2.sayHi, 100);
    setTimeout(function () {
        person2.sayHi();
    }, 200);
    // hello Wiliam hello Wiliam hello Christina
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    var Hi = person.sayHi;
    Hi.call(person);
    // hello YvetteLau
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    var Hi = function (fn) {
        fn();
    };
    Hi.call(person, person.sayHi);
    // hello Wiliam
}
{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var person = {
        name: 'YvetteLau',
        sayHi: sayHi,
    };
    var name = 'Wiliam';
    var Hi = function (fn) {
        fn.call(this);
    };
    Hi.call(person, person.sayHi);
    // hello YvetteLau
}
{
    var obj = {
        hi: function () {
            console.log(this);
            return () => {
                console.log(this);
            };
        },
        sayHi: function () {
            return function () {
                console.log(this);
                return () => {
                    console.log(this);
                };
            };
        },
        say: () => {
            console.log(this);
        },
    };

    let hi = obj.hi();
    hi();
    let sayHi = obj.sayHi();
    let fun1 = sayHi();
    fun1();
    obj.say();

    // 输出obj
    // 输出obj
    // 输出window
    // 输出window
    // 输出window
}
{
    var obj = {
        hi: function () {
            console.log(this);
            return () => {
                console.log(this);
            };
        },
        sayHi: function () {
            return function () {
                console.log(this);
                return () => {
                    console.log(this);
                };
            };
        },
        say: () => {
            console.log(this);
        },
    };
    let sayHi = obj.sayHi();
    let fun1 = sayHi();
    fun1();
    let fun2 = sayHi.bind(obj)();
    fun2();

    // 输出window
    // 输出window
    // 输出obj
    // 输出obj
}
{
    var number = 5;
    var obj = {
        number: 3,
        fn: (function () {
            var number;
            this.number *= 2;
            number = number * 2;
            number = 3;
            return function () {
                var num = this.number;
                this.number *= 2;
                console.log(num);
                number *= 3;
                console.log(number);
            };
        })(),
    };
    // 闭包先执行 这个时候的number等于3 this.number 定义的是window上的number则 number为10
    var myFun = obj.fn;
    // 这个时候window上面的number为 10  闭包里面的numer为9
    myFun.call(null); //10 9
    obj.fn(); // 3 27
    console.log(window.number); //20
}
{
    var name = 'zcxiaobao';
    function introduce() {
        console.log('Hello,My name is ', this.name);
    }
    const Tom = {
        name: 'TOM',
        introduce: function () {
            let _this = this;
            setTimeout(function () {
                console.log(this);
                console.log('Hello, My name is ', _this.name);
                console.log('Hello, My name is ', this.name);
            });
        },
    };
    const Mary = {
        name: 'Mary',
        introduce,
    };
    const Lisa = {
        name: 'Lisa',
        introduce,
    };

    Tom.introduce(); // Tom Hello, My name is TOM
    setTimeout(Mary.introduce, 100); // window Hello, My name is zcxiaobao
    setTimeout(function () {
        Lisa.introduce(); // Hello, My name is Lisa
    }, 200);
}
{
    var name = 'javascript';
    let obj = {
        name: 'obj',
        A() {
            this.name += 'this';
            console.log(this.name);
        },
        B(f) {
            this.name += 'this';
            f();
        },
        C() {
            setTimeout(function () {
                console.log(this.name);
            }, 1000);
        },
    };
    let a = obj.A;
    a(); //"javascriptthis"

    obj.B(function () {
        console.log(this.name);
    }); //"javascriptthis"
    obj.C(); //"javascriptthis"
    console.log(name); //"javascriptthis"
}
{
    function foo() {
        console.log(this.a);
    }
    var obj = { a: 1 };
    var a = 2;

    foo();
    foo.call(obj);
    foo.apply(obj);
    foo.bind(obj);
}
{
    var obj1 = {
        a: 1,
    };
    var obj2 = {
        a: 2,
        bar: function () {
            console.log(this.a);
        },
        foo: function () {
            setTimeout(
                function () {
                    console.log(this);
                    console.log(this.a);
                }.call(obj1),
                0
            );
        },
    };
    var a = 3;
    obj2.bar(); // 2
    obj2.foo(); // a 1
}
{
    function foo() {
        console.log(this.a);
    }
    var obj = { a: 1 };
    var a = 2;

    foo(); //2
    foo.call(obj); //1
    foo().call(obj); //2
}
{
    function foo() {
        console.log(this.a);
        return function () {
            console.log(this.a);
        };
    }
    var obj = { a: 1 };
    var a = 2;

    foo(); //2
    foo.call(obj); //1
    foo().call(obj); //2 1
}
{
    function foo() {
        console.log(this.a);
        return function () {
            console.log(this.a);
        };
    }
    var obj = { a: 1 };
    var a = 2;

    foo(); // 2
    foo.bind(obj);
    foo().bind(obj); //2
}
{
    function foo() {
        console.log(this.a);
        return function () {
            console.log(this.a);
        };
    }
    var obj = { a: 1 };
    var a = 2;
    foo.call(obj)(); // 1 2
}
{
    var obj = {
        a: 'obj',
        foo: function () {
            console.log('foo:', this.a);
            return function () {
                console.log('inner:', this.a);
            };
        },
    };
    var a = 'window';
    var obj2 = { a: 'obj2' };

    obj.foo()(); //foo: obj inner window
    obj.foo.call(obj2)(); // foo: obj2 inner window
    obj.foo().call(obj2); // foo: obj inner obj2
}
{
    var obj = {
        a: 1,
        foo: function (b) {
            var b = b || this.a;
            return function (c) {
                console.log(this.a + b + c);
            };
        },
    };
    var a = 2;
    var obj2 = { a: 3 };

    obj.foo(a).call(obj2, 1); //3+2+1  6
    obj.foo.call(obj2)(1); //2+3+1 6  这个有意思
}
{
    const obj = { a: 10 };
    const arr = [1, 2, 3, 4];
    arr.forEach(function (val, key) {
        console.log(`${key}: ${val} --- ${this.a}`);
    }, obj);
    // 0 :1 ---- 10 .....
}
{
    function User(name, age) {
        this.name = name;
        this.age = age;
    }
    var name = 'Tom';
    var age = 18;

    var zc = new User('zc', 24);
    console.log(zc.name); //zc
}
{
    function User(name, age) {
        this.name = name;
        this.age = age;
        this.introduce = function () {
            console.log(this.name);
        };
        this.howOld = function () {
            return function () {
                console.log(this.age);
            };
        };
    }
    var name = 'Tom';
    var age = 18;
    var zc = new User('zc', 24);
    zc.introduce(); //zc
    zc.howOld()(); //18
}
{
    const User = {
        name: 'zc',
        age: 24,
        introduce: function () {
            console.log(this.name);
        },
        howOld: function () {
            return function () {
                console.log(this.age);
            };
        },
    };
    var name = 'Tom';
    var age = 18;
    User.introduce(); //zc
    User.howOld()(); //18
}
{
    // new 界天王山
    /**
        Go{
            Foo: fn(Foo)
            getName:function(){console.log(5)}
        }
        Foo构造函数
     */
    function Foo() {
        getName = function () {
            console.log(1);
        };
        return this;
    }
    Foo.getName = function () {
        console.log(2);
    };
    Foo.prototype.getName = function () {
        console.log(3);
    };
    var getName = function () {
        console.log(4);
    };
    function getName() {
        console.log(5);
    }
    // 访问函数上的存储的静态属性 返回2
    Foo.getName();
    // 变量提升 返回的4
    getName();
    //先执行Foo返回的this指向的是window 默认绑定  并且Foo()方法体中的getName没有定义会往外层找则相当于覆盖的全局的getName上方法 返回1
    Foo().getName();
    // 默认绑定规则，运行全局上面的getName方法 返回1
    getName();
    // 转换成执行方式 就是new (Foo.getName)() 返回是2
    new Foo.getName();
    // ((new Foo()).getName)() 返回3
    new Foo().getName();
    // new ((new Foo()).getName)(); 返回3
    new new Foo().getName();
}
{
    var name = 'tom';
    const obj = {
        name: 'zc',
        intro: () => {
            console.log('My name is ' + this.name);
        },
    };
    obj.intro(); // My name is tom
}
{
    var name = 'tom';
    const obj = {
        name: 'zc',
        intro: function () {
            return () => {
                console.log('My name is ' + this.name);
            };
        },
        intro2: function () {
            return function () {
                console.log('My name is ' + this.name);
            };
        },
    };
    obj.intro2()(); // my name is tom
    obj.intro()(); // my name is zc
}
{
    var name = 'window';
    const obj1 = {
        name: 'obj1',
        intro: function () {
            console.log(this.name);
            return () => {
                console.log(this.name);
            };
        },
    };
    const obj2 = {
        name: 'obj2',
        intro: () => {
            console.log(this.name);
            return function () {
                console.log(this.name);
            };
        },
    };
    const obj3 = {
        name: 'obj3',
        intro: () => {
            console.log(this.name);
            return () => {
                console.log(this.name);
            };
        },
    };
    //obj1 obj1
    obj1.intro()();
    // window window
    obj2.intro()();
    // window window
    obj3.intro()();
}
{
    function User(name, age) {
        this.name = name;
        this.age = age;
        (this.intro = function () {
            console.log('My name is ' + this.name);
        }),
            (this.howOld = () => {
                console.log('My age is ' + this.age);
            });
    }

    var name = 'Tom',
        age = 18;
    var zc = new User('zc', 24);
    zc.intro(); //zc
    zc.howOld(); //24
}
{
    var name = 'window';
    var obj1 = {
        name: 'obj1',
        intro: function () {
            console.log(this.name);
            return () => {
                console.log(this.name);
            };
        },
        intro2: () => {
            console.log(this.name);
            return function () {
                console.log(this.name);
            };
        },
    };
    var obj2 = {
        name: 'obj2',
    };
    // obj2 obj2
    obj1.intro.call(obj2)();
    // obj1 obj1
    obj1.intro().call(obj2);
    // window window
    obj1.intro2.call(obj2)();
    // window obj2
    obj1.intro2().call(obj2);
}
{
    var name = 'window';
    var user1 = {
        name: 'user1',
        foo1: function () {
            console.log(this.name);
        },
        foo2: () => console.log(this.name),
        foo3: function () {
            return function () {
                console.log(this.name);
            };
        },
        foo4: function () {
            return () => {
                console.log(this.name);
            };
        },
    };
    var user2 = { name: 'user2' };
    // 隐式绑定 user1
    user1.foo1();
    // 显示绑定 user2
    user1.foo1.call(user2);
    // window
    user1.foo2();
    // window
    user1.foo2.call(user2);
    // window
    user1.foo3()();
    // window
    user1.foo3.call(user2)();
    // user2
    user1.foo3().call(user2);
    // user1
    user1.foo4()();
    // user2
    user1.foo4.call(user2)();
    // user1
    user1.foo4().call(user2);
}
{
    var x = 10;
    var foo = {
        x: 20,
        bar: function () {
            var x = 30;
            console.log(this.x);
        },
    };
    foo.bar();
    foo.bar();
    (foo.bar = foo.bar)();
    (foo.bar, foo.bar)();
}
{
    var length = 10;
    function fn() {
        console.log(this.length);
    }

    var obj = {
        length: 5,
        method: function (fn) {
            fn();
            // 这个地方将this绑定在arguments上面了[fn,1,length]
            arguments[0]();
        },
    };
    // 10 和2
    obj.method(fn, 1);
}
{
    var number = 5;
    var obj = {
        number: 3,
        fn: (function () {
            var number;
            this.number *= 2;
            number = number * 2;
            number = 3;
            return function () {
                var num = this.number;
                this.number *= 2;
                console.log(num);
                number *= 3;
                console.log(number);
            };
        })(),
    };
    var myFun = obj.fn;
    // 20 和 9
    myFun.call(null);
    // 3 27
    obj.fn();
    // 20
    console.log(window.number);
}
{
    var num = 10;
    var obj = { num: 20 };
    obj.fn = (function (num) {
        this.num = num * 3;
        num++;
        return function (n) {
            this.num += n;
            num++;
            console.log(this.num);
            console.log(num);
        };
    })(obj.num);

    var fn = obj.fn;

    fn(5);

    obj.fn(10);
    // 立即执行函数  限制性 此时的num 是21
    // 后面的两次执行都会把 num+1
}
