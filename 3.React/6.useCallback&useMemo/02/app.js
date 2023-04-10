function App() {
    const [count1, setCount1] = React.useState(0);
    const [count2, setCount2] = React.useState(0);
    const [count3, setCount3] = React.useState(0);
    const handleClick1 = () => {
        setCount1(count1 + 1);
    };
    const handleClick2 = React.useCallback(() => {
        console.log(12312);
        setCount2(count2 + 1);
    }, [count2]);
    return (
        <div>
            <div>
                <div>{count1}</div>
                <Button onClick={handleClick1}>第一</Button>
            </div>
            <div>
                <div>{count2}</div>
                <Button onClick={handleClick2}>第二</Button>
            </div>
            <div>
                <div>{count3}</div>
                <Button
                    onClick={() => {
                        setCount3(count3 + 1);
                    }}
                >
                    第三
                </Button>
            </div>
        </div>
    );
}

const Button = React.memo(({ onClick, children }) => {
    console.log(children);
    return (
        <div>
            <antd.Button onClick={onClick}>{children}</antd.Button>
            <span>{Math.random()}</span>
        </div>
    );
});
ReactDOM.render(<App />, document.getElementById('root'));
