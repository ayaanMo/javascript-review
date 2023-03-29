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
{
    function* gen() {
        yield setTimeout(() => {
            return 1;
        }, 1000);
        yield* gen1();
        console.log(3);
    }
    function* gen1() {
        yield new Promise(resolve => {
            resolve(2);
        });
    }
    let g = gen();
    console.log(g.next().value);
    console.log(
        g.next().value.then(value => {
            console.log(value, 'promise');
        })
    );
    console.log(g.next().value);
}
{
    function* gen() {
        try {
            yield 1;
            yield 2;
            throw new Error('报错了');
        } catch (error) {
            console.log('Error caught!');
        }
    }
    let g = gen();
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
}
{
    function* gen() {
        try {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
        } catch (error) {
            console.log('Error caught!');
        }
    }
    let g = gen();
    console.log(g.next());
    console.log(g.next());
    console.log(g.throw(new Error('报错了')));
    console.log(g.next());
}
{
    function* gen() {
        // while (true) {
        try {
            yield 42;
            yield 42;
        } catch (e) {
            console.log('Error caught!');
        }
        // }
    }

    var g = gen();
    console.log(g.next()); // { value: 42, done: false }
    console.log(g.throw(new Error('Something went wrong'))); // "Error caught!"  { value: 42, done: false }
    console.log(g.next()); // { value: 42, done: false }
}
