{
    let person = {};
    let personName = 'lihua';
    Object.defineProperty(person, 'namep', {
        get: function () {
            console.log('触发了get方法');
            return personName;
        },
        set: function (val) {
            console.log('触发了set方法');
            personName = val;
        },
    });
    console.log(person.namep);
    personName = 'liming';
    console.log(person.namep);
    person.namep = 'huahua';
    console.log(person.namep);
}
{
    {
        // 假设对一个对象的每个属性都加监听，那么要遍历object所有的key，然后添加Object.defineProperty的方法
        // 但是这个时候 我们外层访问Object的属性的时候会走getter的监听，然后getter返回这个时候又通过person[key]又回触发监听
        // 这就会出现递归死循环，而导致内存溢出
        const person = { name: 'zs', age: 18, class: '1' };
        Object.keys(person).forEach(function (key) {
            Object.defineProperty(person, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return person[key];
                },
                set(val) {
                    console.log(`对person中的${key}属性进行了修改`);
                    person[key] = val;
                },
            });
        });
        console.log(person.age);
    }
    {
        // 解决方案 get的时候返回的直接是值，不通过对象去访问属性
        // 增加一个观察者Obsever
        const person = { name: 'zs', age: 18, class: '1' };
        function Obsever(obj) {
            Object.keys(obj).forEach(function (key) {
                objectProperty(obj, key, obj[key]);
            });
        }
        function objectProperty(obj, key, val) {
            Object.defineProperty(obj, key, {
                get() {
                    console.log('触发了get方法');
                    return val;
                },
                set(newVal) {
                    console.log('触发了set方法');
                    val = newVal;
                },
            });
        }
        Obsever(person);
        console.log(person.age);
        person.age = 20;
        console.log(person.age);
    }
    {
        /**
         *假设对一个对象的每个属性都加监听，那么要遍历object所有的key，然后添加Object.defineProperty的方法
         *但是这个时候 我们外层访问Object的属性的时候会走getter的监听，然后getter返回这个时候又通过person[key]又回触发监听
         *这就会出现递归死循环，而导致内存溢出
         *解决方案 get的时候返回的直接是值，不通过对象去访问属性
         *增加一个观察者Obsever
         *深度监听一个对象，通过递归
         */
        const person = {
            name: 'zs',
            age: 18,
            class: '1',
            family: { father: 'ls', mother: 'zz' },
        };
        function Obsever(obj) {
            if (obj === null || typeof obj !== 'object') {
                return;
            }
            Object.keys(obj).forEach(function (key) {
                objectProperty(obj, key, obj[key]);
            });
        }
        function objectProperty(obj, key, val) {
            if (typeof val === 'object') {
                Obsever(val);
            }
            Object.defineProperty(obj, key, {
                get() {
                    console.log('触发了get方法');
                    return val;
                },
                set(newVal) {
                    if (newVal !== null && typeof newVal === 'object') {
                        Obsever(newVal);
                    }
                    console.log('触发了set方法');
                    val = newVal;
                },
            });
        }
        Obsever(person);
        // console.log(person.age);
        // person.age = 20;
        // console.log(person.age);
        console.log(person.family.father);
    }
}
{
    let obj = { a: { b: '123123' } };
    const proxy = new Proxy(obj, {
        get: function (tatget, key) {
            return tatget[key];
        },
        set: function (target, key, value) {
            target[key] = value;
            return true;
        },
    });
    proxy.a.b = 'abcccc';
    console.log(proxy.a.b);
}
{
    let person = {
        age: 0,
        school: 'xdu',
        children: {
            name: '小明',
        },
    };
    let hander = {
        get(obj, key) {
            return key in obj ? obj[key] : 66;
        },
        set(obj, key, val) {
            obj[key] = val;
            return true;
        },
    };
    let proxyObj = new Proxy(person, hander);
    // 测试set
    proxyObj.children.name = '菜菜'; // 触发了get
    console.log(proxyObj.children.name); //输出: 触发了get 菜菜
}
