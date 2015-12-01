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
| infoprovider | Function | 必填，返回一个对象，由上层来控制显示规则，呈现数据|

#### data
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| sessions | Array| SDK 返回的sessions数据|

#### infoprovider return {Object｝
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| scene | String| p2p or team|
| target | String|scene+“-”account，例"p2p-test"|
| crtSession | String|scene+“-”account，例"p2p-test"|
| account| String| 账号|
| avatar | String| 头像地址|
| nick | String| 昵称|
| time | String| 消息时间|
| text | String| 消息内容|
| unread | String| 未读数|




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
| infoprovider | Function | 必填，由上层来控制显示规则，呈现数据|

#### data
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| teams | Array| 群组列表|

#### infoprovider return {Object｝
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| target | String|scene+“-”account，例"p2p-test"|
| crtSession | String|scene+“-”account，例"p2p-test"|
| account| String| 账号|
| avatar | String| 头像地址|
| nick | String| 群，讨论组名|

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
| account|String | 当前用户账号|

#### infoprovider return {Object｝
| 参数 | 类型 | 说明 | 
| --- | --- | --- |
| target | String|scene+“-”account，例"p2p-test"|
| crtSession | String|scene+“-”account，例"p2p-test"|
| account| String| 账号|
| avatar | String| 头像地址|
| nick | String| 昵称|

###inject(String|Node)
将组件插入浏览器节点


