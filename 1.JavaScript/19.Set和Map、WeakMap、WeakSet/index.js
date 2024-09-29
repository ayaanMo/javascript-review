/**
 * Set和WeakSet是ES6中新增的数据结构，都是用来存储一组唯一的值的。但是，它们两者之间还是有一些区别的。
 Set
- Set是一种集合，内部的元素不允许重复。
- Set可以存储任何数据类型，包括基本类型和引用类型。
- Set的可迭代性（Iterable）使得它可以被for...of遍历，也可以使用forEach方法进行遍历。
- Set可以用来去除数组中的重复元素。
- Set的实例方法包括add()、delete()、has()、clear()。
 WeakSet
- WeakSet也是一种集合，但是只能存储对象类型的数据，而不能存储基本类型的数据。
- WeakSet中的对象是弱引用，即如果一个对象在WeakSet中存在，但是在其他地方没有被引用，那么垃圾回收机制会自动清除它，所以常常用来存储临时对象。
- WeakSet没有size属性，也不能使用for...of和forEach方法进行遍历。
- WeakSet的实例方法包括add()、delete()、has()。
 使用场景：
- 在判断一个集合中是否包含某个指定值的情况下，可以使用Set。
- 在需要存储临时对象的场景下，可以使用WeakSet。
- 当需要避免内存泄露的情况下，也可以使用WeakSet。由于WeakSet只持有弱引用，所以可以避免对象被强引用而无法被垃圾回收的情况。
- WeakSet还可以用来实现私有属性，因为WeakSet中的属性不会被外部代码访问到。
 */
/**
 * Map 和 WeakMap 都是 ES6 中新增的键值对集合，它们的基本功能类似，但是在使用场景和一些特性上还是有一些区别的。
 Map：
- Map 中的键和值可以是任意类型的数据，而 WeakMap 中的键只能是对象类型数据。
- Map 中的键值对是强引用关系，即使该键值对的键没有被其他地方引用也不会被垃圾回收，除非整个 Map 实例被销毁。因此，如果使用 Map 存储大量数据，可能会导致内存泄漏。
- Map 有 size 属性，可以使用 for...of 遍历其中的键值对，也可以使用 forEach 方法进行遍历，支持迭代器协议。
 WeakMap：
- WeakMap 中的键是弱引用关系，即如果一个键没有被其他地方引用，那么垃圾回收机制会自动清除它。因此，WeakMap 不会导致内存泄漏。
- WeakMap 没有 size 属性，也不支持 forEach 方法和 for...of 循环，因为其键不是稳定的，无法确定它们何时被垃圾回收。
- WeakMap 主要用于存储对象与对象之间的关联关系，例如将对象作为键，存储一些元数据。
 使用场景：
- Map 适合存储一些与键值对有强关联的数据，例如缓存数据、保存 DOM 元素属性等。
- WeakMap 适合存储对象间关联关系，例如将对象作为键，存储对象的一些属性和方法，或者用于实现私有属性和方法。另外，如果需要存储大量数据，又需要确保不会发生内存泄漏，可以考虑使用 WeakMap。
- 需要注意的是，由于 WeakMap 的键是弱引用关系，所以当键被垃圾回收时，对应的键值对也会被自动删除，因此在使用 WeakMap 时需要仔细考虑需求和使用方式。
 */
{
    // map
    let map = new Map([
        [{ a: 1 }, '4'],
        ['2', '5'],
    ]);
    map.set(3, 5);
    map.forEach(function (value, key) {
        console.log(value, key);
    });
    console.log(map.keys());
    console.log(map.values());
    console.log(map.entries());
    console.log(...map);
    console.log(map.get(3));
    console.log(map.delete(3));
    console.log(map.has('1'));
    console.log(map.size);
    console.log(map.clear());
    console.log(map);
}
{
    let obj = {};
    let weakmap = new WeakMap([[obj, {}]]);
    console.log(weakmap.has(obj));
}
{
    const set = new Set(['red', 'green', 'blue']);
    set.add({ a: 1 });
    for (let i of set) {
        console.log(i);
    }
}
