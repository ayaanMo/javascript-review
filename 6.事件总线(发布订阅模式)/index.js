// 事件总线
class EventEmitter {
  constructor() {
    this.cache = {};
  }
  subscribe(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }
  unsubscribe(name, fn) {
    let tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex(f => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }
  publish(name, once = false, ...args) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}

// 测试
let pubsub = new EventEmitter();
let fn1 = function (name, age) {
  console.log(`${name} ${age}`);
};
let fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`);
};
pubsub.subscribe('aaa', fn1);
pubsub.subscribe('bbb', fn2);
pubsub.unsubscribe('aaa');
pubsub.publish('aaa', false, '布兰', 12);
pubsub.publish('bbb', false, '布兰', 12);
// '布兰 12'
// 'hello, 布兰 12'
