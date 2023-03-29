function Node(data) {
    this.data = data;
    this.next = null;
}
function LinkData() {
    this.head = null;
}
// 添加
LinkData.prototype.add = function (data) {
    const node = new Node(data);
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
LinkData.prototype.insert = function (data, target) {
    const node = new Node(data);
    let current = this.head;
    while (current.next) {
        if (current.data === target) {
            node.next = current.next;
            current.next = node;
            break;
        }
        current = current.next;
    }
};
LinkData.prototype.delete = function (target) {
    let current = this.head;
    let prev = null;
    while (current.next) {
        if (current.data === target) {
            prev.next = current.next;
            current.next = null;
            prev = null;
            break;
        }
        prev = current;
        current = current.next;
    }
};
let link = new LinkData();
link.add(1);
link.add(2);
console.dir(link, { depth: null });
link.add(3);
link.insert(4, 2);
console.dir(link, { depth: null });
link.delete(4);
console.dir(link, { depth: null });
