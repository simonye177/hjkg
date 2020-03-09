
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.isChoose = false
        this.setIsChoose(false)
        // this.setPlayerState(false)

    },

    start () {
    },

    initItemUI(data){
        // cc.log("initItemUI====:" , data)
        this.node.getChildByName("name").getComponent(cc.Label).string = window.subSTotring(data.nickName)
        this.node.getChildByName("money").getComponent(cc.Label).string = 0;
        this.headIcon = this.node.getChildByName("headicon");
        window.getHeadRes(data.avatarUrl, (sp)=>{
            // cc.log("sssssssss:" , this.headIcon)
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
        this.setPlayerState(false);
    },

    setPlayerState(isIngame){
        this.node.getChildByName("youxizhong").active = isIngame
        this.node.getChildByName("kongxian").active = !isIngame
    },

    setIsChoose( b ){
        // cc.log("----------------------------setIsChoose:" , b)
        if(b == this.isChoose){
            return
        }
        this.node.getChildByName("gou").active = b;
        this.isChoose = b;
    },

    onTouchKuang(){
        this.setIsChoose(!this.isChoose)
    },

    getIsChoose(){
        return this.isChoose
    },
});
