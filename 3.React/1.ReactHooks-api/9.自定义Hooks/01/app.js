function App() {
    const size = useSize();
    const [clientSize, setClientSize] = React.useState({
        clientHeight: 0,
        clientWidth: 0,
    });
    React.useEffect(() => {
        setClientSize({
            clientHeight: size.clientHeight,
            clientWidth: size.clientWidth,
        });
    }, [size]);
    return (
        <div style={{ width: '200px', margin: 'auto' }}>
            <div
                style={{
                    height: `${clientSize.clientHeight / 2}px`,
                    width: `${clientSize.clientWidth / 2}px`,
                    border: '1px solid',
                    backgroundColor: 'red',
                }}
            ></div>
        </div>
    );
}
const useSize = () => {
    const [clientSize, setClientSize] = React.useState({
        clientHeight: 0,
        clientWidth: 0,
    });
    React.useEffect(() => {
        const sizeChange = e => {
            setClientSize({
                clientHeight: window.innerHeight,
                clientWidth: window.innerWidth,
            });
        };
        window.addEventListener('resize', sizeChange);
        return () => {
            console.log(1231231);
            window.removeEventListener('resize', sizeChange);
        };
    });
    return clientSize;
};
ReactDOM.render(<App />, document.getElementById('root'));
