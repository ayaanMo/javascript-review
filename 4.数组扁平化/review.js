//数组扁平化
let arr = [1, [2, [3, [4, 5, [6]]]]];
function flattening(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flattening(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}
console.log(flattening(arr));
// flat() 方法会按照一个可指定的深度递归遍历数组，
// 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回
// 使用 Infinity，可展开任意深度的嵌套数组
console.log(arr.flat(3));
