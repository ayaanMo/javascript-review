function App() {
    const inputRef = React.useRef();
    const db = (fn, wait) => {
        let timer;
        return function () {
            if (timer) clearTimeout(timer);
            let args = [].slice.apply(arguments);
            const self = this;
            timer = setTimeout(() => {
                fn.apply(self, args);
            }, wait);
        };
    };
    const myFunction = e => {
        console.log(e, '父组件');
    };
    const debounce = db(myFunction, 1000);

    const onChange = e => {
        debounce(e);
    };

    return (
        <div>
            <div>{inputRef?.current?.value}</div>
            <ForwardInput ref={inputRef} onChange={onChange} />
            <antd.Input onChange={onChange} />
        </div>
    );
}

const ForwardInput = React.forwardRef((props, inputRef) => {
    const [value, setValue] = React.useState();
    const onChange = e => {
        setValue(e.target.value);
        props.onChange && props.onChange(e);
    };
    return (
        <div>
            <input ref={inputRef} value={value} onChange={onChange} />
        </div>
    );
});
ReactDOM.render(<App />, document.getElementById('root'));
