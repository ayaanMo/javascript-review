const ThemeContext = React.createContext();
function App() {
    return (
        <div>
            <ThemeContext.Provider value="背景色">
                <Home />
                <Page />
            </ThemeContext.Provider>
        </div>
    );
}
function Home() {
    const theme = React.useContext(ThemeContext);
    console.log(theme);
    return <div>你好{theme}</div>;
}
function Page() {
    return (
        <div>
            <ThemeContext.Consumer>
                {context => {
                    return <div>他好{context}</div>;
                }}
            </ThemeContext.Consumer>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
