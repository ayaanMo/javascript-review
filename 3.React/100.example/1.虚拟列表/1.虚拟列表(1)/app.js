function App() {
    return (
        <div>
            <VirtualList name="VirtualList1" />
        </div>
    );
}
function VirtualList({ name }) {
    // 每项高度
    const itemSize = 50;
    // 总数据量
    const listNum = 1000;
    // 列表的总高度
    const listHeight = listNum * itemSize;
    // 可视区域展示多少条数据，向上舍入
    const displayItems = Math.ceil(500 / itemSize);
    // 所有列表的数据
    const [listData, setListData] = React.useState([]);
    // 真实展示的数据数
    const [displayDatas, setDisplayDatas] = React.useState([]);
    // 偏移高度
    const [startOffset, setStartOffset] = React.useState(0);
    // 起始下标
    let start = 0;
    // 结束下标
    let end = displayItems;
    const scrollRef = React.useRef();
    React.useEffect(() => {
        let datas = [];
        for (let i = 0; i < listNum; i++) {
            datas.push(i + 1);
        }
        setListData(datas);
        setDisplayDatas(datas.slice(start, Math.min(end)));
    }, []);
    const handleScroll = e => {
        const scrollTop = scrollRef?.current?.scrollTop;
        start = Math.floor(scrollTop / itemSize);
        end = displayItems + start;
        // 由于渲染区域相对于可视区域已经发生了偏移，此时我需要获取一个偏移量startOffset，通过样式控制将渲染区域偏移至可视区域中
        // setStartOffset(scrollTop - (scrollTop % itemSize));
        setStartOffset(start * itemSize);
        setDisplayDatas(listData.slice(start, Math.min(end)));
    };
    const phantom = {
        position: 'absolute',
        width: '100%',
        height: `${listHeight}px`,
        'z-index': -1,
    };
    return (
        <>
            <div class="container" ref={scrollRef} onScroll={handleScroll}>
                <div
                    class="list"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        transform: ` translate3d(0, ${startOffset}px, 0)`,
                        'z-index': 1,
                    }}
                >
                    {displayDatas.map(i => {
                        return <Item value={i} name={name} />;
                    })}
                </div>
                <div class="phantom" style={phantom}></div>
            </div>
        </>
    );
}
const Item = ({ value, name }) => {
    return (
        <div class="list-item" key={name + value}>
            {value}
        </div>
    );
};
ReactDOM.render(<App />, document.getElementById('root'));

/**
 * 参考
 * https://github.com/dwqs/blog/issues/70
 * https://juejin.cn/post/6844903982742110216#heading-4
 * https://segmentfault.com/a/1190000016734597
 * https://zhuanlan.zhihu.com/p/444778554
 */
