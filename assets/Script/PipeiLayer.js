cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

        this.ppIdx = 0
        this.time = 0

        this.quan2 = this.node.getChildByName("quan2")
        this.quan3 = this.node.getChildByName("quan3")
        this.timeLabel = this.node.getChildByName("timeLabel").getComponent(cc.Label)

        cc.log("dkfajsdlkfjalsdkjflaksdfasd:" , this.quan2)


        this.quan2.runAction(
            cc.repeatForever(
                cc.rotateBy(2,360)
            )
        )

        this.quan3.runAction(
            cc.repeatForever(
                cc.rotateBy(4,-360)
            )
        )


        this.pipeiArg = []
        for(var i = 0 ; i < 4 ; ++i){
            var pipeiSp = this.node.getChildByName("pipei" + i)
            this.pipeiArg.push(pipeiSp) 
        }

        this.setPiPei(this.ppIdx)

        this.schedule((()=>{
            if(this.ppIdx<3){
                this.ppIdx = this.ppIdx + 1
            }else{
                this.ppIdx = 0
            }
            this.setPiPei(this.ppIdx)
        }).bind(this),0.5)


        this.fixPiPeiTime(this.time)

        //格式化时间
        this.schedule((()=>{
            this.time = this.time + 1
            this.fixPiPeiTime(this.time)
        }).bind(this),1)


        var time = Math.random() * 3
        this.scheduleOnce((()=>{
            // window.joinGame()
            this.sendPipei()
        }).bind(this),time)

    },

    setCancleCallBack(callback){
        this.cancleCallBack = callback
    },


    sendPipei(){
        var sendStr =   {
            cmd: GlobalConfig.ROOMJIESAN,
        }
        cc.vv.webSoket.websocketSend(sendStr)
    },


    setPiPei(idx){
        for(var i = 0; i < this.pipeiArg.length; i++){
            this.pipeiArg[i].active  = (idx == i)
        }
    },

    fixPiPeiTime(t){
        var fen = Math.floor(t/60)
        var miao = t%60

        fen = window.PrefixInteger(fen)
        miao = window.PrefixInteger(miao)
        
        this.timeLabel.string = `${fen}:${miao}`
    },


    closePipei(){
        if(this.cancleCallBack){
            this.cancleCallBack()
        }
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
        cc.log("close pi pei")
    },
});
