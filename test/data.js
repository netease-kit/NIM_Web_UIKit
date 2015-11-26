var friendsList = [
	{account: "123wer456"},
	{account: "12345ew6"},
	{account: "12345we6"},
	{account: "wh"},
	{account: "wujie"}
]
var friendsData ={
	data:{
		friends:friendsList,
		account:"wujie"
	},
	infoprovider:infoProvider
}

var sessionsList =[
	{
		hasMoreLocalMsgs: true,
		id: "p2p-wujie3",
		lastMsg: {
			cc: true,
			flow: "out",
			from: "wujie",
			fromClientType: "Web",
			fromDeviceId: "cb7acd64d0f22c7d8532f3b9742275a9",
			fromNick: "吴杰",
			idClient: "a2aa9e8f68329d1b0044e07156a0367f",
			idServer: "8194006",
			isHistoryable: true,
			isOfflinable: true,
			isPushable: true,
			isRoamingable: true,
			isSyncable: true,
			isUnreadable: true,
			needPushNick: true,
			resend: false,
			scene: "p2p",
			sessionId: "p2p-wujie3",
			status: "success",
			target: "wujie3",
			text: "sdfsdf",
			time: 1448519261346,
			to: "wujie3",
			type: "text",
			userUpdateTime: 1448351697679	
		},
		scene: "p2p",
		to: "wujie3",
		unread: 0,
		updateTime: 1448519261942
	},
	{
		hasMoreLocalMsgs: true,
		id: "p2p-wujie3",
		lastMsg: {
			cc: true,
			flow: "out",
			from: "wujie",
			fromClientType: "Web",
			fromDeviceId: "cb7acd64d0f22c7d8532f3b9742275a9",
			fromNick: "吴杰",
			idClient: "a2aa9e8f68329d1b0044e07156a0367f",
			idServer: "8194006",
			isHistoryable: true,
			isOfflinable: true,
			isPushable: true,
			isRoamingable: true,
			isSyncable: true,
			isUnreadable: true,
			needPushNick: true,
			resend: false,
			scene: "p2p",
			sessionId: "p2p-wujie3",
			status: "success",
			target: "wujie3",
			text: "sdfsdf",
			time: 1448519261346,
			to: "wujie3",
			type: "text",
			userUpdateTime: 1448351697679	
		},
		scene: "p2p",
		to: "wujie3",
		unread: 2,
		updateTime: 1448519261942
	},
	{
		hasMoreLocalMsgs: true,
		id: "team-8348",
		lastMsg: {
			cc: true,
			flow: "out",
			from: "wujie",
			fromClientType: "Web",
			fromDeviceId: "cb7acd64d0f22c7d8532f3b9742275a9",
			fromNick: "吴杰",
			idClient: "a6bc20c7ad610eb22c2fda3d805dd200",
			idServer: "556198264837",
			isHistoryable: true,
			isOfflinable: true,
			isPushable: true,
			isRoamingable: true,
			isSyncable: true,
			isUnreadable: true,
			needPushNick: true,
			resend: false,
			scene: "team",
			sessionId: "team-8288",
			status: "success",
			target: "8288",
			text: "sdfsdf",
			time: 1448520326534,
			to: "8288",
			type: "text",
			userUpdateTime: 1448351697679
		},
		scene: "team",
		to: "8348",
		unread: 3,
		updateTime: 1447987020290
	}	
]
var sessionsData ={
	data:{sessions:sessionsList},
	infoprovider:infoProvider
}
function infoProvider(data,type){
        var info = {};
        switch(type){
            case "session":
              	var msg = data.lastMsg,
                    scene = msg.scene;
                info.scene = msg.scene;
                info.target = msg.target;
                info.time =  "星期天";
                info.unread = data.unread>99?"99+":data.unread;
                info.text = "测试下";
                if(info.scene==="p2p"){
                    //点对点
					var userInfo =data.target;
					info.nick = "猜猜我是谁";
					info.avatar = 'http://b12026.nos.netease.com/MTAxMTAxMA==/bmltYV8xMTkwNTlfMTQ0NzMxNDU5NjgyNV9lOTc5OTE1NC02MjU4LTQzYTUtOWYzOS04ZTVhODAxMmFmMjA=?imageView&amp;thumbnail=80x80&amp;quality=85';
                }else{
                    //群组
                    info.nick =data.target;
                    info.avatar = "./images/normal.png"; 
                }
            break;
            case "friend":
                info.target = data.account;
                info.nick = "猜猜我是谁";
                info.avatar = 'http://b12026.nos.netease.com/MTAxMTAxMA==/bmltYV8xMTkwNTlfMTQ0NzMxNDU5NjgyNV9lOTc5OTE1NC02MjU4LTQzYTUtOWYzOS04ZTVhODAxMmFmMjA=?imageView&amp;thumbnail=80x80&amp;quality=85';     
            break;
            case "team":
                // info.target = data.account;
                // info.nick = data.nick;
                // info.avatar = getAvatar(data.avatar);    
                // info.crtSession = this.crtSession;  
            break;
        }
        return info;
}