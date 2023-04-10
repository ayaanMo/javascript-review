function App() {
    const initialState = 0;
    const reducer = (state, action) => {
        switch (action) {
            case 'increment':
                return state + 1;
            case 'decrement':
                return state - 1;
            case 'rest':
                return 0;
            default:
                return state;
        }
    };
    const [counter, dispatch] = React.useReducer(reducer, initialState);
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <div
                style={{
                    width: '40px',
                    margin: '100px auto',
                    fontSize: '40px',
                }}
            >
                {counter}
                <antd.Button
                    type="primary"
                    onClick={() => {
                        dispatch('increment');
                    }}
                >
                    加法
                </antd.Button>
                <antd.Button
                    type="primary"
                    onClick={() => {
                        dispatch('decrement');
                    }}
                >
                    减法
                </antd.Button>
                <antd.Button
                    type="primary"
                    onClick={() => {
                        dispatch('rest');
                    }}
                >
                    重置
                </antd.Button>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
