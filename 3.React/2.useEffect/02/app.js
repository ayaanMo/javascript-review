function App() {
    const [anime1, setAnime1] = React.useState(false);
    const [anime2, setAnime2] = React.useState(false);
    const element = React.useRef();
    React.useEffect(() => {
        console.log(2);
        anime1 && !anime2 && animate01();
        !anime1 && anime2 && animate02();
    }, [anime1, anime2]);
    function animate01() {
        console.log(3);
        if (element) {
            anime({
                targets: element.current,
                translateX: 400,
                backgroundColor: '#FF8F42',
                borderRadius: ['0%', '50%'],
                easing: 'easeInOutQuad',
                complete: () => {
                    console.log(5);
                    setAnime1(false);
                },
            });
        }
    }
    function animate02() {
        console.log(4);
        if (element) {
            anime({
                targets: element.current,
                translateX: 0,
                backgroundColor: '#FFF',
                borderRadius: ['50%', '0%'],
                easing: 'easeInOutQuad',
                complete: () => {
                    console.log(6);
                    setAnime2(false);
                },
            });
        }
    }
    function clickHandler() {
        setAnime1(true);
        console.log(1);
        setTimeout(setAnime2.bind(null, true), 1000);
    }
    return (
        <div
            style={{
                backgroundColor: 'red',
                height: '100vh',
                width: '100%',
                position: 'relative',
            }}
            onClick={() => {
                clickHandler();
            }}
        >
            <div
                ref={element}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#fff',
                    position: 'absolute',
                    top: '50%',
                    left: '40%',
                }}
            ></div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
