## 1. Build your own React 

参考文献： https://qcsite.gatsbyjs.io/build-your-own-react/

        https://pomb.us/build-your-own-react/
    

https://juejin.cn/post/6884968140892176397#heading-3
https://qcsite.gatsbyjs.io/build-your-own-react/
https://react.iamkasong.com/preparation/newConstructure.html#react16%E6%9E%B6%E6%9E%84
https://react.jokcy.me/
http://www.cnblogs.com/axl234/p/16063280.html

1. render 定义第一个单元任务和根节点 以及初始化需删除节点(deletions:[])
2. 通过requestIdleCallback，进行分片运行 执行workLoop(进行执行一个任务)
3. performUnitOfWork执行一个工作单元并返回下一个可执行的工作单元
4. updateHostComponents,入参是一个工作单元(fiber)
5. createDom(fiber)
6. updateDom
7. reconcileChildren(fiber,children) 
