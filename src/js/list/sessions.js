/**
 * ------------------------------------------------------------
 * SesstionList      会话面板UI
 * ------------------------------------------------------------
 */

'use strict';
var util = require("../base/util.js");

/**
 * 会话列表控件
 * @param {Object} options 控件初始化参数
 * @property {String||Node}  parent 父节点
 * @property {String} clazz 样式名称
 * @property {Function} onclickitem 点击列表回调
 * @property {Function} onclickavatar 点击列表头像回调
 * @property {Object} data 消息数据 data.sessions 消息数据 
 * @property {Function} infoprovider 由上层来提供显示内容
 */
var SessionList = function(options){
	var parent = options.parent,
		data = options.data,
		cbClickList = options.onclickitem||function(account,type){console.log('account:'+account+'---type:'+type);},
		cbClickPortrait = options.onclickavatar||function(account,type){console.log('account:'+account+'---type:'+type);};
	this._body = document.createElement('ul');
	this._body.className = options.clazz||"m-panel" +" j-session";	
    this.provider = options.infoprovider;
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
SessionList.prototype.inject = function(node){
    var injectNode = util.getNode(node);
	injectNode.innerHTML = "";
	injectNode.appendChild(this._body);
};

/**
 * 更新视图
 * @param  {Object} data 
 * @return {Void}   
 */
SessionList.prototype.update = function(data){
	var html = '',
        i,
        str,
        info,
		sessions = data.sessions;
	if (sessions.length === 0) {
		html += '<p class="empty">暂无最近联系人哦</p>';
	}else{
		for (i = 0;i<sessions.length;i++) {
			info = this.provider(sessions[i],"session");
            if(!info){
                continue;
            }
            var account = info.account
            var personSubscribes = data.personSubscribes
            var multiPortStatus = ''
            // 开启了订阅配置
            if (info.scene === 'p2p' && window.CONFIG && window.CONFIG.openSubscription) {
                multiPortStatus = '离线'
                if (personSubscribes[account] && personSubscribes[account][1]) {
                    multiPortStatus = (personSubscribes[account][1].multiPortStatus) || '离线'
                }
            }
            if (multiPortStatus !== '') {
                var infoText = '[' + multiPortStatus + '] ' + info.text
            } else {
                infoText = info.text
            }
            str = ['<li class="panel_item '+(info.crtSession===info.target?'active':'')+'" data-scene="' + info.scene + '" data-account="' + info.account + '">',
                            '<div class="panel_avatar"><img class="panel_image" src="'+info.avatar+'"/></div>',
                            '<div class="panel_text">',
                                '<p class="panel_multi-row">',
                                    '<span class="panel_nick">' +info.nick + '</span>',
                                    '<b class="panel_time">' + info.time + '</b>',
                                '</p>',
                                '<p class="panel_multi-row">',
                                    '<span class="panel_lastMsg">' + infoText + '</span>',
                                    info.unread ? '<b class="panel_count">' + info.unread + '</b>':'',
                                '</p>',
                            '</div>',
                        '</li>'].join("");
			html += str;
		}    
	}
	this._body.innerHTML = html;
};

/**
 * 控件销毁
 * @return {void} 
 */
SessionList.prototype.destory = function(){
	//预留
};


module.exports = SessionList;