# 列表组件


##new NIMUIKit.SessionList(options)
会话列表
###options
初始化实例参数

| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| parent | Node/String| 可选，定义组件插入的节点，也可在实例化后 调用inject方法
| clazz| String |可选，组件样式名，组件元素样式都基于该命名空间，默认样式为m-pannel|
| onclickitem | Function |可选，用来自定义点击列表项回调函数|
| onclickavatar | Function |可选，用来自定义点击列表项头像回调函数|
| data | Object | 必填，显示UI所需要的数据，具体内容见下文|

#### data
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| msgs | Array| 消息数据|
| unreadmsgs | Object |未读消息|
| userinfo | Object |用户信息|
| teaminfo | Object |群组信息|
| account|String | 当前用户账号|

###inject(String|Node)
将组件插入浏览器节点


----------


##new NIMUIKit.TeamList(options)
群组列表
###options
初始化实例参数

| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| parent | Node/String| 可选，定义组件插入的节点，也可在实例化后 调用inject方法
| clazz| String |可选，组件样式名，组件元素样式都基于该命名空间，默认样式为m-pannel|
| onclickitem | Function |可选，用来自定义点击列表项回调函数|
| onclickavatar | Function |可选，用来自定义点击列表项头像回调函数|
| data | Object | 必填，显示UI所需要的数据，具体内容见下文|

#### data
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| teams | Array| 群组列表|

###inject(String|Node)
将组件插入浏览器节点


----------


##new NIMUIKit.FriendList(options)
好友列表
###options
初始化实例参数

| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| parent | Node/String| 可选，定义组件插入的节点，也可在实例化后 调用inject方法
| clazz| String |可选，组件样式名，组件元素样式都基于该命名空间，默认样式为m-pannel|
| onclickitem | Function |可选，用来自定义点击列表项回调函数|
| onclickavatar | Function |可选，用来自定义点击列表项头像回调函数|
| data | Object | 必填，显示UI所需要的数据，具体内容见下文|

#### data
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| friends | Array| 好友列表|
| userinfo | Object |用户信息|
| account|String | 当前用户账号|

###inject(String|Node)
将组件插入浏览器节点


