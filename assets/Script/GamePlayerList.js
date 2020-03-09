
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
        autoi18n.analysisLanguageSprite(this.node,'youxijieusuanNode.tuichufangjian','qx');
        autoi18n.analysisLanguageSprite(this.node,'youxijieusuanNode.zailaiyiju','qx');
    },

    onLoad () {

        this.playerListScrollViewContent = this.playerListScrollView.content;

        // this.addPlayerListCell()
        this.addAutoI18n()
        this.setJiesuanStr(0);
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
        }
    },

    setJiesuanStr(num){
        this.node.getChildByName("youxijieusuanNode").getChildByName("bjhdLabel").getComponent(cc.Label).string = autoi18n.languageData.GameScene.bjyxhd;
        this.node.getChildByName("youxijieusuanNode").getChildByName("LabelMoney").getComponent(cc.Label).string = "+" + num;
    },

    setGameOverCallBack(callback_exitgame, callback_playeragin ){
        this.callback_exitgame = callback_exitgame;
        this.callback_playeragin = callback_playeragin;
    },

    addPlayerListCell(ret){

        if(!ret || ret.length <= 0){
            return
        }
        this.playerListScrollViewContent.removeAllChildren();

        this.playerListScrollViewContent.height = this.playerListItem.height * ret.length

        for (var i = 0; i < ret.length; i++) {
            var newPcell = cc.instantiate(this.playerListItem)
            newPcell.x = 0;
            newPcell.active = true
            this.playerListScrollViewContent.addChild(newPcell)
            this.initCell(newPcell,ret[i],i)
        }
    },


    initCell(node,data,idx){
        let userStore = data.userStore
        node.getChildByName("name").getComponent(cc.Label).string = window.subSTotring(data.nickName)
        node.getChildByName("money").getComponent(cc.Label).string = 0;
        node.getChildByName("defenNum").getComponent(cc.Label).string = userStore.score;
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

        if(this.modeType == "wanjialiebiao"){

        }else if(this.modeType == "youxijiesuan"){

        }
    },

    onCloseLayer(){
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },

    onExitGame(){
        if(this.callback_exitgame){
            this.callback_exitgame()
        }
    },

    onPlayerAgain(){
        if(this.callback_playeragin){
            this.callback_playeragin()
        }
        this.onCloseLayer()
    },


});
