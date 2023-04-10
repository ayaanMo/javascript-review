function Counter(props) {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => {
            console.log('副作用回调');
            console.log(timer);
            clearInterval(timer);
            callback();
        };
    });
    React.useEffect(() => {
        console.log('无参数列表');
    });
    React.useEffect(() => {
        console.log('参数列表为空');
    }, []);
    React.useEffect(() => {
        console.log('有一个number参数');
    }, [props.number]);

    function callback() {
        console.log('我执行了');
    }
    console.log(1231);
    return (
        <div>
            <div>{count}</div>
            <div>{props.number}</div>
        </div>
    );
}
function App() {
    const [number, setNumber] = React.useState(0);
    const [isShow, setShow] = React.useState(true);
    return (
        <div>
            {isShow && <Counter number={number} />}
            <antd.Button
                onClick={() => {
                    setNumber(number + 1);
                }}
            >
                add
            </antd.Button>
            <antd.Button
                onClick={() => {
                    setNumber(number - 1);
                }}
            >
                sub
            </antd.Button>
            <antd.Button
                onClick={() => {
                    setShow(!isShow);
                }}
            >
                清除子组件
            </antd.Button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
