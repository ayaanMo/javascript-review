* useState 解决函数组件没有state的问题
* useEffect: DOM渲染完成之后，副作用逻辑执行（可以理解成, 我想DOM渲染完成以后再做一件事情，可以是只做一次(第二个参数是空数组), 可以是很多次(监听一个值的变化, 这个地方只会做浅比较)）
    - 更复杂的描述在function组件中，每当DOM完成一次渲染，都会有对应的副作用执行，useEffect用于提供自定义的执行内容，它的第一个参数（作为函数传入）就是自定义的执行内容。为了避免反复执行，传入第二个参数（由监听值组成的数组）作为比较(浅比较)变化的依赖，比较之后值都保持不变时，副作用逻辑就不再执行
    - useEffect的使用三种场景：都是取决于useEffect的第二个参数，无参数的时候是每次DOM渲染之后都会执行一次；依赖项参数列表为空的时候，DOM渲染之后只执行一次；依赖项参数列表有值的时候，依赖值变化会变化一次；
* useReducer: const [value, dispatch]=useReducer(reducer, initialState), reducer是个函数有两个默认方法(state, action), initialState初始值；
    - dispatch(Action) ==> Action ==> Reducer ==> Store ==> Store更新之后响应到View层 ===> View
* useContext 顶层通过React.createContext()来创建一个context，通过Context. Provider来包裹子组件，然后子组件可以通过两种方式来获取context, 开发的时候最好是将Context封装成一个组件
    - 一种是通过Context.Consumer来获取
    - 另外一种是通过useContext，传入context来获取
* useRef 访问DOM节点，或者React元素；保持可变变量  直接通过props来传递ref是传递不了的，必须通过forwardRef来传递React.forwardRef(function(props, ref){})
* useMemo 缓存计算结果。接收两个参数，第一个参数计算过程(回调函数，必须返回一个结果)，第二个参数是一个依赖项(数组), 当依赖项中某一个发生变化，结果将会重新计算 
    - // allow undefined, but don't make it optional as that is very likely a mistake
    - function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T; 
* useCallback 缓存的是一个函数体，当依赖项中的一项发现变化，函数体会重新创建(会返回一个新的函数)
    - function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;  
* useLayoutEffect 
    - useEffect 执行顺序，组件更新挂在完成 --> 浏览器 dom绘制完成 --> 执行useEffect 回调
    - 组件更新挂载完成 --> 执行useLayoutEffect回调 -->浏览器dom绘制完成
* useImperativeHandle
    - 结合React.forwardRef使用，自定义暴露给父组件的实例值
    - useImperativeHandle 接受三个参数 ref，接收forwardRef传递过来的ref, createHandle 处理函数，返回值作为暴露给父组件的ref对象 ，deps依赖项，可以根据依赖项更改新的ref对象
    - useImperativeHandle(ref,handle,[...deps])
