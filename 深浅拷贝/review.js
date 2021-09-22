// 简单拷贝
function shallowCopy(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
let obj = { a: 1, b: 2 };
let newObj = shallowCopy(obj);
newObj.c = 3;
console.log(obj);
console.log(newObj);
let func = function () {
  console.log(123);
};
let newFunc = shallowCopy(func);
console.log(newFunc);
