/**
 * ------------------------------------------------------------
 * TeamList      群组列表UI
 * ------------------------------------------------------------
 */

'use strict';
var util = require("../base/util.js");

/**
 * 群组列表控件
 * @param {Object} options 控件初始化参数
 * @property {String||Node}  parent 父节点
 * @property {String} clazz 样式名称
 * @property {Function} onclickitem 点击列表回调
 * @property {Function} onclickavatar 点击列表头像回调
 * @property {Object} data 消息数据 data.teams 群组数据
 */
var TeamList = function(options){
	var that = this,
        parent = options.parent,
		data = options.data,
		cbClickList = options.onclickitem||function(account,type){console.log('account:'+account+'---type:'+type);},
		cbClickPortrait = options.onclickavatar||function(account,type){console.log('account:'+account+'---type:'+type);};

	this._body = document.createElement('ul');
	this._body.className = (options.clazz||"m-panel") +" j-team";	
    this.provider = options.infoprovider;
	util.addEvent(this._body,'click',function(e){
		var self = this,
			evt = e||window.event,
			account,
			type,
            target = evt.srcElement||evt.target;
        while(self!==target){
        	if (target.tagName.toLowerCase() === "img") {
                var item = target.parentNode.parentNode;
                account = item.getAttribute("data-account");
                type = item.getAttribute("data-type");
                cbClickPortrait(account,type);
                return;
            }else if(target.tagName.toLowerCase() === "li"){
        	 	account = target.getAttribute("data-account");
                type = target.getAttribute("data-type");
                util.removeClass(util.getNode(".j-team li.active",that._body),'active');
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
TeamList.prototype.inject = function(node){
	var injectNode = util.getNode(node);
    injectNode.innerHTML = "";
    injectNode.appendChild(this._body);
};

/**
 * 更新视图
 * @param  {Object} data 
 * @return {Void}   
 */
TeamList.prototype.update = function(data){
	var tmp1 = '<div class="panel_team"><div class="panel_team-title">讨论组</div><ul class="j-normalTeam">',
        tmp2 = '<div class=" panel_team"><div class="panel_team-title">高级群</div><ul class="j-advanceTeam">',
        flag1 = false,
        flag2 = false,
        html = '',
        info,
        teams = data.teams;
        if (teams && teams.length > 0) {
            for (var i = 0, l = teams.length; i < l; ++i) {
                info = this.provider(teams[i],"team");
                if (info.type === 'normal') {
                    flag1 = true;
                    tmp1 += ['<li class="panel_item '+(info.crtSession===info.target?'active':'')+'" data-gtype="normal" data-type="team" data-account="' + info.teamId + '">',
                                '<div class="panel_avatar"><img class="panel_image" src="'+info.avatar+'"/></div>',
                                '<div class="panel_text">',
                                    '<p class="panel_single-row">'+info.nick+'</p>',
                                '</div>',
                            '</li>'].join("");
                } else if (info.type === 'advanced') {
                    flag2 = true;
                    tmp2 += ['<li class="panel_item '+(info.crtSession===info.target?'active':'')+'" data-gtype="advanced" data-type="team" data-account="' + info.teamId + '">',
                                '<div class="panel_avatar"><img class="panel_image" src="'+info.avatar+'"/></div>',
                                '<div class="panel_text">',
                                    '<p class="panel_single-row">'+info.nick+'</p>',
                                '</div>',
                            '</li>'].join("");
                }
            }
            tmp1 += '</ul></div>';
            tmp2 += '</ul></div>';
            if (flag1 && flag2) {
                html = tmp2 + tmp1;
            } else if (flag1 && !flag2) {
                html = tmp1;
            } else if (!flag1 && flag2) {
                html = tmp2;
            } else {
                html = '<p>暂时还没有群哦</p>';
            }
        } else {
            html = '<p>暂时还没有群哦</p>';
        }
	this._body.innerHTML = html;
};

/**
 * 控件销毁
 * @return {void} 
 */
TeamList.prototype.destory = function(){
	//预留
};




module.exports = TeamList;