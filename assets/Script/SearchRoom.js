
cc.Class({
    extends: cc.Component,

    properties: {
        searEditBox:{
            default:null,
            type:cc.EditBox
        },
        mimaEditBox:{
            default:null,
            type:cc.EditBox
        }
    },

    addAutoI18n(){
        autoi18n.analysisLanguageData(this.node,'fanghaoEditBox.PLACEHOLDER_LABEL','SearchRoom');
        autoi18n.analysisLanguageData(this.node,'mimaEditBox.PLACEHOLDER_LABEL','SearchRoom');

        autoi18n.analysisLanguageSprite(this.node,'title','sousuofangj');
        autoi18n.analysisLanguageSprite(this.node,'titlemima','shurumima');
    },

    onLoad () {
        this.fanghaoTitle = this.node.getChildByName("title")
        this.mimaTitle = this.node.getChildByName("titlemima")
        this.addAutoI18n();
    },

    start () {

    },

    //1 搜索 2 输入密码   arg 扩展参数 jiaruCallBack 点击加入的回调
    setMode(modeType , arg , callback){
        cc.log("-----------------:" , modeType)
        this.modeType = modeType;
        this.fanghaoTitle.active = modeType==1;
        this.mimaTitle.active = modeType==2;
        this.searEditBox.node.active = modeType==1;
        this.mimaEditBox.node.active = modeType==2;

        this.arg = arg
        this.jiaruCallBack = callback
    },

    onCloseLayer(){
        window.playEff("button");
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },

    onLijiJiaRu(){
        window.playEff("button");
        if(this.modeType == 1){
            var sr = this.searEditBox.getComponent("cc.EditBox").string;
            if(!sr || sr.trim() == ""){
                ShowTipsLabel(autoi18n.languageData.showText.fhbnwktips)
                return
            }
            cc.log("lijijiaru-----:" , sr)
            var sendStr =   {
                cmd: GlobalConfig.SOCKTE_SEARCH_ROOM,
                roomId: sr
            }
            cc.vv.webSoket.websocketSend(sendStr);
            this.onCloseLayer();
        }else if(this.modeType == 2){
            var sr = this.mimaEditBox.getComponent("cc.EditBox").string;
            if(!sr || sr.trim() == ""){
                ShowTipsLabel(autoi18n.languageData.showText.ssmmjrtips)
                return
            }
            if(this.jiaruCallBack){
                this.jiaruCallBack(sr)
            }
            this.onCloseLayer();
        }
    },

});
