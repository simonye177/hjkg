
cc.Class({
    extends: require("AppScene"),

    properties: {

        OtherPlayerItem:{
            default:null,
            type:cc.Node
        },

        otherPlaerScrollView:{
            default:null,
            type:cc.ScrollView
        },

        gameJinkuang:{
            default:null,
            type:cc.Node
        },
        gameshikuang:{
            default:null,
            type:cc.Node
        },

    },
    
    addAutoI18n(){
        autoi18n.analysisLanguageData(this.node,'upNode.leftdi.nicheng','GameScene');
        autoi18n.analysisLanguageData(this.node,'upNode.leftdi.defen','GameScene');
        autoi18n.analysisLanguageData(this.node,'upNode.rightdi.fanghao','GameScene');
        autoi18n.analysisLanguageData(this.node,'upNode.leftdi.paiming','GameScene');
        autoi18n.analysisLanguageData(this.node,'upNode.rightdi.wanjia','GameScene');
        autoi18n.analysisLanguageData(this.node,'upNode.leftUp.kszl','GameScene');

        autoi18n.analysisLanguageSprite(this.node,'btn_backhall','fhdtbtn');
        autoi18n.analysisLanguageSprite(this.node,'btn_exitgame','exitgame');
        autoi18n.analysisLanguageSprite(this.node,'btn_gamerule','gamerule');
        autoi18n.analysisLanguageSprite(this.node,'btn_playerlist','wanjialiebiao');
        autoi18n.analysisLanguageSprite(this.node,'btn_invitefriend','yaoqinghaoyou');
        autoi18n.analysisLanguageSprite(this.node,'zhunbeiNode.zhunbei','zhunbei');
        autoi18n.analysisLanguageSprite(this.node,'zhunbeiNode.qxzhunbei','yizhunbei');
        autoi18n.analysisLanguageSprite(this.node,'tipNode.cjfjtips','chuangjiansuss');
        autoi18n.analysisLanguageSprite(this.node,'tipNode.jrfjtips','jiarususs');
    },

    //初始化
    onLoad () {
        cc.log("onLoadonLoad")
        this.OtherPlayerItemCotent = this.otherPlaerScrollView.content;
        this.operationState =  0;   // 0代表等候    1代表出钩   2 回钩
        this.gameState = 1; // //1等待玩家  2 准备倒计时 3 游戏已开始  4 游戏结束
        this.zhuaziSpeed = 500 //爪子速度
        // this.isLeft = false
        this.isRuningAct = false
        this.qxzbTimes = 0; //取消准备的次数
        this.exitGameType = 0; //退出房间类型  3 就是游戏结算   1 就是被踢出的  2 主动退出

        this.initScene("Game")
        this.gameRect = this.node.getChildByName("gameRect")
        this.shengzi = this.node.getChildByName("shengzi")
        this.readyNode = this.node.getChildByName("zhunbeiNode")
        this.zhuazi = this.node.getChildByName("shengzi").getChildByName("zhuazi")

        var upNode = this.node.getChildByName("upNode")
        this.myName = upNode.getChildByName("leftdi").getChildByName("username").getComponent(cc.Label)
        this.mypaiming = upNode.getChildByName("leftdi").getChildByName("paimingNum").getComponent(cc.Label)
        this.myCoin = upNode.getChildByName("rightdi").getChildByName("jinbNum").getComponent(cc.Label)
        this.myScore = upNode.getChildByName("leftdi").getChildByName("defenNum").getComponent(cc.Label)
        this.timerLabel = this.node.getChildByName("bottonNode").getChildByName("timeNum").getComponent(cc.Label)
        this.fanghaoNum = upNode.getChildByName("rightdi").getChildByName("fanghaoNum").getComponent(cc.Label)
        this.wanjiaLabel = upNode.getChildByName("rightdi").getChildByName("wanjiaNum").getComponent(cc.Label)
        this.cszlLabel = upNode.getChildByName("leftUp").getChildByName("kszlNum").getComponent(cc.Label)
        this.mylastcathtime = upNode.getChildByName("mylastcathtime").getComponent(cc.Label)
        let isrecover = this.isRecover();

        this.initRoom(isrecover);
        this.initGame();

        this.addAutoI18n();

        if(!isrecover){
            this.startTimerToReady(true);
        }else{
            this.recoverGame();
        }
        
        this.setMusicButtonState()

        this.scheduleOnce(()=>{
            this.playGameMusic();
            this.addAcNode();
        },0.5)
        
        this.presPrefab();
    },

    start(){
        this._super();
        cc.log("startstart..")

    },

    //初始化房间 进来初始化一次
    initRoom(isrecover){
        var roomInfo = cc.vv.gameData.getCurRoomInfo()
        this.roomId = roomInfo.roomId
        this.myInfo = cc.vv.gameData.getUserInfo()
        this.myUid = this.myInfo.userId
        cc.log("----------------initRoom_this.myUid:" , this.myUid)
        this.roomInfo = roomInfo
        this.timerLabel.node.active = false;
        this.cszlLabel.string = roomInfo.payAmount;
        this.myName.string = window.subSTotring(this.myInfo.nickName);
        // this.myName.string = window.subSTotring("胡明明给你想那你");
        this.fanghaoNum.string = this.roomId;
        this.local_mergeUsers(this.roomInfo)
        // this.updateOterPlayer(true)
        this.updateUserAlsc()

        this.tipsJoinRoom(isrecover)
        this.addOperationListen()
        this.addHandlerListen()
        this.updatePlayerNum()
    },

    //断线重连
    isRecover(){
        let isRecover = cc.vv.gameData.getIsRecoverJoinRoom()
        return isRecover;
    },

    //初始化游戏 每局
    initGame(){
        this.operationState = 0;
        this.gameState = 1;
        this.myScore.string = 0;
        this.timerLabel.string = 0;
        this.mypaiming.string = 0;
        this.qxzbTimes = 0
        this.isShowTipsAlscKou = false;
        this._myReadState = false;
        this.updateOtherReady()
        this.showMyReadyNode(true)
        this.setExitGameBtnType(1)
        this.resetShengziState();
        this.shengziAction()
        this.unschedule(this.updateShengLength)
        this.removeKuangshi();
        this.setCollision(false);
        this.updateOterPlayer(true)
    },

    //收到消息
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
            // ShowTipsLabel(data.msg || autoi18n.languageData.showText.czerrortips)
            ShowTipsLabel( window.showServerTips(data.msg) ||  autoi18n.languageData.showText.czerrortips)
            return
        }

        // cc.log("cmd.game....................." ,cmd)
        var result = data.result || {}
        if(cmd == GlobalConfig.USERREADY){
            if(result!=null){
                this.local_mergeUsers(result)
                this.updateOtherReady()
                // cc.log("---------------------USERREADY:" ,this.roomInfo.users)
                this.setReadState(result.userStore)
                if(result.timer){
                    this.gameState = 2;
                    this.gameTimer(result.timer)
                    if(!this.isShowTipsAlscKou && this.lastMystate){
                        let tips = autoi18n.languageData.showText.xtydj + " " +this.roomInfo.payAmount  + " ALSC"
                        ShowTipsLabel(tips);
                        this.isShowTipsAlscKou = true;
                    }
                }
            }
        }else if(cmd == GlobalConfig.GAMESTART){
            if(result){
                this.gameStart(result,false)
            }
        }else if(cmd == GlobalConfig.EXITGAME){
            if(result){
                // window.exitGame()
                this.local_mergeUsers(result)
                this.outRoom()
            }
        }else if(cmd == GlobalConfig.CATCH_MINERAL){
            if(result){
                //抓到矿石
                this.local_mergeUsers(result)
                this.updateUserScore();
                this.updatePlayerRankAndTime();
                var item = result.item
                if(item){
                    // cc.log("------------CATCH_MINERAL_this.myUid:" , item.userId , this.myUid , item.userId == this.myUid)
                    if(item.userId == this.myUid){
                        //爪子收回要加分
                        this.piaoFenAction(item.score)
                    }else{
                        // //移除矿石
                        // let node = this.gameRect.getChildByName(item.id)
                        // if(node){
                        //     node.removeFromParent()
                        // }
                    }
                }
            }
        }else if(cmd == GlobalConfig.ONSERVER_EXIT_GAME){
            //未准备踢出房间
            if(result){
                var out = result.out || {}
                for(let i=0; i<out.length;++i ){
                    if(out[i].userId == this.myUid){
                        this.exitGameType = 1;
                        this.saveUserExitTimeArg();
                        window.exitGame();
                    }else{
                        //别的玩家被踢出房间 删除那个人的数据并刷新
                        this.deleteUser(out[i].userId)
                        this.updatePlayerNum();
                        this.updateOterPlayer(true);
                    }
                }
            }
        }else if(cmd == GlobalConfig.ADD_MINERAL){
            if(result){
                let newItems = result.newItems || {}
                this.createKuangshi(newItems);
            }
        }else if(cmd == GlobalConfig.GAME_OVER){
            //游戏结束
            if(result){
                this.local_mergeUsers(result)
                this.gameOver(result)
            }
        }else if(cmd == GlobalConfig.JOIN_ROOM){
            if(result){//玩家加入房间 更新玩家列表状态
                this.local_mergeUsers(result)
                this.updateOterPlayer(true)
                this.updatePlayerNum()
            }
        }else if(cmd == GlobalConfig.READ_TIME){
            if(result){
                this.startTimerReadyServer(result.timer);
            }
        }
    },

    //开启 关闭 60秒踢出倒计时  功能不用前端做了
    startTimerToReady(isStart){
        var roomInfo = cc.vv.gameData.getCurRoomInfo()
        cc.log("----------------isMimaFANG:" , roomInfo.roomType)
        if(roomInfo.roomType!=1){
            cc.log("---密码房---")
            return
        }
        if(isStart){
            let curtime = new Date().getTime();
            let totleTile = 40;
            // if(this.qxzbTimes==1){
            //     totleTile = 10;
            // }
            this.gameTimer(totleTile,true)
        }else{
            this.timerLabel.node.active = false;
            this.unschedule(this.updateCurTime);
        }
    },

    startTimerReadyServer(time){
        if(time){
            this.gameTimer(time)
        }else{
            this.timerLabel.node.active = false;
            this.unschedule(this.updateCurTime);
        }
    },


    //开始绳子动画
    shengziAction(){
        var t = 2
        cc.log("-------开始播放绳子动画")
        this.shengzi.runAction(cc.repeatForever(
            cc.sequence(
                cc.rotateTo(t, 180),
                cc.rotateTo(t, 0),
            )))
    },

    //重置爪子和绳子状态
    resetShengziState(){
        this.shengzi.rotation = 0;
        this.shengzi.width = 50;
        this.shengzi.stopAllActions();
        this._resetZhuaziState();
        this.isRuningAct = false;
    },

    _resetZhuaziState(){
        this.zhuazi.stopAllActions();
        this.zhuazi.removeAllChildren();
        this.zhuazi.x = 51;
        this.zhuazi.y = 0;
    },


    //爪子动画
    zhuaziAction( pos , callback,arg){
        if(this.isRuningAct){
            cc.log("this.isRuningAct...................ing")
            return
        }
        this.isRuningAct = true
        // cc.log(".......................pos:" , pos.x,pos.y)
        var zhuaziPos = this.zhuazi.position
        var zhuaziW = this.zhuazi.parent.convertToWorldSpaceAR(zhuaziPos);
        this.zhuaziStartPos = zhuaziW

        var dis = window.distanceWin(pos , zhuaziW)

        // cc.log(".......................from-to:" , zhuaziW.x , zhuaziW.y , "-----" , pos.x , pos.y ,  dis)

        let nodeZhuaPos = this.zhuazi.parent.convertToNodeSpaceAR(pos)

        // cc.log("----------------nodeZhuaPos:" , nodeZhuaPos.x , nodeZhuaPos.y)
        let speed = this.zhuaziSpeed;
        if(arg && arg.isget){
            speed = this.zhuaziSpeed
            if(arg.isgold==1){
                speed = this.zhuaziSpeed * 0.7
            }
        }
        var t = dis / speed
        this.zhuazi.stopAllActions()
        this.zhuazi.runAction(cc.sequence(
            cc.moveTo(t,cc.v2(nodeZhuaPos.x,nodeZhuaPos.y)),
            cc.callFunc(()=>{
                this.isRuningAct = false
                if(callback){
                    callback()
                }
            })))
    },


    //回收爪子
    backZhuazi(isget,ret){
        this.operationState = 2;
        this.setCollision(false)
        let isgold = 0
        if(isget){
            let c_node = this.gameshikuang;
            isgold = 1
            if(ret.isgold){
                c_node = this.gameJinkuang;
                isgold = 2;
            }
            var clonSp = this.getChuangshiIcon(ret.isgold,ret.iconId)
            // var clonSp = cc.instantiate(c_node)
            clonSp.active = true
            clonSp.x = 20
            clonSp.rotation = -90
            this.zhuazi.addChild(clonSp)
            this.clonSp = clonSp
        }
        this.zhuaziAction(this.zhuaziStartPos,()=>{
            this.shengzi.width = 50;
            this.scheduleOnce(()=>{
                this.operationState = 0; //延迟更改状态  避免绳子不更新
            },0.1)

            if(this.clonSp){
                this.clonSp.removeFromParent()
                this.clonSp = null
            }
            this.shengzi.resumeAllActions()
            this._resetZhuaziState();
            this.setCollision(true)

            //给玩家加分
        },{isback:true,isget:isget,isgold:isgold})
    },


    getChuangshiIcon(isGold,idx){
        let c_node = this.gameshikuang;
        var godstr = "shitou";
        if(isGold){
            c_node = this.gameJinkuang;
            godstr = "jinkuang";
        }
        var clonSp = cc.instantiate(c_node)
        var imgStr = "kuangshi/" + godstr + idx; 
        cc.loader.loadRes(imgStr, cc.SpriteFrame, (err, res) => {
            //加载错误则报错
            if (err) {
                console.error(err);
                return;
            }
            clonSp.getComponent(cc.Sprite).spriteFrame = res;
        });
        return clonSp
    },

    //添加操作层
    addOperationListen(){


        this.gameRect.on('touchend', function (event) {

            if(this.operationState == 0 && this.gameState == 3){
                this.operationState = 1
                this.shengzi.pauseAllActions()
                var pos = this.CalculationPosition()
                window.playEff("chugou");
                this._resetZhuaziState();
                this.zhuaziAction(pos,()=>{
                    this.backZhuazi(false)
                })
            }
        }, this);
        
    },
    

    //计算爪子要去的位置
    CalculationPosition(){
        var rotateSz = this.shengzi.rotation
        var shengziW = this.shengzi.parent.convertToWorldSpaceAR(this.shengzi.position);
        // cc.log(".....................shengziW:" , shengziW.x , shengziW.y)
        var isLeft = rotateSz > 90
        if(rotateSz>90){
            rotateSz = 180- rotateSz
        }
        if(rotateSz==90){
            return cc.v2(375,0)
        }

        // rotateSz = 45 

        // cc.log("................rotateSz:" , rotateSz)
        var const_w = 750 / 2
        var d_Lenght = Math.tan(rotateSz * Math.PI/180) * const_w

        // cc.log(".....................d_Lenght:" , d_Lenght)

        var xjypos = shengziW.y - d_Lenght
        var xjxpos = isLeft ?  0 : 750

        // cc.log(".......................endPos:" , endPos.x,endPos.y)
        return cc.v2(xjxpos , xjypos)
    },


    //开启绳子更新长度
    startShenziSChedule(){
         this.schedule(this.updateShengLength,0)
    },

    //更新绳子长度
    updateShengLength(){
        if(!this.shengziW){
            this.shengziW = this.shengzi.parent.convertToWorldSpaceAR(this.shengzi.position);
        }
        if(this.operationState != 0){
            var w_ac = this.zhuazi.parent.convertToWorldSpaceAR(this.zhuazi.position);
            let jl = distanceWin(this.shengziW ,w_ac )
            if(jl<50){
                jl = 50
            }
            this.shengzi.width = jl
        }
    },


    //创建矿石
    chuangjiankuangshi(id , pos,isgold,i){
        var maxIndex = 13;
        var c_node = this.gameshikuang;
        var godstr = "shitou";

        if(isgold){
            maxIndex = 9;
            godstr = "jinkuang";
            c_node = this.gameJinkuang;
        }
        var __indexRand =  Math.ceil(Math.random() * maxIndex);

        var ks = this.getChuangshiIcon(isgold,__indexRand)
        ks.active = true
        ks.x = pos.x * this.gameRect.width/750
        ks.y = pos.y * this.gameRect.height/700
        ks._name = id
        // cc.log("-----------------------chuangjiankuangshi:" , id,i)
        ks.getComponent("Mineral").setID(id);
        ks.getComponent("Mineral").setIconID(__indexRand);
        this.gameRect.addChild(ks)
    },


    //设置是否可以碰撞
    setCollision(b){
        var manager = cc.director.getCollisionManager();
        manager.enabled = b;
        cc.log("............设置碰撞：" , b)
        // manager.enabledDebugDraw = true;
    },


    //添加协议侦听
    addHandlerListen(){
        var self = this
        cc.vv.eventMgr.addHandler(GlobalConfig.GET_SOKET_MSG, function (data) {
            cc.log("游戏收到协议数据:" , data)
            self.dearWithMsg(data)
        },this);

        cc.vv.eventMgr.addHandler(GlobalConfig.PENGZHUANG_WALL, (ret)=>{
            this.isRuningAct = false
            window.playEff("shitou");
            this.backZhuazi(false)
        },this);

        cc.vv.eventMgr.addHandler(GlobalConfig.SOKET_CLOSE, function (data) {
            window.exitGame(true)
        },this);

        cc.vv.eventMgr.addHandler(GlobalConfig.PENGZHUANG_GOLD, (ret)=>{
            //避免抓取多个
            var curTime = new Date().getTime();
            if(this.lastGetGoldTime){
                let chaVule = curTime - this.lastGetGoldTime;
                if(chaVule<=100){
                    cc.log("抓取太快了")
                    return
                }
            }
            if(!ret.isgold){
                window.playEff("shitou");
            }
            
            this.lastGetGoldTime = curTime
            this.isRuningAct = false
            this.backZhuazi(true,ret)
            this.playFireAction(ret.isgold);
            var sendStr =   {
                cmd: GlobalConfig.CATCH_MINERAL,
                roomId:this.roomId,
                itemId:ret.id
            }
            cc.vv.webSoket.websocketSend(sendStr)

        },this);

    },

    //退出游戏
    onExitGame(){
        cc.log("touch game exit game")
        window.playEff("button");
        if(this.exitGameBtnType == 2){
            this.onJieSanTips(autoi18n.languageData.showText.qdtcyx,()=>{
                // window.exitGame()
                // cc.game.end()
                cc.vv.musicManage.stopMusic();
                // window.alsc.finish();
                cc.vv.webSoket.closeSoket(true);
            })
        }else{
            var users = this.roomInfo.users
            if(users.length==1 && users[0].userId == this.myUid){
                this.onJieSanTips(autoi18n.languageData.showText.zhwjtc,()=>{
                    this.sendExitGame(2)
                })
                return
            }
            this.sendExitGame(2)
        }
    },

    //发送退出游戏
    sendExitGame(exitType){
        this.exitGameType = exitType;
        var sendStr =   {
            cmd: GlobalConfig.EXITGAME,
            roomId:this.roomId
        }
        cc.vv.webSoket.websocketSend(sendStr)
    },

    openGameList(){
        window.playEff("button");
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/GamePlayerList",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj,cc.v2(120,0))
                obj.getComponent("GamePlayerList").setModeTyppe("wanjialiebiao")
                let arg_sort = this.getDeepClonUser()
                obj.getComponent("GamePlayerList").addPlayerListCell(arg_sort)
                return
            }
        })
    },

    openInviteFriend(){
        window.playEff("button");
        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/IviteFriend",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj,cc.v2(120,0))
                obj.getComponent("IviteFriend").setMyInfo(this.myInfo , this.roomId)
                return
            }
        })
    },
    //打开规则
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

    onJieSanTips(tipStr , callback){

        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/ExitPanel",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                cPopUpManage.show(obj)
                obj.getComponent("ExitPanel").setTipsStr(tipStr);
                obj.getComponent("ExitPanel").setQrCallBack(callback)
                return
            }
        })
        
    },


    addAcNode(){
        cc.vv.PrefabMgr.add("prefab/AcNode",(prefabInstance)=>{
            if(prefabInstance){
                prefabInstance.parent = this.node.getChildByName("bg")
            }
        })
    },


    openGmeResult(result){

        var cPopUpManage=window.PopUpManage().getComponent("PopUpManage")
        cc.vv.PrefabMgr.add("prefab/GamePlayerList",(prefabInstance)=>{
            if(prefabInstance){
                let obj = prefabInstance
                obj.x = 0;
                obj.y = 100
                cPopUpManage.show(obj,cc.v2(0,100))
                // cc.log("sdfasdfasdfa:" , result)
                var resultTemp = this.local_mergeUsers(result,true)
                let arg_sort = this.getDeepClonUser(resultTemp)
                // cc.log("sdfasdfasdfa111:" , arg_sort)
                obj.getComponent("GamePlayerList").setModeTyppe("youxijiesuan")
                obj.getComponent("GamePlayerList").addPlayerListCell(arg_sort,this.myUid)
                obj.getComponent("GamePlayerList").setGameOverCallBack(
                    ()=>{
                        this.sendExitGame(3)
                    },
                    ()=>{
                        //还原game
                        this.resetGame()
                        // this.onReadyGame()
                    }
                )
                return
            }
        })

    },

    //添加其他玩家
    addPlayerItem(ret , isInit){
        ret = ret || {}
        var cloneret = window.deepClone(ret)
        var size = cloneret.length

        if(size>=2){
            cloneret.sort(function(a,b){
                return b.userStore.score-a.userStore.score;
            });
        }
        //大于3时候要把最后一个插入到第三个位置
        if(size>3){
            let lastData = cloneret.pop();
            cloneret.splice(2,0,lastData);
        }

        this.OtherPlayerItemCotent.removeAllChildren();

        var hangshu = size % 3 == 0 ? size/3 : Math.ceil(size/3)
        this.OtherPlayerItemCotent.height = this.OtherPlayerItem.height * hangshu

        var constIntever = 220
        for (var i = 0; i < size; i++) {
            var newPcell = cc.instantiate(this.OtherPlayerItem)
            newPcell.x = i%3 == 1 ? 0 : (i%3 == 0 ? -constIntever:constIntever);
            newPcell.y =  - Math.floor(i/3) * this.OtherPlayerItem.height  - this.OtherPlayerItem.height / 2 
            newPcell.active = true
            newPcell._name = cloneret[i].userId
            this.OtherPlayerItemCotent.addChild(newPcell)
            newPcell.getComponent("OtherPlayerItem").initUI(cloneret[i] , size , isInit)
        }
    },

    // //复原其他玩家
    // initOtherPlayerItem(){
    //     let children = this.OtherPlayerItemCotent.children;
    //     for(let i = 0 ; i < children.length ; ++i){
    //         let node = children[i].getComponent("OtherPlayerItem");
    //         if(node){
    //             node.initState();
    //         }
    //     }
    // },


    //开始和结束的动画
    tipsGameStarAndOver(isgameStart , isrecover){
        if(isrecover)return;
        var tipNode = this.node.getChildByName("tipNode")
        var tStr = "gameover"
        if(isgameStart){//自己创的房
            tStr = "gamebegin"
        }
        var node = tipNode.getChildByName(tStr)
        this.gameTipsAction(node)
    },


    //加入房间提示
    tipsJoinRoom(isrecover){
        if(isrecover)return;
        var myUid = cc.vv.gameData.getUserInfo().userId
        var owerUid = cc.vv.gameData.getCurRoomCreatorInfo().userId
        var tipNode = this.node.getChildByName("tipNode")
        var joinType = cc.vv.gameData.getJoinRoomType()
        var tStr = "jrfjtips"
        if(myUid == owerUid && joinType == 1){//自己创的房
            tStr = "cjfjtips"
        }
        var node = tipNode.getChildByName(tStr)
        this.gameTipsAction(node)
    },

    //房间提示动画
    gameTipsAction(node,callback){
        var time = 0.5
        node.active = true
        node.scale = 0
        var seq = cc.sequence(
            cc.scaleTo(time, 1).easing(cc.easeBackOut()),
            cc.delayTime(1.2),
            cc.callFunc(function (rec) {
                node.active = false
                if (callback) {
                    callback()
                }
            }),
            );
        node.runAction(seq)
    },

    //点击准备
    onReadyGame(evet , data){
        // let curTime = new Date().getTime();
        // if(this.touchReadyTime && curTime-this.touchReadyTime < 1000){
        //     cc.log("点击太频繁了")
        //     return
        // }
        window.playEff("button");
        var setTouchEnable = (b)=>{
            this.readyNode.getChildByName("zhunbei").getComponent(cc.Button).interactable = b;
            this.readyNode.getChildByName("qxzhunbei").getComponent(cc.Button).interactable = b;
        }

        // this.touchReadyTime = curTime;

        // //记录当局取消准备的次数
        // if(Number(data)==0 && this.roomInfo.roomType == 1){
        //     this.qxzbTimes += 1;
        //     if(this.qxzbTimes == 1){
        //         ShowTipsLabel(autoi18n.languageData.showText.qxzbtips)
        //     }else if(this.qxzbTimes==2){
        //         this.sendExitGame(1)
        //         return
        //     }
        // }

        var sendStr =   {
            cmd: GlobalConfig.USERREADY,
            roomId:this.roomId
        }
        cc.vv.webSoket.websocketSend(sendStr)

        setTouchEnable(false);
        this.scheduleOnce(()=>{
            setTouchEnable(true);
        },1)
    },

    onJieSan(){
    },

    //设置准备状态是否可见
    showMyReadyNode( is ){
        this.readyNode.active = is
        if(is){
            this.setMyReadState(false)
        }
    },

    //设置其自己准备状态
    setReadState(ret){
        var ret = ret || {}
        for(let i = 0 ; i < ret.length ; i++ ){
            if(ret[i].userId == this.myUid){
                let state = ret[i].ready
                if(this.lastMystate == state)return state;
                this._myReadState = state;
                this.setMyReadState(state)
                let bstate = state ? 2 : 1
                this.setExitGameBtnType(bstate)
                //this.startTimerToReady(bstate==1)
                return state;
            }
        }
    },

    
    setMyReadState(is){
        this.lastMystate = is;
        this.readyNode.getChildByName("zhunbei").active = !is
        this.readyNode.getChildByName("qxzhunbei").active = is
    },


    //飘分
    piaoFenAction(num,callback){
        if(!num || Number(num)<=0){
            // cc.log("num is err:",num)
            return
        }
        num = Number(num).toFixed(2);

        window.playEff("addscore");

        cc.log("飘分：" , num)

        var piaofenNode = this.node.getChildByName("upNode").getChildByName("piaofen")
        piaofenNode.getComponent(cc.Label).string = '+'+ num;
        piaofenNode.stopAllActions()
        piaofenNode.active = true;
        piaofenNode.x=0;
        piaofenNode.y=450;
        piaofenNode.scale = 1;
        piaofenNode.positionY = 450
        piaofenNode.runAction(cc.sequence(
            cc.spawn(
                cc.moveBy(1.5, cc.v2(0, 100)).easing(cc.easeOut(1.5)),
                cc.scaleTo(1.5,0.7),
            ),
            cc.callFunc(function(){
                piaofenNode.active = false
                if(callback){
                    callback()
                }
            },this)
        ));
    },

    //添加其他用户
    updateOterPlayer(isInit){
        var ret = this.roomInfo.users || {}
        var retOther = []
        for(let i = 0 ; i < ret.length ; i++ ){
            if(ret[i].userId == this.myUid){
            }else{
                retOther.push(ret[i])
            }
        }
        this.addPlayerItem(retOther , isInit)
    },

    //创建钻石
    createKuangshi(ret){
        var ret = ret || {}
        var myItems = ret[this.myUid];
        if(myItems){
            let items = Object.values(myItems);
            this.scheduleOnce(()=>{
                for(let i = 0 ; i < items.length ; ++i){
                    var x = items[i].x - 375
                    var y = items[i].y - 300
                    var isjinKuang = items[i].gold
                    this.chuangjiankuangshi(items[i].id , cc.v2(x,y),isjinKuang,i)
                }
            },0.1)
        }
    },

    removeKuangshi(){
      this.gameRect.removeAllChildren()  
    },

    //还原游戏
    resetGame(){
        this.initGame();
    },

    //  游戏开始
    gameStart(result,isrecover){
        this.operationState = 0;
        this.gameState = result.status;
        //合并数据
        this.local_mergeUsers(result);
        this.updateOterPlayer(true);
        this.setCollision(true);
        this.showMyReadyNode(false);
        this.createKuangshi(result.screenItems);
        this.startShenziSChedule()
        this.tipsGameStarAndOver(true,isrecover);
        this.updateUserScore();
        this.updateOtherReady(true);
        this.gameTimer(result.totalTime);
        this.setExitGameBtnType(2);
        this.updatePlayerNum();
        window.playEff("startgame");
    },

    //游戏重连
    recoverGame(){
        let result = cc.vv.gameData.getCurRoomInfo().result
        if(!result){
            return
        }

        let status = result.status   //1等待玩家  2 准备倒计时 3 游戏已开始  4 游戏结束
        cc.log(".................recoverGame.....tatusL:" , status)
        this.gameState = status;
        
        if(status == 3){
            this.gameStart(result,true)
        }else{
            this.showMyReadyNode(true)
            if(status == 1 || status == 2){
                let myReadState = this.setReadState(result.userStore)
                if(!myReadState)
                    this.startTimerToReady(true)
            }
            this.local_mergeUsers(result)
            this.updateOterPlayer(true)
            this.updateOtherReady()
        }
    },

    //游戏结束
    gameOver(result){
        this.gameState = 4;
        this.setCollision(false);
        this.setExitGameBtnType(1)
        this.resetShengziState()
        this.unschedule(this.updateShengLength)
        this.openGmeResult(result)
        this.updateUserScore(true)
        this.updateUserAlsc()
    },


    //游戏倒计时
    gameTimer( time , event){
        cc.log("gameTimer开始倒计时：" , time)
        if(!time || time<=0){
            return
        }
        this.isDaojishi = false;
        this.timerLabel.node.active = true;
        this.readyTimer = event;
        this.unschedule(this.updateCurTime);
        this.timer = time
        this.timerLabel.string = this.timer
        this.startTime = new Date().getTime();
        this.endTime = this.startTime + Number(time) * 1000
        this.timeSchedule = this.schedule(this.updateCurTime,0.1)
    },

    updateCurTime(){
        this.curTimes = new Date().getTime()
        this.timer = Number((this.endTime - this.curTimes) / 1000).toFixed(3)
        this.timerLabel.string = this.timer
        if(this.timer<3 && !this.isDaojishi){
            this.isDaojishi = true;
            window.playEff("daojishi");
        }
        if(this.curTimes>=this.endTime){
                this.unschedule(this.updateCurTime);
                this.timerLabel.string = 0;
                this.timerLabel.node.active = false;
                if(this.readyTimer && !this._myReadState ){
                    this.sendExitGame(1)
                }
        }
    },

    //更新玩家得分
    updateUserScore(isInit){//是否初始化为0分
        isInit = isInit || false
        var users = this.roomInfo.users
        for(let i = 0 ; i < users.length ; ++i){
            if(users[i].userId == this.myUid){
                this.myScore.string = isInit ? 0 : Number(users[i].userStore.score).toFixed(2);
            }else{
                // var otherNode = this.OtherPlayerItemCotent.getChildByName(users[i].userId)
                // if(otherNode){
                //     otherNode.getComponent("OtherPlayerItem").setUserScore(isInit ? 0 : users[i].userStore.score)
                // }
            }
        }
    },

    //更新玩家alsc
    updateUserAlsc(){
        var users = this.roomInfo.users
        cc.log("......更新玩家alsc.....users:" , users)
        for(let i = 0 ; i < users.length ; ++i){
            let alsc = Number(users[i].userStore.balance).toFixed(2)
            if(users[i].userId == this.myUid){
                if(alsc && alsc > 0)
                    this.myCoin.string = "" + alsc
            }else{
                var otherNode = this.OtherPlayerItemCotent.getChildByName(users[i].userId)
                if(otherNode){
                    otherNode.getComponent("OtherPlayerItem").setUserAlsc(users[i].userStore.balance)
                }
            }
        }
    },

    //更新别人的准备状态
    updateOtherReady(isHide){  //isHide  是否隐藏其他玩家的准备状态
        let users = this.roomInfo.users
        // cc.log("========updateOtherReady=====users:" , users)
        for(let i = 0 ; i < users.length ; ++i){
            if(users[i].userId == this.myUid){
            }else{
                var otherNode = this.OtherPlayerItemCotent.getChildByName(users[i].userId)
                if(otherNode){
                    let ret = users[i].userStore.ready
                    if(isHide) ret = false;
                    // cc.log("....................ret:" , ret , users[i].userId)
                    otherNode.getComponent("OtherPlayerItem").setIsReady( ret )
                }
            }
        }
    },


    //合并数据
    local_mergeUsers(result,isNotFZ){
        if(result==null){
            cc.log("................local_mergeUsers:result==null")
            return
        }
        var users = result.users || this.roomInfo.users
        if(!isNotFZ){
            this.roomInfo.users = users
        }
        var userStore = result.userStore || {}
        window.mergeUsers(users,userStore)
        return users
        //fix 更新玩家信息
        // cc.log("...........local_mergeUsers:" , this.roomInfo.users)
    },

    deleteUser(uid){
        var users = this.roomInfo.users
        for(let i = 0 ; i<users.length ; ++i){
            if(users[i].userId == uid){
                users.splice(i, 1);
                break
            }
        }

    },


    //设置退出按钮状态
    setExitGameBtnType(_type){// 1返回大厅  2 退出游戏
        this.exitGameBtnType = _type
        this.node.getChildByName("btn_backhall").active = _type==1
        this.node.getChildByName("btn_exitgame").active = _type==2
    },

    //玩家退出处理
    outRoom(){
        var ret = this.roomInfo.users || {}
        var isHaveSelf = false
        for(let i = 0 ; i < ret.length ; i++ ){
            if(ret[i].userId == this.myUid){
                isHaveSelf = true
                break
            }
        }
        //没有自己了 说明自己已经被踢了
        if(!isHaveSelf){
            this.saveUserExitTimeArg();
            window.exitGame();
        }else{
            this.updatePlayerNum()
            this.updateOterPlayer(true)
        }
    },


    saveUserExitTimeArg(){
        if(this.exitGameType==1){
            let tempArg = {roomId:this.roomInfo.roomId , time : new Date().getTime()}
            let ExitArg = cc.sys.localStorage.getItem('UserExitTimeArg')
            let newArg = [];
            if(ExitArg)
                newArg = JSON.parse(ExitArg);
            newArg.push(tempArg)
            cc.sys.localStorage.setItem('UserExitTimeArg', JSON.stringify(newArg));
        }
    },




    updatePlayerRankAndTime(){
        var ret = this.getDeepClonUser()
        var rank = 0, lastTime = 0;
        for(let i = 0 ; i < ret.length ; i++ ){
            if(ret[i].userId == this.myUid){
                rank = i;
                lastTime = ret[i].userStore.catchTime || 0;
            }
            var otherNode = this.OtherPlayerItemCotent.getChildByName(ret[i].userId)
            if(otherNode){
                otherNode.getComponent("OtherPlayerItem").updateRank(i+1)
                otherNode.getComponent("OtherPlayerItem").updateTime(ret[i].userStore.catchTime)
            }
        }
        // cc.log("....................rank:" , rank)
        this.mypaiming.string = (rank+1);
        this.mylastcathtime.string = Number(lastTime).toFixed(3) + " ms";
    },

    updatePlayerNum(){
        var roomTotleplayer = cc.vv.gameData.getCurRoomInfo().maxCount || 0;
        var curPlayerNum = this.roomInfo.users.length;
        this.wanjiaLabel.string = curPlayerNum+'/'+roomTotleplayer;
    },

    //深拷贝
    getDeepClonUser(_users){
        let users = window.deepClone(_users || this.roomInfo.users)
        //按金币大到小排序 
        var users_sort = users
        if(users.length>=2){
            var users_sort = users.sort(function(a,b){
                return b.userStore.score-a.userStore.score;
            });
        }
        return users_sort
    },

    playGameMusic(){
        var path = "mus/gameMusic"
        cc.vv.musicManage.loadClip(path, function (err, clip) {
            if (err) {
                cc.error('playMusic: ', path)
                return
            }
            cc.vv.musicManage.playMusic(clip,true)
        }); 
    },

    setMusicButtonState(){
        let state = cc.vv.musicManage.getMusicState();
        this.node.getChildByName("btn_mus_on").active = state;
        this.node.getChildByName("btn_mus_off").active = !state;
    },

    onTouchMusic(){
        window.playEff("button");
        let state = cc.vv.musicManage.getMusicState();
        state = !state;
        cc.vv.musicManage.setMusicState(state);
        this.setMusicButtonState();
    },

    playFireAction(isgold){
        if(!isgold)return;
        var fireNode = this.node.getChildByName("upNode").getChildByName("headdi").getChildByName("fire")
        var anim = fireNode.getComponent(cc.Animation);
        anim.stop()
        anim.play();
    },

    presPrefab(){
        let pbArg = [
            "prefab/GamePlayerList",
            "prefab/IviteFriend",
            "prefab/GameRule",
            "prefab/ExitPanel",
            "prefab/AcNode",
        ];
        window.w_loadPrefabStatic(pbArg);
    },

    onDestroy(){
        cc.log("game scene ondestroy")
        this._super();
        cc.vv.musicManage.stopMusic();
    },
});
