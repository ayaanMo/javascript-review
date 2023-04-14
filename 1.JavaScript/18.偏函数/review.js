{
    function add(x) {
        return function (y) {
            return x + y;
        };
    }
    let af = add(5);
    console.log(af(3));
    console.log(af(4));
}
