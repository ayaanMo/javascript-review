{
    const element = <h1 title="foo">Hello</h1>;
    const container = document.getElementById('root');
    ReactDOM.render(element, container);
}
{
    const element = React.createElement('h1', { title: 'foo' }, 'Hello');
    const container = document.getElementById('root');
    ReactDOM.render(element, container);
}
{
    const element = {
        type: 'h1',
        props: {
            title: 'foo',
            children: 'Hello',
        },
    };
    const container = document.getElementById('root');
    ReactDOM.render(element, container);
}
{
    const element = {
        type: 'h1',
        props: {
            title: 'foo',
            children: 'Hello',
        },
    };
    const node = document.createElement(element.type);
    node['title'] = element.props.title;
    const text = document.createTextNode('');
    text['nodeValue'] = element.props.children;
    node.appendChild(text);
    const container = document.getElementById('root');
    container.appendChild(node);
}
{
    const element = (
        <div id="foo">
            <a>bar</a>
            <b />
        </div>
    );
    const container = document.getElementById('root');
    ReactDOM.render(element, container);
}
