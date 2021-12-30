function flattening_1(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flattening_1(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(flattening_1([1, [2, 3, [4, [5, 6, 7, 8, [9, [10]]]]]]));

function flattening_2(arr) {
    while (arr.some(item => Array.isArray(item))) {
        console.log(...arr);
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flattening_2([1, [2, 3, [4, [5, 6, 7, 8, [9, [10]]]]]]));
