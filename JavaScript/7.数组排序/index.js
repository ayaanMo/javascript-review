// 27，38，13，49，65，97，76，49
// 冒泡排序
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 这里要根据外层for循环的 i ，逐渐减少内层 for 循环的次数
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let num = arr[j];
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
// 选择排序
let selectSort = function (arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    //趟数
    let min = arr[i];
    let curIndex = i; //  保存要交换位置的索引值
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        curIndex = j;
      }
    }
    [arr[curIndex], arr[i]] = [arr[i], arr[curIndex]]; //交换
  }
  return arr;
};
console.log(selectSort([50, 1, 27, 38, 13, 49, 65, 97, 76, 49]));
let test = [4, 5, 6, 7, 8];
[test[0], test[1]] = [test[1], test[0]];
console.log(test);
// 插入排序
function insertSort(originalArray) {
  const array = [...originalArray];
  let len = array.length;
  for (let i = 0; i < len; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
  return array;
}
