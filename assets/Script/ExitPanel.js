
cc.Class({
    extends: cc.Component,

    properties: {

    },
    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.node,'title','tiptitle');
        autoi18n.analysisLanguageSprite(this.node,'qrButton','qd');
        autoi18n.analysisLanguageSprite(this.node,'qxButton','qx');
    },


    onLoad () {
        this.tipsStr = this.node.getChildByName("tips").getComponent(cc.Label)
        this.addAutoI18n();
    },

    start () {

    },

    setTipsStr(str){
        this.tipsStr.string = str;
    },

    setQrCallBack(callback){
        this.QrCallBack = callback;
    },

    onExitGame(){
        if(this.QrCallBack){
            this.QrCallBack()
        }
        this.closeNode()
    },

    onCancleExit(){
        this.closeNode()
    },

    closeNode(){
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },
});
