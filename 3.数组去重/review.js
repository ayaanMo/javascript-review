// 数组去重
/**
 *
 * @param {*} arr
 * @returns
 * 思路：
 * 利用filter函数  循环遍历数组根据每个元素第一次出现是否跟现在的下标一致，来去除重复元素
 */
function unique(arr) {
    let res = arr.filter((item, index, array) => {
        return array.indexOf(item) === index;
    });
    return res;
}
console.log(unique([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1]));
console.log([...new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 9, 8, 7, 6, 5, 4, 3, 2, 1])]);
