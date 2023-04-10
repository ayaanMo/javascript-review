function App() {
    const [count, setCount] = React.useState(0);
    React.useEffect(() => {
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
    }, []);
    return (
        <div style={{ backgroundColor: 'red', height: '100vh', width: '100%' }}>
            <div
                style={{
                    height: '100px',
                    width: '100px',
                    border: '1px solid #000',
                    margin: '0 auto',
                    color: 'red',
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    lineHeight: '100px',
                }}
            >
                {count}
            </div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
