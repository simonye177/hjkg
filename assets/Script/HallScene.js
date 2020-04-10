require("Config");
require("ComonFunc");

cc.Class({
    extends: require("AppScene"),

    properties: {
        roomListScrollView: {
            default: null,
            type: cc.ScrollView
        },

        roomListCell:{
            default:null,
            type:cc.Node
        }
    },

    addAutoI18n(){
        autoi18n.analysisLanguageData(this.node,'hallUI.text_RoomList','HallScene');
        autoi18n.analysisLanguageData(this.node,'RoomListIcon.headicondi.l_fangzhu','HallScene');
        autoi18n.analysisLanguageData(this.node,'RoomListIcon.i_danzhu','HallScene');
        autoi18n.analysisLanguageData(this.node,'RoomListIcon.i_wanjia','HallScene');
        autoi18n.analysisLanguageData(this.node,'RoomListIcon.i_fanghao','HallScene');

        autoi18n.analysisLanguageSprite(this.node,'hallUI.btn_backhall','exitgame');
        autoi18n.analysisLanguageSprite(this.node,'hallUI.btn_gamerule','gamerule');
        autoi18n.analysisLanguageSprite(this.node,'hallUI.btn_seachRoom','ssfjbtn');
        autoi18n.analysisLanguageSprite(this.node,'hallUI.dibg.btn_createRoom','cjfjbtn');
        autoi18n.analysisLanguageSprite(this.node,'hallUI.dibg.btn_FastJoin','ksjrbtn');
        autoi18n.analysisLanguageSprite(this.node,'RoomListIcon.roomType_1','gongkaifang');
        autoi18n.analysisLanguageSprite(this.node,'RoomListIcon.roomType_2','mimafang');
        autoi18n.analysisLanguageSprite(this.node,'RoomListIcon.lijijiaru','lijijiaru');
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        this.isSendGetList = false
        this.isCancelPipei = false
        this.initMgr()
        this.initScene("Hall")
        this.initUI()
        this.addListens()
        this.sendGetRoomList()
        // cc.game.on("onLanguageChange",this.addAutoI18n,this);
        this.addAutoI18n();

        this.schedule(this.updateRoomList,5)
        // //大厅音乐
        this.scheduleOnce(()=>{
            var path = "mus/joinhall"
            cc.vv.musicManage.loadClip(path, function (err, clip) {
                if (err) {
                    cc.error('playMusic: ', path)
                    return
                }
                cc.vv.musicManage.playMusic(clip,true)
            }); 
        },1)

        this.setMusicButtonState()
    },

    start(){
        this._super();
        if(cc.vv.gameData.getBackInfo()){
            cc.vv.gameData.setBackInfo(null)
            this.hallwebSocketInit()
        }
    },

    initMgr(){
        if(!cc.vv){
            cc.vv = {}
            GlobalConfig.token = this.getUrlParam('token')
            this.shareRoomId = this.getUrlParam('roomId')
        }

        //事件
        if(!cc.vv.eventMgr){
            var EventMgr = require("EventMgr");
            cc.vv.eventMgr = new EventMgr();
            cc.vv.eventMgr.init();
        }


        //预制体
        if(!cc.vv.PrefabMgr){
            var PrefabMgr = require("PrefabMgr");
            cc.vv.PrefabMgr = new PrefabMgr();
            cc.vv.PrefabMgr.init();
        }


        if(!cc.vv.musicManage){
            cc.vv.musicManage = require("musicManage")
        }

        if(!cc.vv.gameData){
            var GameData = require("GameData")
            cc.vv.gameData = new GameData();
            cc.vv.gameData.initData()
        }


        if(!cc.vv.webSoket){
            var WebSoket = require("WebSoket");
            cc.vv.webSoket = new WebSoket();
            cc.vv.webSoket.init();
            // this.testPost(0)
            this.hallwebSocketInit()
        }


        // let lang=cc.sys.localStorage.getItem("lang");
        let lang = this.getUrlParam('lang')
        if(!lang){
            lang = "ZH";
        }
        autoi18n.changeLanguage(lang);

        window.addCommonPrefab();

        this.scheduleOnce(()=>{
            this.postNotice();
        },1)

        // this.simonTest();
    },


        
    hallwebSocketInit(){
        if(GlobalConfig.token){
            var str = GlobalConfig.websockstr + "?token="+ GlobalConfig.token + "&channel=game"
            cc.vv.webSoket.webSocketInit(str)
        }
    },


    onX(evet,idx){
        if(Number(idx)==100){
            let adrbox = this.node.getChildByName("testAcc").getChildByName("adr").getChildByName("adrEditBox")
            let str = adrbox.getComponent(cc.EditBox).string
            cc.vv.webSoket.webSocketInit(str)
            return

            //?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1Nzg4Nzk2NTksIm5iZiI6MTU3ODg3OTY1OSwiZXhwIjoxNTc5NDg0NDU5LCJkYXRhIjoiNSJ9
            //.uPFaf2l0uEZLCsRkMKcrkZhZV9oc6iaVfzKsD8x6ROM&channel=game
        }
        this.testPost(Number(idx))
    },


    testPost(_idx){
        let loginAccountArg = [11111,22222,33333,44444,55555,66666,77777,88888,99999];
        let idx = cc.sys.localStorage.getItem('loginAccountArgIdx');
        cc.log("---------------------:" , idx)
        if(!idx || idx == "" || idx == 9){
            idx = 0
        }
        if(_idx!=undefined){
            idx = _idx
        }
        let loginAccount =  loginAccountArg[Number(idx)]  
        cc.log("=================================loginAccount:" , loginAccount)
        var url = "http://118.178.16.240/api/v1/passport/login";

        let arg = { loginAccount: loginAccount, loginPassword:123456  }
        window.httpPost(url, arg,(ret)=>{
            var token = ret.result.token
            var str = GlobalConfig.websockstr + "?token="+ token + "&channel=game"
            cc.log("login_Post:" , str)
            cc.vv.webSoket.webSocketInit(str)
        })
        idx = Number(Number(idx) + 1)
        cc.sys.localStorage.setItem('loginAccountArgIdx',idx);
    },

    simonTest(){
        // let tempArg = {roomId:10086 , time : new Date().getTime()}
        // let ExitArg = cc.sys.localStorage.getItem('UserExitTimeArg')
        // let newArg = [];
        // if(ExitArg){
        //     newArg = JSON.parse(ExitArg);
        // }
        // newArg.push(tempArg)
        // cc.sys.localStorage.setItem('UserExitTimeArg', JSON.stringify(newArg));

        // let ret = this.checkIsCannotJoin(10086);
        // if(!ret){

        // }
    },


    checkIsCannotJoin(_roomId){
        let isnot = false;
        // let ExitArg1 = cc.sys.localStorage.getItem('UserExitTimeArg')
        // let newArg1 = [];
        // if(ExitArg1){
        //     newArg1 = JSON.parse(ExitArg1);
        //     for(var i = newArg1.length-1; i >= 0; i-- ){
        //         var curTime = new Date().getTime();
        //         if(curTime - newArg1[i].time > (1000 * 60 * 5) ){
        //             cc.log("checkIsCannotJoin 删除了一个元素:" , newArg1[i].roomId)
        //             newArg1.splice(i,1)
        //         }else{
        //             if(newArg1[i].roomId == _roomId){
        //                 let timeMiao = 300 - Math.ceil((curTime - newArg1[i].time) / 1000)
        //                 ShowTipsLabel(autoi18n.languageData.showText.tcfjti.format(timeMiao))
        //                 isnot = true;
        //                 cc.log("checkIsCannotJoin 检测到房间号:" , newArg1[i].roomId , timeMiao)
        //                 break;
        //             }
        //         }
        //     }
        // }
        return isnot;
    },


    initUI(){

        // this.roomListScrollView.on("scroll-to-bottom", ()=>{
        //     cc.log("scroll-to-bottom---")
        // });

        //测试
        // this.addRoomListCell();
    },

    updateRoomList(){
        var ret = this.roomListScrollView.node.getComponent("roomListScrollView").getSrollingTime()
        if(ret){
            this.sendGetRoomList()
        }
    },

    addRoomListCell(ret){
        if(this.lastRet){
            if(JSON.stringify(this.lastRet) == JSON.stringify(ret))return
        }
        this.lastRet = ret;
        this.roomListScrollView.content.removeAllChildren();
        if(!ret || ret.length <= 0){
            return
        }
        this.roomListScrollView.node.getComponent("roomListScrollView").addData(ret)
        this.roomListScrollView.node.getComponent("roomListScrollView").joinRoomCallBack((roomId , roomType)=>{
            window.playEff("button");
            if(!this.tipNoNetWork()) return;
            let ret = this.checkIsCannotJoin(roomId);
            if(ret) return;
            this.joinRoom(roomId,roomType)
        })


        // this.roomListScrollViewContent.removeAllChildren();
        // this.roomListScrollViewContent.height = this.roomListCell.height * ret.length
        // for (var i = 0; i < ret.length; i++) {
        //     var newPcell = cc.instantiate(this.roomListCell)
        //     newPcell.x = 0;
        //     newPcell.active = true
        //     // cc.log("this.roomListScrollViewContent:" , this.roomListScrollViewContent)
        //     // cc.log("this.roomListScrollViewContent_newPcell:" , newPcell)
        //     this.roomListScrollViewContent.addChild(newPcell)
        //     newPcell.getComponent("RoomListItem").roadUI(ret[i])
        //     newPcell.getComponent("RoomListItem").setJiaRuCallBack((roomId , roomType)=>{
        //         this.joinRoom(roomId,roomType)
        //     })
        // }
    },

    onExitGame(event,iskeyBack){
        if(iskeyBack) return;
        cc.log("touch back hall")
        // cc.game.end();
        window.playEff("button");
        cc.vv.musicManage.stopMusic();
        if(cc.vv.webSoket.getSoketState() == 1 ){
            cc.vv.webSoket.closeSoket(true);
        }else{
            cc.log("无网络直接退出游戏")
            if(window.alsc && window.alsc.finish){
                window.alsc.finish();
            }
        }
    },

    // JS`正则表达式`获取地址栏url参数：
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    },

    setMusicButtonState(){
        let state = cc.vv.musicManage.getMusicState();
        this.node.getChildByName("hallUI").getChildByName("btn_mus_on").active = state;
        this.node.getChildByName("hallUI").getChildByName("btn_mus_off").active = !state;
    },

    onTouchMusic(){
        window.playEff("button");
        let state = cc.vv.musicManage.getMusicState();
        state = !state;
        cc.vv.musicManage.setMusicState(state);
        this.setMusicButtonState();
    },

    onSeachRoom(){
        window.playEff("button");
        if(!this.tipNoNetWork()) return;
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/SearchRoomView",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                obj.getComponent("SearchRoom").setMode(1,null,(str)=>{
                    let ret = this.checkIsCannotJoin(str);
                    if(ret) return;
                    var sendStr =   {
                        cmd: GlobalConfig.SOCKTE_SEARCH_ROOM,
                        roomId: str
                    }
                    cc.vv.webSoket.websocketSend(sendStr);
                })
                return
            }
        })
    },

    onCrateRoom(){
        window.playEff("button");
        if(!this.tipNoNetWork()) return;
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/CreatRoom",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj , cc.v2(0,-190))
                return
            }
        })
    },

    onOpenRule(){
        window.playEff("button");
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/GameRule",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                return
            }
        })
    },


    showGameUpdateTips(data){
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/GameUpdateTips",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                obj.getComponent("GameUpdateTips").setData(data);
                return
            }
        })
    },

    //
    opneInvite(data){
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/GetInvite",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                obj.getComponent("GetInvite").initMsg(data)
                obj.getComponent("GetInvite").setAgreeCallBack(()=>{
                    this.sendjoinRoom(data.roomId,"" , "share")
                })
                return
            }
        })
    },


    opnePipeiView(){
        this.isCancelPipei = false
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/PipeiView",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                this.peiPeiObj = obj
                cPopUpManage.show(obj)
                obj.getComponent("PipeiLayer").setCancleCallBack(()=>{
                    this.peiPeiObj = null
                    this.isCancelPipei = true
                })
                return
            }
        })
    },

    closePipeiLayer(){
        if(this.peiPeiObj){
            var cPopUpManage = PopUpManage().getComponent("PopUpManage");
            cPopUpManage.hide(this.peiPeiObj, true)
            this.peiPeiObj = null
            cc.log("close pi pei")
        }
    },



    shuruMiMaJoin(roomId){
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/SearchRoomView",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                obj.getComponent("SearchRoom").setMode(2,roomId,(ret)=>{
                    this.sendjoinRoom(roomId,ret)
                })
                return
            }
        })
    },

    addListens(){
        var self = this
        cc.vv.eventMgr.addHandler(GlobalConfig.GET_SOKET_MSG, function (data) {
            cc.log("大厅收到协议数据:" , data)
            self.dearWithMsg(data)
        },this);

        cc.vv.eventMgr.addHandler(GlobalConfig.SOKET_OPEN, function (data) {
            self.sendGetRoomList()
            if(this.shareRoomId){
                this.shareRoomId = null
                let ret = this.checkIsCannotJoin(this.shareRoomId);
                if(ret) return;
                this.sendjoinRoom(this.shareRoomId,"" , "share")
            }
        },this);

        cc.vv.eventMgr.addHandler(GlobalConfig.SOKET_CLOSE, function (data) {
            this.unschedule(this.hallwebSocketInit)
            this.schedule(this.hallwebSocketInit,5)
        },this);
    },




    sendGetRoomList(){
        var state = cc.vv.webSoket.getSoketState()
        if(state == 1){
            cc.log("刷新房间列表")
            // this.isSendGetList = true
            var sendStr =   {
                cmd: GlobalConfig.ROOM_LIST,
            }
            cc.vv.webSoket.websocketSend(sendStr)
        }
    },


    dearWithMsg(data){
        if(!data.cmd){
            return
        }
        var cmd = Number(data.cmd)

        var have = cc.vv.webSoket.findKeyIsHave(cmd)
        if(!have){
            cc.log("收到非游戏协议：" , cmd)
            return
        }

        if(cmd==1000){
            window.sendHeart()
            return
        }

        if(cmd!=GlobalConfig.GET_INVITE && data.code!=200){
            cc.log("================msg:" , data.msg)
            ShowTipsLabel( window.showServerTips(data.msg) ||  autoi18n.languageData.showText.czerrortips)
            if(cmd==GlobalConfig.ROOMJIESAN){
                window.playEff("ksjrsb");
                this.closePipeiLayer()
            }
            return
        }

        // cc.log("cmd.hall....................." ,cmd)
        var result = data.result || {}
        if(cmd == GlobalConfig.SOCKTE_SEARCH_ROOM){
            var roomId = result.roomId
            var roomType = result.roomType
            if(roomId&&roomType){
                this.joinRoom(roomId,roomType)
            }else{
                ShowTipsLabel(autoi18n.languageData.showText.ssfjbcztips)
            }
        }else if(cmd == GlobalConfig.CREATE_ROOM){
            var roomId = result.roomId
            if(roomId){
                window.playEff("cjfjcg");
                this.sendjoinRoom(roomId)
                cc.vv.gameData.setJoinRoomType(1)
            }
        }else if(cmd == GlobalConfig.ROOM_LIST){
            if(result){
                this.addRoomListCell(result)
            }
        }else if(cmd == GlobalConfig.JOIN_ROOM){
            if(result){
                window.joinGame(result,false)
            }
        }
        else if(cmd == GlobalConfig.USER_INFO){
            if(result){
                cc.vv.gameData.setUserInfo(result)
                this.unschedule(this.hallwebSocketInit)
            }
        }else if(cmd == GlobalConfig.ROOMJIESAN){
            if(result){
                if(!this.isCancelPipei){
                    this.closePipeiLayer()
                    let ret = this.checkIsCannotJoin(result);
                    if(ret) return;
                    this.sendjoinRoom(result)
                    window.playEff("cgpipei");
                }
            }
        }else if(cmd == GlobalConfig.RECOVER_GAME){
            if(result){
                // this.sendjoinRoom(result)
                window.joinGame(result,true)
            }
        }else if(cmd == GlobalConfig.GET_INVITE){
            //收到邀请信息
            this.opneInvite(data)
        }
    },

    joinRoom(roomId,roomType){
        if(roomType == 1){
            this.sendjoinRoom(roomId)
        }else if(roomType == 2){
            this.shuruMiMaJoin(roomId)
        }
    },

    sendjoinRoom(roomId,password,from){
        password = password || ""
        var from = from || ""
        var sendStr =   {
            cmd: GlobalConfig.JOIN_ROOM,
            roomId:roomId,
            password:password,
            from:from
        }
        cc.vv.webSoket.websocketSend(sendStr)
        cc.vv.gameData.setJoinRoomType(2)
    },


    onFastJoin(){
        window.playEff("button");
        if(!this.tipNoNetWork()) return;
        this.opnePipeiView()
    },

    //请求公告
    postNotice(){
        let url = GlobalConfig.PostNotice;
        window.httpPost(url,{token:GlobalConfig.token || ""},(ret)=>{
            cc.log("postNoticeret:" , ret)
            if(ret){
                let notice = ret.data.notice;
                if(notice){
                    this.showGameUpdateTips(notice)
                    this.posRead(notice.article_id);
                }
            }
        })
    },

    posRead(readid){
        if(!readid) return;
        let url = GlobalConfig.PostRead;
        window.httpPost(url,{token:GlobalConfig.token || "" , id:readid},(ret)=>{
            cc.log("posRead:" , ret)
        })
    },

    
    tipNoNetWork(){
        var state = cc.vv.webSoket.getSoketState()
        var isConect = state==1
        if(!isConect)
            ShowTipsLabel(autoi18n.languageData.showText.wldktips)
        return isConect
    },


    onDestroy(){
        cc.log("hall scene ondestroy")
        this._super();
        cc.vv.musicManage.stopMusic();
        this.unschedule(this.updateRoomList)
    },
});
