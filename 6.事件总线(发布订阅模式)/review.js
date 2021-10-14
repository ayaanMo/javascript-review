class EventEmitter {
  constructor() {
    this.eventList = [];
  }
  subscribe(name, fn) {
    const item = element => element.eventName === name;
    let index = this.eventList.findIndex(item);
    if (index < 0) {
      this.eventList.push({ eventName: name, fn: fn });
    }
  }
  unsubscribe() {}
  publish(name, ...args) {
    const item = element => element.eventName === name;
    let index = this.eventList.findIndex(item);
    if (index >= 0) {
      let fn = this.eventList[index].fn;
      fn(...args);
    }
  }
}

let fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`);
};
console.log(pubsub.eventList);
pubsub.subscribe('aaa', fn1);
pubsub.subscribe('bbb', fn2);
pubsub.publish('aaa', '布兰', 12);
pubsub.publish('bbb', '布兰', 12);
console.log(pubsub.eventList);
