function App() {
    const input = React.useRef();
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <Input ref={input} />
            <antd.Button
                onClick={() => {
                    console.log(input);
                    input.current.onFocus();
                    input.current.value('sadasdasd');
                }}
            >
                点一下
            </antd.Button>
        </div>
    );
}
const Input = React.forwardRef((props, ref) => {
    const inputRef = React.useRef();
    React.useImperativeHandle(
        ref,
        () => {
            const handle = {
                onFocus() {
                    inputRef.current.focus();
                },
                value(value) {
                    inputRef.current.value = value;
                },
            };
            return handle;
        },
        []
    );
    return <input type="text" placeholder="请输入内容" ref={inputRef} />;
});
ReactDOM.render(<App />, document.getElementById('root'));
