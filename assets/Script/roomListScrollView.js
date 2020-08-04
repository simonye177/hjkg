
var ScrollViewHelper = require("ScrollViewHelper")
cc.Class({
    extends: ScrollViewHelper,

    properties: {
        item:{
            type:cc.Node,
            default:null
        },
        spawnCount: 0, // 实际生成的item数量
        spacing: 0, // 间距
    },

    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.item,'roomType_1','gongkaifang');
        autoi18n.analysisLanguageSprite(this.item,'roomType_2','mimafang');
        autoi18n.analysisLanguageSprite(this.item,'lijijiaru','lijijiaru');
    },

    onLoad () {
        ScrollViewHelper.prototype.onLoad.call(this)
        this.node.on('scrolling', this.srolling, this)
        this.addAutoI18n()
    },

    __initScrollView(){
        var arg = {
            item : this.item,
            spawnCount : this.spawnCount,
            spacing : this.spacing,
        }
        ScrollViewHelper.prototype.initScrollView.call(this,arg)
    },

    srolling(){
        this.scrollingTime = new Date().getTime()
    },

    getSrollingTime(){
        if(!this.scrollingTime){
            return true
        }
        var curTime = new Date().getTime()
        return ((curTime-this.scrollingTime)>5000)
    },

    srollToBottom(){

    },

    addData(data){
        this.__initScrollView()
        ScrollViewHelper.prototype.addItemToScrollView.call(this,data)
    },

    joinRoomCallBack(call){
        this.callback = call;
    },

    updateItem(idx,data,itemNode){
        if(!itemNode){
            cc.log(" itemNode id not exit")
            return
        }
        // cc.log("--------------idx:" ,idx , data)
        itemNode.getComponent("RoomListItem").roadUI(data)
        itemNode.getComponent("RoomListItem").setJiaRuCallBack((roomId , roomType)=>{
            if(this.callback)
                this.callback(roomId,roomType)
        })

    },

});
