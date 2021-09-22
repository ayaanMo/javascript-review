// 数组去重
// ES5
function unique_es5(arr) {
  //filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
  var res = arr.filter(function (item, index, array) {
    console.log(array.indexOf(item));
    console.log(index);
    return array.indexOf(item) === index;
  });
  return res;
}
unique_es5([1, 2, 3, 4, 4, 5]);
// ES6
let unique_es6 = arr => [...new Set(arr)];
let mySet2 = new Set([1, 2, 3, 4, 4, 5]);
console.log([...mySet2]);
