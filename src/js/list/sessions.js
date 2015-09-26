/**
 * ------------------------------------------------------------
 * SesstionList      会话面板UI
 * ------------------------------------------------------------
 */

'use strict';
var util = require("../base/util.js");
var ACCOUNT;

/**
 * 判断会话的对象
 * @param  {Object} msg 消息
 * @return {String} 会话的对象
 */
function switchConversationUser(msg){
	return msg.to === ACCOUNT ? msg.from : msg.to;
}
/**
 * 会话列表控件
 * @param {Object} options 控件初始化参数
 * @property {String||Node}  parent 父节点
 * @property {String} clazz 样式名称
 * @property {Function} onclickitem 点击列表回调
 * @property {Function} onclickavatar 点击列表头像回调
 * @property {Object} data 消息数据 data.msgs 消息数据 data.unreadmsgs 未读数据 data.unreadmsgs['iostest']={count:99} data.userinfo 用户信息 data.teamInfo 群信息
 */
var SessionList = function(options){
	var parent = options.parent,
		data = options.data,
		cbClickList = options.onclickitem||function(account,type){console.log('account:'+account+'---type:'+type);},
		cbClickPortrait = options.onclickavatar||function(account,type){console.log('account:'+account+'---type:'+type);};
	ACCOUNT = data.account;
	this._body = document.createElement('ul');
	this._body.className = options.clazz||"m-panel" +" j-session";	

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
                util.removeClass(util.getNode(".j-session li.active"),'active');
                util.addClass(target,"active");
                var countNode = target.querySelector('.count');
                util.addClass(countNode,"hide");
                countNode.innerHTML = 0;
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
		msgs = data.msgs,
		unreadMsg = data.unreadmsgs,
		info = data.userinfo,
		team = data.teamInfo,
		msg,nick,type,avatar,time,who,
		count,isShow;
	if (msgs.length === 0) {
		html += '<p class="empty">暂无最近联系人哦</p>';
	}else{
		for (var i = 0;i<msgs.length;i++) {
			msg = msgs[i];
			who = switchConversationUser(msg);
            time = msg.time;
            isShow = false;
            count = 0;
			if (unreadMsg.hasOwnProperty(who)) {
				count = unreadMsg[who].count > 99 ? '99+' : unreadMsg[who].count;
			}
            isShow = count === '99+' || count > 0;
			if (msg.scene === 'team') {
				nick = team[who].name||who;
				type = team[who].type||'normal';
				avatar = "images/"+type+".png";
			} else {
				nick = info[who].nick;
				avatar = util.getAvatar(info[who].avatar);
			}
            var str = ['<li data-gtype="' + type + '" data-type="' + msg.scene + '" data-account="' + who + '">',
                            '<img src="'+avatar+'"/>',
                            '<div class="text">',
                                '<p>',
                                '<span>' + nick + '</span>',
                                    '<b class="time">' + util.transTime2(msg.time) + '</b>',
                                '</p>',
                                '<p>',
                                    '<span class="first-msg">' + buildSessionMsg(msg,info,ACCOUNT) + '</span>',
                                    '<b class="count ' + (isShow ? '' : 'hide') + '">' + count + '</b>',
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

/**
* 构造第一条消息，显示在最近联系人昵称的下面
* @param msg：消息对象
*/
var buildSessionMsg = function(msg,info,account) {
    var text = (msg.scene!=='p2p'?msg.fromNick+":":""), type = msg.type;
    if (!/text|image|file|audio|video|geo|custom|notification/i.test(type)){
        return '';
    }
    switch (type) {
        case 'text':
            text += util.safeHtml(msg.text);
            text = util.buildEmoji(text);
            break;
        case 'image':
            text += '[图片]';
            break;
        case 'file':
            if (!/exe|bat/i.test(msg.file.ext)) {
                text += '[文件]';
            } else {
                text += '[非法文件，已被本站拦截]';
            }
            break;
        case 'audio':
            text += '[语音]';
            break;
        case 'video':
            text += '[视频]';
            break;
        case 'geo':
            text += '[位置]';
            break;
        case 'custom':
            var content = JSON.parse(msg.content);
            if(content.type===1){
                text += '[猜拳]';
            }else if(content.type===2){
                text +='[阅后即焚]';
            }else if(content.type===3){
                text +='[贴图]';
            }else if(content.type===4){
                text +='[白板]';
            }else{
                text += '[自定义消息]';
            }
            break;
        case 'notification':
            text = '['+util.transNotification(msg,info,account)+']';
            break;
        default:
            text += '[未知消息类型]';
            break;
    }
    return text;
};




module.exports = SessionList;