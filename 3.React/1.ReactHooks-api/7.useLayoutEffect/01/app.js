function App() {
    console.log('App');
    const [counter, setCounter] = React.useState(0);
    React.useEffect(() => {
        console.log('useEffect');
    });
    React.useLayoutEffect(() => {
        console.log('useLayoutEffect');
    });
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <div>{counter}</div>
            <antd.Button
                type="primary"
                onClick={() => {
                    setCounter(counter + 1);
                }}
            >
                增加
            </antd.Button>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
