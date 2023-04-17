function App() {
    const [target, setTarget] = React.useState(0);
    const [other, setOther] = React.useState(0);
    const sum = React.useMemo(() => {
        console.log('重新计算一次');
        let _sum = 0;
        for (let index = 0; index < target; index++) {
            _sum += index;
        }
        return _sum;
    }, [target]);
    const inputChange = React.useCallback(e => {
        console.log(e.target.value);
    }, []);
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <input type="text" onChange={inputChange} />
            <div
                style={{
                    width: '80px',
                    margin: '100px auto',
                    fontSize: '40px',
                }}
            >
                {target} {sum}
            </div>
            <antd.Button onClick={() => setTarget(target + 1)}>
                递增
            </antd.Button>
            <antd.Button onClick={() => setTarget(target - 1)}>
                递减
            </antd.Button>
            <div
                style={{
                    width: '80px',
                    margin: '100px auto',
                    fontSize: '40px',
                }}
            >
                干扰项 {other}
            </div>
            <antd.Button onClick={() => setOther(other + 1)}>递增</antd.Button>
            <antd.Button onClick={() => setOther(other - 1)}>递减</antd.Button>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
