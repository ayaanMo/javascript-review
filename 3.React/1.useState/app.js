function App() {
    const [height, setHeight] = React.useState(10);
    const [width, setWidth] = React.useState(10);
    const [color, setColor] = React.useState({ r: 0, g: 0, b: 0 });
    const [radius, setRadius] = React.useState(0);
    const style = {
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        borderRadius: `${radius}px`,
    };
    return (
        <div>
            <span>height:</span>
            <antd.Slider
                max={300}
                min={10}
                onChange={v => {
                    setHeight(v);
                }}
            />
            <span>width:</span>
            <antd.Slider
                max={300}
                min={10}
                onChange={v => {
                    setWidth(v);
                }}
            />
            <span>R:</span>
            <antd.Slider
                max={255}
                min={0}
                onChange={v => {
                    setColor({ ...color, r: v });
                }}
            />
            <span>G:</span>
            <antd.Slider
                max={255}
                min={0}
                onChange={v => {
                    setColor({ ...color, g: v });
                }}
            />
            <span>B:</span>
            <antd.Slider
                max={255}
                min={0}
                onChange={v => {
                    setColor({ ...color, b: v });
                }}
            />
            <span>radius:</span>
            <antd.Slider
                max={150}
                min={0}
                onChange={v => {
                    setRadius(v);
                }}
            />
            <div style={style}></div>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
