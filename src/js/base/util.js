/**
 * ------------------------------------------------------------
 * util     工具库
 * ------------------------------------------------------------
 */

'use strict';
// var CONST  = require("./const.js");

var util = {
	getNode: function(ipt,node){
		if(this.isString(ipt)){
			node = node||document;
			return node.querySelector(ipt);	
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

module.exports = util;