
cc.Class({
    extends: cc.Component,

    properties: {
        is_need_close:true
    },


    onLoad () {
        this.node.setContentSize(cc.winSize.width,cc.winSize.height)

        if(this.is_need_close){
            this.node.on('touchend', function (event) {
                this.removeNode()
            }, this);
        }
    },

    removeNode(){
        if(!this.is_need_close){
            return
        }
        var obj = this.node.getParent()
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(obj, true)
    },


    setIsNeedClose(isneed){
        this.is_need_close = isneed
    }

});
