## 虚拟列表思路整理

### 内部元素固定高度方案

1. 每个子元素高度
2. 可视区域高度
3. 根据可视区域高度确定start和end位置
4. 根据start可以计算出偏移高度
5. 根据数据总内容计算出list总高度
整体思路 计算出以上常量 监听元素上的滚动事件，计算出滚动区域对应的元素以及需要偏移的高度内容 利用transform:translate3D(x, y, z)来将可视区域整体的元素偏移
https://mp.weixin.qq.com/s?__biz=Mzg2NjY2NTcyNg==&mid=2247488262&idx=1&sn=6bb5c9e5d203c142c313a70a3e599152&chksm=ce460697f9318f815e17b96569116f9d8f2574c1de7e2f732ccee1cc83cbb51bd9edb16dbf8f&scene=178&cur_album_id=2003210846117642242#rd
