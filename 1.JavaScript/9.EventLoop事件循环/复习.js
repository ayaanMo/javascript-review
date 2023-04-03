{
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
    }, 400);
    new Promise(function (resolve) {
        console.log(5);
        resolve(6);
    }).then(function (num) {
        console.log(num);
    });

    setTimeout(function () {
        console.log(7);
    }, 300);
    setTimeout(function () {
        console.log(11);
    }, 400);
}
