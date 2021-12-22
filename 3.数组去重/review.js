// 利用filter去重
function unique(arr) {
    var res = arr.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    });
    return res;
}
console.log(
    unique([1, 1, 2, 333, 4, 4, 4, 5, 3, 333, 3, 6, 7, 8, 66, 55, 66, 55])
);
// 利用reduce去重
function reUnique(arr) {
    let res = arr.reduce((total, item, index, arr) => {
        if (total.indexOf(item) < 0) {
            total.push(item);
        }
        return total;
    }, []);
    return res;
}
console.log(
    reUnique([1, 1, 2, 333, 4, 4, 4, 5, 3, 333, 3, 6, 7, 8, 66, 55, 66, 55]),
    'reUnique'
);
// 1.for循环
// 针对for循环，循环条件总比循环体要多执行一次
// 2.for in 循环
// 不建议使用该方法用在数组上面，for in是为了遍历对象属性而构建的
let forinArr = [1, 2, 3, 4, 5, 6];
forinArr.name = '测试';
for (let key in forinArr) {
    console.log(key, 'for in');
}
// 3. for of 循环
// 是ES6新增加的方法,就是为了解决for of循环数组产生的问题
let forofArr = [1, 2, 3, 4, 5, 6];
forofArr.name = '测试';
for (let [key, val] of forofArr.entries()) {
    console.log(key, val, 'for of');
}
// 4. forEach 循环
// forEach循环接受三个参数，(数组的每一项，数组的下标，数组本身) 第二个参数和第三个参数是可选的
// forEach循环本身不支持continue和break语句的
// 如果想实现continue效果，可以使用return
// 如果想实现break效果，建议使用every和some循环
let foreachArr = [1, 2, 3, 4, 5, 6];
foreachArr.forEach(item => {
    if (item > 3) {
        return;
    }
    console.log(item, 'forEach');
});
// 5. map循环
// 循环返回一个经过调用函数处理后的新数组
// map循环必须return
// map循环不会修改原数组
// map循环会针对每一项都进行循环，如果跳过则会返回undefined
let mapArr = [1, 2, 3, 4, 5, 6];
let newmaparr = mapArr.map(item => {
    if (item > 3) {
        return item + 1;
    }
});
console.log(newmaparr, 'map');
// 6.filter循环
// 返回一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素
let filterArr = [1, 2, 3, 4, 5, 6];
let newfilterarr = filterArr.filter(item => {
    if (item > 3) {
        return item + 1;
    }
});
console.log(newfilterarr, 'filter');
// 7.some循环
// some循环查找数组中任意符合条件的元素并返回boolean值，当数组中有任意元素符合条件就返回true否则返回false
// 如果有一个元素满足条件，则返回true，且剩余的元素不会在执行检测，循环直接结束
let someArr = [1, 2, 3, 4, 5, 6];
let someres = someArr.some(item => {
    console.log(item, 'some');
    return item > 3;
});
console.log(someres, 'some');
// 8.every循环
// every循环查找数组中的所有符合条件的元素并返回boolean值，只有当数组中的所有元素都符合条件才返回true否则返回false
// 如果有一个元素不满足条件，则返回false，且剩余元素不在检测，循环立即结束
let everyArr = [1, 2, 3, 4, 5, 6];
let everyres = everyArr.every(item => {
    console.log(item, 'every');
    return item > 3;
});
console.log(everyres, 'every');
// 9.reduce循环
// reduce()循环接收一个函数作为累加器，数组中的每个值(从左到右)开始缩减，最终计算为一个值
// reduce(function(每一项的累加和，为数组的每一项，为数组的下标，数组本身),初始值)
let reduce = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const reduceres = reduce.reduce((total, item, index, arr) => {
    return total + item;
}, 0);
console.log(reduceres, 'reduce');
