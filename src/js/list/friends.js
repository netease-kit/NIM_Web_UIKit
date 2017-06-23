/**
 * ------------------------------------------------------------
 * FriendList      好友列表UI
 * ------------------------------------------------------------
 */

'use strict';
var util = require("../base/util.js");

var ACCOUNT;

/**
 * 好友列表控件
 * @param {Object} options 控件初始化参数
 * @property {String||Node}  parent 父节点
 * @property {String} clazz 样式名称
 * @property {Function} onclickitem 点击列表回调
 * @property {Function} onclickavatar 点击列表头像回调
 * @property {Object} data 消息数据 data.friends 好友数据 data.friends  data.userinfo 用户信息 data.account 当前用户账号
 */
var FriendList = function(options){
	var parent = options.parent,
		data = options.data,
		cbClickList = options.onclickitem||function(account,type){console.log('account:'+account+'---type:'+type);},
		cbClickPortrait = options.onclickavatar||function(account,type){console.log('account:'+account+'---type:'+type);};
	ACCOUNT = options.account;
	this.provider = options.infoprovider;
	this._body = document.createElement('ul');
	this._body.className = options.clazz||"m-panel" +" j-friend";	

	util.addEvent(this._body,'click',function(e){
		var self = this,
			evt = e||window.event,
			account,
			scene,
            target = evt.srcElement||evt.target;
        while(self!==target){
        	if (target.tagName.toLowerCase() === "img") {
                var item = target.parentNode.parentNode;
                account = item.getAttribute("data-account");
                scene = item.getAttribute("data-scene");
                cbClickPortrait(account,scene);
                return;
            }else if(target.tagName.toLowerCase() === "li"){
        	 	account = target.getAttribute("data-account");
                scene = target.getAttribute("data-scene");
                cbClickList(account,scene);
                return;
            }
            target = target.parentNode;
        }    
	});
	this.update(data);
	if(!!parent){
		this.inject(parent);
	}
};
/** --------------------------public------------------------------ */

/**
 * 插入控件
 * @param  {Node｜String} node 插入控件的节点
 * @return {Void}      
 */
FriendList.prototype.inject = function(node){
	var injectNode = util.getNode(node);
	injectNode.innerHTML = "";
	injectNode.appendChild(this._body);
};

/**
 * 更新视图
 * @param  {Object} data 
 * @return {Void}   
 */
FriendList.prototype.update = function(data){
	var html="",
		list = data.friends,
		info;
  html += '<div class="panel_team"><div class="panel_team-title">好友列表</div><ul>'
	for (var i = 0; i < list.length; i++) {
		info = this.provider(list[i],"friend");
		if (list[i].account !== ACCOUNT) {
      var account = list[i].account
      var personSubscribes = data.personSubscribes
      var multiPortStatus = ''
      // 开启了订阅配置
      if (window.CONFIG && window.CONFIG.openSubscription) {
        multiPortStatus = '[离线]'
        if (personSubscribes[account] && personSubscribes[account][1]) {
          multiPortStatus = (personSubscribes[account][1].multiPortStatus) || '离线'
          multiPortStatus = '[' + multiPortStatus + ']'
        }
      }
            html += ['<li class="panel_item '+(info.crtSession===info.target?'active':'')+'" data-scene="p2p" data-account="' + info.account + '">',
                        '<div class="panel_avatar"><img class="panel_image" src="'+info.avatar+'"/></div>',
                        '<div class="panel_text">',
                            '<p class="panel_single-row">'+info.nick + ' ' + multiPortStatus +'</p>',
                        '</div>',
                    '</li>'].join("");
		}	
	}
  html += '</ul></div>'
  var robots = data.robots
  if (robots && robots.length > 0) {
    html += '<div class="panel_team"><div class="panel_team-title">机器人</div><ul>'
    for (var i = 0; i < robots.length; i++) {
      var robot = robots[i]
      var info = this.provider(robot, 'robot')
      html += ['<li class="panel_item '+(info.crtSession===info.target?'active':'')+'" data-scene="p2p" data-account="' + info.account + '">',
                  '<div class="panel_avatar"><img class="panel_image" src="'+info.avatar+'"/></div>',
                  '<div class="panel_text">',
                    '<p class="panel_single-row">'+info.nick + ' [机器人]' +'</p>',
                  '</div>',
                '</li>'].join("");
    }
    html += '</ul></div>'
  }
	this._body.innerHTML = html;
};

/**
 * 控件销毁
 * @return {void} 
 */
FriendList.prototype.destory = function(){
	//预留
};




module.exports = FriendList;