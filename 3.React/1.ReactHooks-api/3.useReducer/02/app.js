const combineReducer = reducers => {
    const reucerKeys = Object.keys(reducers);
    let objInitState = {};
    reucerKeys.forEach(key => {
        const initState = reducers[key](undefined, { type: '' });
        if (initState === undefined) {
            throw new Error(`${key} does not return state`);
        }
        objInitState[key] = initState;
    });
    return (state, action) => {
        if (action) {
            reucerKeys.forEach(key => {
                const previousState = objInitState[key];
                objInitState[key] = reducers[key](previousState, action);
            });
        }
        return { ...objInitState };
    };
};
const stateA = 0;
function reducerA(state = stateA, action) {
    switch (action.type) {
        case 'incrementA':
            return state + action.payload;
        case 'decrementA':
            return state - action.payload;
        default:
            return state;
    }
}
const stateB = 0;
function reducerB(state = stateB, action) {
    switch (action.type) {
        case 'incrementB':
            return state + action.payload;
        case 'decrementB':
            return state - action.payload;
        default:
            return state;
    }
}
const reducers = combineReducer({ reducerA, reducerB });
function App() {
    const [counter, dispatch] = React.useReducer(reducers, reducers());
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <div
                style={{
                    width: '40px',
                    margin: '100px auto',
                    fontSize: '40px',
                }}
            >
                {counter.reducerA}
            </div>
            <antd.Button
                onClick={() => dispatch({ type: 'incrementA', payload: 10 })}
            >
                递增A
            </antd.Button>
            <antd.Button
                onClick={() => dispatch({ type: 'decrementA', payload: 10 })}
            >
                递减A
            </antd.Button>
            <div
                style={{
                    width: '40px',
                    margin: '100px auto',
                    fontSize: '40px',
                }}
            >
                {counter.reducerB}
            </div>
            <antd.Button
                onClick={() => dispatch({ type: 'incrementB', payload: 10 })}
            >
                递增B
            </antd.Button>
            <antd.Button
                onClick={() => dispatch({ type: 'decrementB', payload: 10 })}
            >
                递减B
            </antd.Button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
