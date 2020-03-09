
cc.Class({
    extends: cc.Component,

    properties: {
        isJinse:true
    },


    onLoad () {
    },

    setID(id){
        this.kuangshiId = id
    },

    getIsJinse(){
        return this.isJinse;
    },

    getID(){
        return this.kuangshiId || 0
    },
});
