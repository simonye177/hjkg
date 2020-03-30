
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

    setIconID(id){
        this.kuangshiIconId = id;
    },

    getIsJinse(){
        return this.isJinse;
    },

    getID(){
        return this.kuangshiId || 0
    },

    getIconID(){
        return this.kuangshiIconId || 1;
    },
});
