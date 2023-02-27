{
    /* 
    概念
        1.同步任务会排好队，在主线程上按照顺序执行，执行完前面执行后面的，排队的地方就叫做执行栈；
        2.异步任务JavaScript不会停下来而是将其挂起，继续执行执行栈中的同步任务，当异步任务有返回结果，异步任务会加入跟同步任务不同的的队列，叫做任务队列；
        通常任务队列存放异步任务的结果一般都是回调函数；
        3.当执行栈中的任务都被主线程都执行完以后，主线程便会去任务队列中查看是否存在任务，假如存在任务，则按照先进入任务队列的任务加入到执行栈中，以此循环这就是EventLoop；
    执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
        检查是否存在微任务，有则会执行至微任务队列为空；
        如果宿主为浏览器，可能会渲染页面；
        开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）
    Event Loop的执行顺序
        1.取出一个宏任务；
        2.执行栈执行进行执行；
        3.执行栈清空之后，微任务执行；
        4.微任务清空后；
        5.可能会渲染页面；
        6执行下一条宏任务；
        1.顺序执行js代码块；
        2.发现宏任务(setTimeout和setInterval，放入事件队列)，如果执行过程中遇到微任务就将微任务都放到微任务队列
        3.js顺序执行完毕之后，发现微任务队列有微任务，就一次性把微任务都执行完；
        4.会执行页面渲染
        5.再找一个下一个宏任务进行执行

        
    */
    console.log(1);
    setTimeout(function () {
        console.log(2);
        new Promise(function (resolve) {
            console.log(3);
            resolve(4);
        }).then(function (num) {
            console.log(num);
        });
        new Promise(function (resolve) {
            console.log(9);
            resolve(10);
        }).then(function (num) {
            console.log(num);
        });
    }, 300);
    new Promise(function (resolve) {
        console.log(5);
        resolve(6);
    }).then(function (num) {
        console.log(num);
    });

    setTimeout(function () {
        console.log(7);
    }, 400);
    setTimeout(function () {
        console.log(11);
    }, 400);
}
/* 
    分析步骤
        1.先打出数字1；
        2.执行到第一个setTimeout这个是将被挂起 第一个宏任务；
        3.执行到promise函数 先打印出5然后将回调函数挂起 第一个微任务；
        4.执行第二个setTimeout被挂起；
        5.第一个循环完打印出来的是1,5；
        6.进入第二个循环；（1,5）
        7.第一轮宏任务执行完成，发现微任务里面有一个（第一个promise函数的回调函数），则这个时候打印出来数字6
        8.执行栈中又没有任务了，又去任务队列里面寻找先找宏任务，则这个时候执行第一个setTimeout 则打印数字2，发现第二个promise函数打印数字3，将第二个promise函数的回调放入微任务中
        9.去微任务中找任务，发现第二个promise函数则打印出来数字4
        10.进入第三个循环（1,5，6,2,3,4）
        11.执行第二个setTimeout函数打印出来7
        12.执行所有任务（1,5,6,2,3,4,7）
*/
// 1,5,6,2,3,4,7
// 1 5 6 2 3 9 4 10 7 11
