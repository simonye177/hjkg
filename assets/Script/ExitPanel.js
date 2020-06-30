
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
        this.timeNode = this.node.getChildByName("timeNode");
        this.addAutoI18n();
    },

    start () {

    },

    setTipsStr(str){
        this.tipsStr.string = str;
    },

    setOneButton(){
        this.node.getChildByName("qxButton").active = false;
        this.node.getChildByName("qrButton").x = 0;
    },

    showTime(time){
        this.timeNode.active = true;
        this.totleTime = time;
        this.startTime = new Date().getTime();
        this.schedule(this.sched,0.1);
    },

    sched(){
        let nowTime = new Date().getTime();
        let timeLabel = Number((nowTime - this.startTime) / 1000);
        let daojishilabel = Number(this.totleTime - timeLabel).toFixed(3);
        this.timeNode.getChildByName("time").getComponent(cc.Label).string = daojishilabel;

        if(daojishilabel<=0){
            this.closeNode();
        }
    },


    closeTimerCallBack( callback ){
        this.closeTimerCallback = callback;
    },

    setQrCallBack(callback){
        this.QrCallBack = callback;
    },

    onExitGame(){
        window.playEff("button");
        this.closeNode()
        if(this.QrCallBack){
            this.QrCallBack()
        }
    },

    onCancleExit(){
        window.playEff("button");
        this.closeNode()
    },

    closeNode(){
        window.playEff("button");
        this.unschedule(this.sched);
        if(this.closeTimerCallback)this.closeTimerCallback();
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },
});
