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
