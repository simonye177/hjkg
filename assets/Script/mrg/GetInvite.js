
cc.Class({
    extends: cc.Component,

    properties: {

    },

    addAutoI18n(){
        autoi18n.analysisLanguageData(this.node,'tip','GetInvite');
        autoi18n.analysisLanguageSprite(this.node,'title','youxiyaoqing');
        autoi18n.analysisLanguageSprite(this.node,'jujue','jujue');
        autoi18n.analysisLanguageSprite(this.node,'jiaru','jiaru');
    },

    start () {
        this.addAutoI18n();
    },

    initMsg(data){
        data = data || {}
        this.node.getChildByName("name").getComponent(cc.Label).string = window.subSTotring(data.nickName)
        this.node.getChildByName("money").getComponent(cc.Label).string = 0;
        this.headIcon = this.node.getChildByName("headicon");
        window.getHeadRes(data.avatarUrl, (sp)=>{
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
    },

    onCloseLayer(){
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },

    setAgreeCallBack(callback){
        this.agreeCallBack = callback
    },

    onAgree(){
        if(this.agreeCallBack){
            this.agreeCallBack()
        }
        this.onCloseLayer()
    },

    onReject(){
        this.onCloseLayer()
    },

});
