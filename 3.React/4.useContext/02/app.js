const CounterContext = React.createContext();
function CounterProvider(props) {
    const [count, setCount] = React.useState(0);
    const value = {
        count,
        increment: () => setCount(count + 1),
        decrement: () => setCount(count - 1),
    };
    return (
        <CounterContext.Provider value={value}>
            {props.children}
        </CounterContext.Provider>
    );
}
function App() {
    return (
        <div>
            <CounterProvider>
                <Counter />
            </CounterProvider>
        </div>
    );
}
function Counter() {
    const context = React.useContext(CounterContext);
    console.log(context.increment);
    return (
        <div>
            <div style={{ width: '200px', margin: 'auto' }}>
                <div
                    style={{
                        width: '40px',
                        margin: '100px auto',
                        fontSize: '40px',
                    }}
                >
                    {context.count}
                </div>
                <antd.Button type="primary" onClick={() => context.increment()}>
                    递增
                </antd.Button>
                &nbsp;
                <antd.Button type="primary" onClick={() => context.decrement()}>
                    递减
                </antd.Button>
            </div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
