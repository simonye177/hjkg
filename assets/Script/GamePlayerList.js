
cc.Class({
    extends: cc.Component,

    properties: {

        playerListItem:{
            default:null,
            type:cc.Node
        },

        playerListScrollView: {
            default: null,
            type: cc.ScrollView
        },

    },

    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.node,'bg.title','titlewjlb');
        autoi18n.analysisLanguageSprite(this.node,'bg.titleyxjs','youxijiesuantitle');
        autoi18n.analysisLanguageSprite(this.node,'PlayerListItem.tichuwanjia','tichu');
        autoi18n.analysisLanguageSprite(this.node,'youxijieusuanNode.tuichufangjian','tuichufangjian');
        autoi18n.analysisLanguageSprite(this.node,'youxijieusuanNode.zailaiyiju','zailaiyiju');
    },

    onLoad () {

        this.playerListScrollViewContent = this.playerListScrollView.content;

        // this.addPlayerListCell()
        this.addAutoI18n()
        // this.setJiesuanStr(0,0);
    },


    setModeTyppe(str){
        this.modeType = str
        if(str == "wanjialiebiao"){

        }else if(str == "youxijiesuan"){
            this.node.getChildByName("youxijieusuanNode").active = true
            this.node.getChildByName("bg").getChildByName("title").active = false
            this.node.getChildByName("bg").getChildByName("titleyxjs").active = true
            this.node.getChildByName("bg").getChildByName("closebtn").active = false
            this.node.getChildByName("mask").getComponent("mask").setIsNeedClose(false)

            this.scheduleOnce(()=>{
                if(this.callback_playeragin)
                    this.callback_playeragin();
                this.onCloseLayer()
            },20)
        }
    },

    setJiesuanStr(price,taxPrice){
        var num = price
        if(num>0){
            num = taxPrice
            window.playEff("yingle");
        }else{
            num = 0;
            window.playEff("shule");
        }
        var bjhdLabel = this.node.getChildByName("youxijieusuanNode").getChildByName("bjhdLabel")
        bjhdLabel.getComponent(cc.Label).string = autoi18n.languageData.GameScene.bjyxhd;

        var LabelMoney =this.node.getChildByName("youxijieusuanNode").getChildByName("LabelMoney")
        LabelMoney.getComponent(cc.Label).string =  Number(num).toFixed(2);

        var LabelA13 =this.node.getChildByName("youxijieusuanNode").getChildByName("A13Label")

        LabelMoney.x = bjhdLabel.x + bjhdLabel.getContentSize().width/2 + 60
        LabelA13.x = LabelMoney.x + 80

    },

    setGameOverCallBack(callback_exitgame, callback_playeragin ){
        this.callback_exitgame = callback_exitgame;
        this.callback_playeragin = callback_playeragin;
    },

    addPlayerListCell(ret,myuid,roomOwerUid,roomId){
        // cc.log("addPlayerListCell_ret:" , ret)
        this.myUid = myuid;
        this.roomOwerUid = roomOwerUid;
        this.roomId = roomId;
        if(!ret || ret.length <= 0){
            return
        }

        this.retData = ret;

        this.playerListScrollViewContent.removeAllChildren();

        this.playerListScrollViewContent.height = this.playerListItem.height * ret.length

        let fangzhu = (this.modeType == "wanjialiebiao" && myuid == roomOwerUid);
        for (var i = 0; i < ret.length; i++) {
            var newPcell = cc.instantiate(this.playerListItem)
            newPcell.x = 0;
            newPcell.active = true
            this.playerListScrollViewContent.addChild(newPcell)
            this.initCell(newPcell,ret[i],i,fangzhu)
        }

    },


    initCell(node,data,idx,isfangzhu){
        let userStore = data.userStore
        node.getChildByName("name").getComponent(cc.Label).string = window.subSTotring(data.nickName)
        node.getChildByName("money").getComponent(cc.Label).string = Number(userStore.balance).toFixed(2) || 0;
        node.getChildByName("rank").getComponent(cc.Label).string = "NO." + Number(Number(idx)+1);
        window.getHeadRes(data.avatarUrl, (sp)=>{
            // node.getChildByName("headicon").getComponent(cc.Sprite).spriteFrame = sp
            let headIcon = node.getChildByName("headicon");
            if(headIcon){
                headIcon.getComponent(cc.Sprite).spriteFrame = sp;
                headIcon.height = 200;
                headIcon.width = 200;
            }
        })

        var df = userStore.score || 0;
        if(this.modeType == "wanjialiebiao"){
            // df = userStore.score || 0;
        }else if(this.modeType == "youxijiesuan"){
            // df = userStore.price || 0;
            if(this.myUid == data.userId){
                // cc.log("=====================:" , data.price)
                this.setJiesuanStr(userStore.price||0 , userStore.taxPrice || 0);
            }
            node.getChildByName("time").getComponent(cc.Label).string = "Time：" + (Number(userStore.catchTime || 0)).toFixed(3) + " ms"
        }
        node.getChildByName("time").active = this.modeType == "youxijiesuan";
        node.getChildByName("kuangshiicon").active = this.modeType == "wanjialiebiao";
        node.getChildByName("money").active = this.modeType == "wanjialiebiao";
        node.getChildByName("defenNum").getComponent(cc.Label).string = Number(df).toFixed(2) ;

        if(isfangzhu && data.userId!=this.myUid){
            let tcwj =node.getChildByName("tichuwanjia");
            tcwj.active = true;
            tcwj.on('click', ()=>{
                this.sendTichuWanjia(data.userId);
            }, this);
            node.getChildByName("defen").active = false;
            node.getChildByName("defenNum").active = false;
        }
    },

    onCloseLayer(){
        window.playEff("button");
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },

    onExitGame(){
        window.playEff("button");
        if(this.callback_exitgame){
            this.callback_exitgame()
        }
    },

    onPlayerAgain(){
        window.playEff("button");
        if(this.callback_playeragin){
            this.callback_playeragin()
        }
        this.onCloseLayer()
    },

    tichuPlayer(uid){
        // var ret = window.deepClone(this.retData);
        for(let i = 0 ; i <this.retData.length; ++i){
            if(this.retData[i].userId == uid){
                this.retData.splice(i,1)
                break
            }
        }
        this.addPlayerListCell(this.retData,this.myUid,this.roomOwerUid,this.roomId);
    },

    sendTichuWanjia(uid){
        var sendStr =   {
            cmd: GlobalConfig.FANGZHU_TIREN,
            outId: uid,
            roomId:this.roomId,
        }
        cc.vv.webSoket.websocketSend(sendStr)

    },


});
