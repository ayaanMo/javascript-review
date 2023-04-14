function App() {
    // 所有数据
    const listDatas = [];
    for (let i = 0; i < 1000; i++) {
        listDatas.push({
            id: i,
            value: JSONSchemaFaker({
                type: 'string',
                minLength: 200,
                maxLength: 600,
            }),
        });
    }
    return (
        <div>
            <VirtualList list={listDatas} />
        </div>
    );
}
function VirtualList({ list }) {
    // 初始高度
    const defaultItemSize = 50;
    // 可视区域高度
    const screenHeight = 500;
    const scrollRef = React.useRef(null);
    const listArea = React.useRef(null);
    const [startIndex, setStartIndex] = React.useState(0);
    const endIndex = React.useMemo(() => {
        return startIndex + screenHeight / defaultItemSize;
    }, [startIndex]);
    // 用于记录所有item的初始的位置
    const [positions, setPositions] = React.useState(
        list.map((d, index) => ({
            index,
            height: defaultItemSize,
            top: index * defaultItemSize,
            bottom: (index + 1) * defaultItemSize,
        }))
    );
    // 列表总高度
    const [phantomHeight, setphantomHeight] = React.useState(
        positions.reduce((total, item) => total + item.height, 0)
    );
    console.log(positions);
    const [scrollOffset, setScrollOffset] = React.useState(0);
    React.useEffect(() => {
        if (positions?.length) {
            const totalHeight = positions.reduce(
                (total, item) => total + item.height,
                0
            );
            setphantomHeight(totalHeight);
        }
    }, [endIndex]);
    const handleScroll = () => {
        const scrollTop = scrollRef.current.scrollTop;
        let startIndex = positions.find(i => i && i.bottom > scrollTop).index;
        setStartIndex(startIndex);
        const startOffset =
            startIndex >= 1 ? positions[startIndex - 1].bottom : 0;
        setScrollOffset(startOffset);
    };
    const measure = (index, height) => {
        // 如果没有传入height，主动进行测量
        if (height === undefined) {
            height =
                listArea.current.querySelector(`[index="${index}"]`)
                    ?.clientHeight || defaultItemSize;
        }

        positions.forEach(item => {
            if (item.index === index) {
                let oldHeight = item.height;
                let dHeight = oldHeight - height;

                // 向下更新
                if (dHeight) {
                    item.height = height;
                    item.bottom = item.bottom - dHeight;

                    for (let k = index + 1; k < positions.length; k++) {
                        positions[k].top = positions[k - 1].bottom;
                        positions[k].bottom = positions[k].bottom - dHeight;
                    }
                }
            }
        });
        setPositions(positions);
    };
    const phantom = {
        position: 'absolute',
        width: '100%',
        height: `${phantomHeight}px`,
        'z-index': -1,
    };
    return (
        <>
            <div class="container" ref={scrollRef} onScroll={handleScroll}>
                <div
                    ref={listArea}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        transform: ` translate3d(0, ${scrollOffset}px, 0)`,
                        'z-index': 1,
                    }}
                >
                    {list.map((item, index) => {
                        return (
                            index >= startIndex &&
                            index <= endIndex && (
                                <Item
                                    item={item}
                                    index={item.id}
                                    measure={measure}
                                />
                            )
                        );
                    })}
                </div>
                <div class="phantom" style={phantom}></div>
            </div>
        </>
    );
}
const Item = ({ item, index, measure }) => {
    const element = React.useRef(null);
    React.useEffect(() => {
        measureItem(index);
    }, []);
    const measureItem = index => {
        const item = element.current;
        if (item?.clientHeight) {
            measure(index, item.clientHeight);
        }
    };
    return (
        <div class="list-item" key={index} ref={element}>
            <p>
                <span>{item.value}</span>
            </p>
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
