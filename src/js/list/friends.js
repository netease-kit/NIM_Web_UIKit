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
	ACCOUNT = data.account;
	this._body = document.createElement('ul');
	this._body.className = options.clazz||"m-panel" +" j-friend";	

	util.addEvent(this._body,'click',function(e){
		var self = this,
			evt = e||window.event,
			account,
			type,
            target = evt.srcElement||evt.target;
        while(self!==target){
        	if (target.tagName.toLowerCase() === "img") {
                var item = target.parentNode;
                account = item.getAttribute("data-account");
                type = item.getAttribute("data-type");
                cbClickPortrait(account,type);
                return;
            }else if(target.tagName.toLowerCase() === "li"){
        	 	account = target.getAttribute("data-account");
                type = target.getAttribute("data-type");
                util.removeClass(util.getNode(".j-friend li.active"),'active');
                util.addClass(target,"active");
                cbClickList(account,type);
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
		list = data.friends;
	for (var i = 0; i < list.length; i++) {
		if (list[i].account !== ACCOUNT) {
            html += ['<li data-type="p2p" data-account="' + list[i].account + '">',
                        '<img src="'+util.getAvatar(list[i].avatar)+'"/>',
                        '<div class="text">',
                            '<p class="nick">',
                                '<span>' + list[i].nick+'</span>',
                            '</p>',
                        '</div>',
                    '</li>'].join("");
		}	
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