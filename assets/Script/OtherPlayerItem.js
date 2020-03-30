
cc.Class({
    extends: cc.Component,

    properties: {

    },

    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.node,'zhunbei','yizhunbeiz');
    },

    onLoad () {
        this.headIcon = this.node.getChildByName("headicon")
        this.isReady = this.node.getChildByName("zhunbei")
        this.name = this.node.getChildByName("name").getComponent(cc.Label)
        this.money = this.node.getChildByName("money").getComponent(cc.Label)
        this.defenNum = this.node.getChildByName("defenNum").getComponent(cc.Label)
        this.addAutoI18n();
    },

    initUI(data){
        data = data || {}
        data.userStore = data.userStore || {}
        this.name.string = window.subSTotring(data.nickName);
        // this.money = Number(data.balance).toFixed(2) || 0;
        // this.defenNum.string = data.userStore.score || 0;
        this.setUserScore(data.userStore.score)
        this.setUserAlsc(data.userStore.balance)
        window.getHeadRes(data.avatarUrl, (sp)=>{
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp;
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
    },

    setUserScore(score){
        this.defenNum.string = score || 0
    },

    setUserAlsc(alsc){
        this.money.string = Number(alsc).toFixed(2) || 0
    },

    setIsReady(isReady){
        isReady = isReady || false
        this.isReady.active = isReady
    },

});
