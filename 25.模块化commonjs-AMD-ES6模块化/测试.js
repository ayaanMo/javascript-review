let counter = require('./index');
let incCounter = require('./index');
console.log(require('uniq'));
console.log(uniq([1, 2, 2, 1, 2, 3, 4, 5, 6, 6, 5, 3, 8, 9])); //[ 1, 2, 3 ]
console.log(counter + 10);
console.log(incCounter(6));

{
    //定义没有依赖的模块
    define(function (require, exports, module) {
        exports.xxx = value;
        module.exports = value;
    });
    //定义有依赖的模块
    define(function (require, exports, module) {
        //引入依赖模块(同步)
        var module2 = require('./index');
        //引入依赖模块(异步)
        require.async('./module3', function (m3) {});
        //暴露模块
        exports.xxx = value;
    });
    define(function (require) {
        var m1 = require('./module1');
        var m4 = require('./module4');
        m1.show();
        m4.show();
    });
}
