function App() {
    const [isShowModal, setIsShowModal] = React.useState(false);
    const userId = React.useId();
    console.log(userId);
    const showModal = () => {
        setIsShowModal(true);
    };
    const handleOk = () => {
        setIsShowModal(false);
    };
    const handleCancel = () => {
        setIsShowModal(false);
    };
    return (
        <div>
            <div>
                <antd.Button onClick={showModal}>打开Modal</antd.Button>
            </div>
            <Modal
                open={isShowModal}
                title="Basic Modal"
                onOk={handleOk}
                onCancel={handleCancel}
                keyboard
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}
function Modal(props) {
    const {
        open = true,
        children,
        title,
        onOk = null,
        onCancel = null,
    } = props;
    const doc = document.body;
    const [isHidden, setIsHidden] = React.useState(!open);
    React.useEffect(() => {
        setIsHidden(!open);
    }, [open]);
    React.useEffect(() => {
        window.addEventListener('keydown', closeModal, false);
        return () => {
            window.removeEventListener('keydown', closeModal, false);
        };
    }, []);
    const closeModal = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === 27) {
            handleCancel();
        }
    };
    const handleOk = () => {
        onOk && onOk();
    };
    const handleCancel = () => {
        onCancel && onCancel();
    };
    return ReactDOM.createPortal(
        <div
            className="z-modal-wrap"
            style={{ display: isHidden ? 'none' : 'block' }}
        >
            <div className="z-modal-context">
                <div className="z-modal-header">
                    <div className="z-modal-title">{title}</div>
                </div>
                <div className="z-modal-body">{children}</div>
                <div className="z-modal-footer">
                    <button
                        type="button"
                        className="z-modal-cancel z-modal-btn"
                        onClick={handleCancel}
                    >
                        取消
                    </button>
                    <button
                        type="button"
                        className="z-modal-ok z-modal-btn"
                        onClick={handleOk}
                    >
                        确定
                    </button>
                </div>
            </div>
            <div className="z-modal-mask"></div>
        </div>,
        doc
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
/**
 * https://juejin.cn/post/6844904064392626183
 */
