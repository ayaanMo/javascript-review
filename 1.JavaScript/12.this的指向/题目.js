{
    function sayHi() {
        console.log('Hello,', this.name);
    }
    var name = 'YvetteLau';
    sayHi();
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
    myFun.call(null);
    obj.fn();
    console.log(window.number);
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

    Tom.introduce();
    setTimeout(Mary.introduce, 100);
    setTimeout(function () {
        Lisa.introduce();
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
    a();

    obj.B(function () {
        console.log(this.name);
    });
    obj.C();
    console.log(name, +'32323');
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
    foo.bind(obj)();
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
    obj2.bar();
    obj2.foo();
}
{
    function foo() {
        console.log(this.a);
    }
    var obj = { a: 1 };
    var a = 2;

    foo();
    foo.call(obj);
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

    foo();
    foo.bind(obj);
    foo().bind(obj);
}
