// 27，38，13，49，65，97，76，49
// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 这里要根据外层for循环的 i ，逐渐减少内层 for 循环的次数
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var num = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = num;
      }
    }
  }
  return arr;
}
console.log(bubbleSort([50, 1, 27, 38, 13, 49, 65, 97, 76, 49]));
// 快速排序
function quickSort(arr) {
  const rec = arr => {
    if (arr.length <= 1) {
      return arr;
    }
    const left = [];
    const right = [];
    const mid = arr[0]; // 基准元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return [...rec(left), mid, ...rec(right)];
  };
  return rec(arr);
}
console.log(quickSort([50, 1, 27, 38, 13, 49, 65, 97, 76, 49]));
