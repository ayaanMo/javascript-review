function App() {
    const inputRef = React.useRef();
    const inputRef1 = React.useRef();
    console.log(inputRef1);
    return (
        <div>
            <Input ref={inputRef} />
            <ForwardInput ref={inputRef1} />
        </div>
    );
}
function Input(props) {
    return (
        <div>
            <input />
        </div>
    );
}
const ForwardInput = React.forwardRef((props, ref) => {
    return (
        <div>
            <input ref={ref} />
        </div>
    );
});
ReactDOM.render(<App />, document.getElementById('root'));
