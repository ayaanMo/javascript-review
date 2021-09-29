//数组扁平化
let arr = [1, [2, [3, [4, 5, [6]]]]];
function flattening(arr) {
    let res = [];
    // 1.循环数组
    for (let i = 0; i < arr.length; i++) {
        // 2.判断当前循环元素是否是数组，如果是数组进行递归循环
        if (Array.isArray(arr[i])) {
            res = res.concat(flattening(arr[i]));
        } else {
            // 3.不是数组类型的元素 存入新的数组里面去
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(flattening(arr));
// flat() 方法会按照一个可指定的深度递归遍历数组，
// 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
// 使用 Infinity，可展开任意深度 的嵌套数组
console.log(arr.flat(Infinity));
function flat(arr) {
    // 1.some循环一直得到arr数组里面的元素不再是数组元素为止
    // 2.再利用扩展运算符拼接到新的数组里面去
    while (arr.some(item => Array.isArray(item))) {
        console.log(...arr);
        arr = [].concat(...arr);
    }
    return arr;
}
console.log(flat(arr));
