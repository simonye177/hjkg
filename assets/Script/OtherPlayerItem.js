
cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad () {
        this.headIcon = this.node.getChildByName("headicon")
        this.isReady = this.node.getChildByName("zhunbei")
        this.name = this.node.getChildByName("name").getComponent(cc.Label)
        this.money = this.node.getChildByName("money").getComponent(cc.Label)
        this.defenNum = this.node.getChildByName("defenNum").getComponent(cc.Label)
    },

    initUI(data){
        data = data || {}
        data.userStore = data.userStore || {}
        this.name.string = window.subSTotring(data.nickName);
        this.money = 0;
        this.defenNum.string = data.userStore.score || 0;
        window.getHeadRes(data.avatarUrl, (sp)=>{
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp;
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
    },

    setUserScore(score){
        this.defenNum.string = score
    },

    setIsReady(isReady){
        isReady = isReady || false
        this.isReady.active = isReady
    },

});
