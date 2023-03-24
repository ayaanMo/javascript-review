{
    const obj = { a: 1, b: 2, c: 3 };
    console.log(obj[Symbol.iterator]);
    const arr = [1, 2, 3, 4, 5, 6];
    console.log(arr[Symbol.iterator]);
    const iter = arr[Symbol.iterator]();
    console.log(iter);
    console.log(iter.next());
    console.log(iter.next());
}
{
    // 实现链表结构
    function Obj(value) {
        this.value = value;
        this.next = null;
    }
    Obj.prototype[Symbol.iterator] = function () {
        var iterator = { next: next };
        var current = this;
        function next() {
            if (current) {
                var value = current.value;
                current = current.next;
                return { down: false, value: value };
            }
            return { done: true };
        }
        return iterator;
    };
    var one = new Obj(1);
    var two = new Obj(2);
    var three = new Obj(3);
    one.next = two;
    two.next = three;
    for (let i of one) {
        console.log(i);
    }
}
{
    const str = 'abcdefg';
    const iterator = str[Symbol.iterator]();
    console.log(iterator);
    console.log(iterator.next);
    console.log(iterator.return);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}
{
    // 自定义一个迭代器
    function Counter(value) {
        this.init = value;
    }
    Counter.prototype[Symbol.iterator] = function () {
        let count = 1,
            limit = this.init;
        return {
            next() {
                if (limit >= count) {
                    return { value: count++, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            },
            return() {
                console.log('退出了');
                return { value: undefined, done: true };
            },
            throw() {
                console.log('报错了');
                return { value: undefined, done: true };
            },
        };
    };
    let count = new Counter(4);
    const iterator = count[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    for (let i of count) {
        console.log(i);
        if (i > 2) {
            throw new Error('强制退出');
        }
    }
}
{
    // 单项链表
    function Node(data) {
        this.data = data;
        this.next = null;
    }
    function LinkData() {
        this.head = null;
    }
    LinkData.prototype.add = function (value) {
        const node = new Node(value);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    };
    let link = new LinkData();
    link.add(1);
    link.add(2);
    console.dir(link);
}
