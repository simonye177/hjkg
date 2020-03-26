
cc.Class({
    extends: cc.Component,

    properties: {
        isJinse:true,
        label:{
            default:null,
            type:cc.Label
        }
    },


    onLoad () {
    },

    setID(id){
        this.kuangshiId = id
        this.label.getComponent(cc.Label).string = id
    },

    getIsJinse(){
        return this.isJinse;
    },

    getID(){
        return this.kuangshiId || 0
    },
});
