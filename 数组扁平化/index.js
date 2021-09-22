// 数组扁平化
let arr = [1, [2, [3]]];
console.log(arr.flat(2));

// ES5
function flatten_es5(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten_es5(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
console.log(flatten_es5(arr));
// ES6
// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值
// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
function flatten_es6(arr) {
  while (arr.some(item => Array.isArray(item))) {
    console.log(arr, '---');
    console.log(...arr);
    arr = [].concat(...arr);
    console.log(arr, '+++');
  }
  return arr;
}
console.log(flatten_es6(arr));
