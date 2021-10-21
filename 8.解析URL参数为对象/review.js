const url = 'https://mp.weixin.qq.com/s/sDZudDS2jn8PZrSAtkicTg?a=c$b=333';
/**
 * 正则说明
 * .默认匹配除换行符之外的任何单个字符
 * +匹配前面一个表达式 1 次或者多次
 */
const paramsStr = /.+\?(.+)$/.exec(url);
console.log(paramsStr);
