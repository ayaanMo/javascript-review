// https://juejin.cn/post/7038386476630933541  参考地址
class neNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// 实现一个单项链表
class singleLinkedList {
    constructor() {
        this.head = null;
    }
    // 添加节点
    add(data) {
        let node = new neNode(data);
        if (this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
    }
    // 插入节点
    insert(data, target) {
        let node = new neNode(data);
        let current = this.head;
        while (current.next) {
            if (current.data === target) {
                node.next = current.next;
                current.next = node;
                break;
            }
            current = current.next;
        }
    }
    // 查找节点
    find(data) {
        let current = this.head;
        while (current) {
            if (current.data === data) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
    // 删除节点
    remove(data) {
        let current = this.head;
        let previous = null;
        while (current) {
            if (current.data === data) {
                if (previous === null) {
                    this.head = current.next;
                } else {
                    previous.next = current.next;
                }
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }
}
const list = new singleLinkedList();
list.add(1);
list.add(2);
list.add(3);
list.insert(4, 2);
console.dir(list, { depth: null });
