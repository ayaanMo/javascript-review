{
    function* Generator() {
        yield 'hello';
        console.log(123123);
        yield 'generator';
        yield 'hhhh';
    }
    Generator();
    const gen = Generator();
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
    console.log(gen.next());
}
{
    function* f() {
        for (var i = 0; true; i++) {
            var reset = yield i;
            if (reset) {
                i = -1;
            }
        }
    }

    var g = f();

    console.log(g.next()); // { value: 0, done: false }
    console.log(g.next()); // { value: 1, done: false }
    console.log(g.next(true)); // { value: 0, done: false }
}
{
    function* inside() {
        yield 'a';
        yield 'b';
        yield 'c';
    }
    function* output() {
        yield 'd';
        yield* inside();
        yield 'e';
    }
    for (let i of output()) {
        console.log(i);
    }
}
