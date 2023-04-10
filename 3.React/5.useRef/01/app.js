function App() {
    const inputRef = React.useRef();
    const inputRef1 = React.useRef();
    return (
        <div>
            <antd.Button
                type="primary"
                onClick={() => {
                    console.log(inputRef.current);
                    console.log(inputRef1);
                }}
            >
                点击
            </antd.Button>
            <antd.Input ref={inputRef}></antd.Input>
            <input type="text" ref={inputRef1} />
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
