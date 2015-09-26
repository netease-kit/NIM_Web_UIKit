/**
 * ------------------------------------------------------------
 * util     工具库
 * ------------------------------------------------------------
 */

'use strict';
var CONST  = require("./const.js"),
	emoji = CONST.emoji;

var util = {
	getNode: function(ipt){
		if(this.isString(ipt)){
			return document.querySelector(ipt);	
		}else if(this.isElement(ipt)){
			return ipt;
		}else{
			console.error("输入参数必须为node||String");
		}
	},
	getNodes: function(string){
		return document.querySelectorAll(string);
	},
	isString: function(data){
        return typeof(data)==='string';
    },
    isElement:function(obj){
    	return !!(obj && obj.nodeType === 1);
    },
    isArray:Array.isArray|| function(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
  	},

	addEvent: function(node,type,callback){
		if(window.addEventListener){
			node.addEventListener(type,callback,false);
		}else{
			node.attachEvent("on"+type,callback);
		}
	},

	hasClass: function(elem, cls){
	    cls = cls || '';
	    if(cls.replace(/\s/g, '').length === 0){
	    	return false;
	    }
	    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
	},

	addClass: function(elem, cls){
		if(!elem){
			return;
		}
	    if(!this.hasClass(elem, cls)){
	        elem.className += ' ' + cls;
	    }
	},
	removeClass: function(elem, cls){
		if(!elem){
			return;
		}
	    if(this.hasClass(elem, cls)){
	        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
	        while(newClass.indexOf(' ' + cls + ' ') >= 0){
	            newClass = newClass.replace(' ' + cls + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	},
	safeHtml: (function(){
	    var reg = /<br\/?>$/,
	        map = {
	            r:/<|>|\&|\r|\n|\s|\'|\"/g,
	            '<':'&lt;','>':'&gt;','&':'&amp;',' ':'&nbsp;',
	            '"':'&quot;',"'":'&#39;','\n':'<br/>','\r':''
	        };
	    return function(content){
	        content = _$encode(map,content);
	        return content.replace(reg,'<br/><br/>');
	    };
	})(),
	getAvatar:function(url){
		var re=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
		if(re.test(url)){
			return url;
		}else{
			return "images/default-icon.png";
		}
	},
	/**
	* 通过正则替换掉文本消息中的emoji表情
	* @param text：文本消息内容
	*/
	buildEmoji:function(text) {
		var re = /\[([^\]\[]*)\]/g;
		var matches = text.match(re) || [];
		for (var j = 0, len = matches.length; j < len; ++j) {
			if(emoji[matches[j]]){
				text = text.replace(matches[j], '<img class="emoji" src="images/emoji/' + emoji[matches[j]].file + '" />');
			}		
		}
		return text;
	},
	/**
	 * 群通知处理
	 * @param  {Object} item 
	 * @return {String}    
	 */
	transNotification:function(item,info,myAccount) {
	    var type = item.attach.type,
	        from = (item.from === myAccount?true:false),
	        str,
	        accounts,
	        member=[],
	        i;
	    switch (type) {
	        case 'addTeamMembers':
	            accounts = item.attach.accounts;
	            for(i = 0;i<accounts.length;i++){
	                if(accounts[i]===myAccount){
	                    member.push("你");
	                }else{
	                    member.push(info[accounts[i]].nick);
	                }
	                
	            }
	            member =  member.join(",");
	            str = from?"你将"+member+"加群":member+"加入群";
	            break;
	        case 'removeTeamMembers':
	            accounts = item.attach.accounts;
	            for(i = 0;i<accounts.length;i++){
	                if(accounts[i]===myAccount){
	                    member.push("你");
	                }else{
	                    member.push(info[accounts[i]].nick);                    
	                }
	            }
	            member =  member.join(",");
	            str = from?("你将"+member+"移除群"):(member+"被移除群");
	            break;
	        case 'leaveTeam':
	            member =  (item.from ===myAccount)?"你":item.fromNick;
	            str = member+"退出了群";
	            break;
	        case 'updateTeam':
	            var user =  (item.from ===myAccount)?"你":(item.fromNick||item.from);
	            str = user+"更新群名为"+ item.attach.team.name;
	            break;
	        default:
	            str = '群消息';
	            break;
	    }
	    return str;
	},
	/**
	 * 时间戳转化为日期（用于消息列表）
	 * @return {string} 转化后的日期
	 */
	transTime:(function(){
	    var getDayPoint = function(time){
	        time.setMinutes(0);
	        time.setSeconds(0);
	        time.setMilliseconds(0);
	        time.setHours(0);
	        var today = time.getTime();
	        time.setMonth(1);
	        time.setDate(1);
	        var yearDay = time.getTime();
	        return [today,yearDay];
	    };
	    return function(time){
	        var check = getDayPoint(new Date());
	        if (time>=check[0]){
	            return dateFormat(time,"HH:mm");
	        }else if(time<check[0]&&time>=check[1]){
	            return dateFormat(time,"MM-dd HH:mm");
	        }else{
	            return dateFormat(time,"yyyy-MM-dd HH:mm");
	        }
	    };
	})(),
	/**
	 * 时间戳转化为日期(用于左边面板)
	 * @return {string} 转化后的日期
	 */
	transTime2 :(function(){
	    var getDayPoint = function(time){
	        time.setMinutes(0);
	        time.setSeconds(0);
	        time.setMilliseconds(0);
	        time.setHours(0);
	        var today = time.getTime();
	        time.setMonth(1);
	        time.setDate(1);
	        var yearDay = time.getTime();
	        return [today,yearDay];
	    };
	    return function(time){
	        var check = getDayPoint(new Date());
	        if (time>=check[0]){
	            return dateFormat(time,"HH:mm");
	        }else if(time>=check[0]-60*1000*60*24){
	            return "昨天";
	        }else if(time>=(check[0]-2*60*1000*60*24)){
	            return "前天";
	        }else if(time>=(check[0]-7*60*1000*60*24)){
	            return "星期"+dateFormat(time,"w");
	        }else if(time>=check[1]){
	            return dateFormat(time,"MM-dd");
	        }else{
	            return dateFormat(time,"yyyy-MM-dd");
	        }
	    };
	})()
};
var _$encode = function(_map,_content){
    _content = ''+_content;
    if (!_map||!_content){
        return _content||'';
    }
    return _content.replace(_map.r,function($1){
        var _result = _map[!_map.i?$1.toLowerCase():$1];
        return _result!=null?_result:$1;
    });
};
/**
 * 日期格式化
 * @return string
 */
var dateFormat = (function(){
    var _map = {i:!0,r:/\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g},
        _12cc = ['上午','下午'],
        _12ec = ['A.M.','P.M.'],
        _week = ['日','一','二','三','四','五','六'],
        _cmon = ['一','二','三','四','五','六','七','八','九','十','十一','十二'],
        _emon = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    var _fmtnmb = function(_number){
        _number = parseInt(_number,10)||0;
        return (_number<10?'0':'')+_number;
    };
    var _fmtclc = function(_hour){
        return _hour<12?0:1;
    };
    return function(_time,_format,_12time){
        if (!_time||!_format){
        	 return '';
        }    
        _time = new Date(_time);
        _map.yyyy = _time.getFullYear();
        _map.yy   = (''+_map.yyyy).substr(2);
        _map.M    = _time.getMonth()+1;
        _map.MM   = _fmtnmb(_map.M);
        _map.eM   = _emon[_map.M-1];
        _map.cM   = _cmon[_map.M-1];
        _map.d    = _time.getDate();
        _map.dd   = _fmtnmb(_map.d);
        _map.H    = _time.getHours();
        _map.HH   = _fmtnmb(_map.H);
        _map.m    = _time.getMinutes();
        _map.mm   = _fmtnmb(_map.m);
        _map.s    = _time.getSeconds();
        _map.ss   = _fmtnmb(_map.s);
        _map.ms   = _time.getMilliseconds();
        _map.w    = _week[_time.getDay()];
        var _cc   = _fmtclc(_map.H);
        _map.ct   = _12cc[_cc];
        _map.et   = _12ec[_cc];
        if (!!_12time){
            _map.H = _map.H%12;
        }
        return _$encode(_map,_format);
    };
})();

module.exports = util;