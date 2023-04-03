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
