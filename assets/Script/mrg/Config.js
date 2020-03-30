

//协议指令可以放在这
window.GlobalConfig = {};
GlobalConfig.token = "";
GlobalConfig.tipsZidx = 2998; // tips层级
GlobalConfig.GET_SOKET_MSG = "GET_SOKET_MSG";
GlobalConfig.SOKET_OPEN = "SOKET_OPEN";
GlobalConfig.SOKET_CLOSE = "SOKET_CLOSE";
GlobalConfig.PENGZHUANG_WALL = "PENGZHUANG_WALL";
GlobalConfig.PENGZHUANG_GOLD = "PENGZHUANG_GOLD";


// GlobalConfig.HttpHost = "118.178.16.240";
GlobalConfig.HttpHost = "game.cmzzz.top";
GlobalConfig.websockstr = "ws://" +  GlobalConfig.HttpHost + ":2348";
GlobalConfig.GetFriendListUrl = "https://" + GlobalConfig.HttpHost + "/api/v1/game/contact";
GlobalConfig.PostInviteFriendUrl = "https://" + GlobalConfig.HttpHost + "/api/v1/game/invite";

GlobalConfig.USER_INFO = 0; //玩家信息
GlobalConfig.HEART_PACK = 1000; //心跳
GlobalConfig.ROOM_LIST = 3000;//房间列表
GlobalConfig.CREATE_ROOM = 3001;//创建房间
GlobalConfig.SOCKTE_SEARCH_ROOM = 3002;//搜索房间
GlobalConfig.JOIN_ROOM = 3003;//加入房间

GlobalConfig.EXITGAME = 3004;//退出房间
GlobalConfig.ROOMJIESAN = 3005;//匹配
GlobalConfig.USERREADY = 3006;//准备/取消准备
GlobalConfig.GAMESTART = 3007;//游戏开始
GlobalConfig.CATCH_MINERAL = 3008;//碰撞矿石
GlobalConfig.ONSERVER_EXIT_GAME = 3009;//未准备提出房间
GlobalConfig.ADD_MINERAL = 3010; //增加矿石
GlobalConfig.GAME_OVER = 3011;//游戏结束
GlobalConfig.RECOVER_GAME = 3012;//恢复游戏
GlobalConfig.GET_INVITE = 3020;//收到邀请
GlobalConfig.LOGIN_OUT = 4444; //玩家被挤号了