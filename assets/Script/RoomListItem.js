
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.roomId = 0;

        this.fangzhuLabel = this.node.getChildByName("headicondi").getChildByName("l_fangzhu").getComponent(cc.Label)
        this.headIcon = this.node.getChildByName("headicondi").getChildByName("iconMask").getChildByName("icon")
        this.fangzhuName = this.node.getChildByName("headicondi").getChildByName("l_name").getComponent(cc.Label)
        this.gongkaifang = this.node.getChildByName("roomType_1")
        this.mimafang = this.node.getChildByName("roomType_2")
        this.wanjiashu = this.node.getChildByName("i_wanjia_n").getComponent(cc.Label)
        this.danzhushu = this.node.getChildByName("i_danzhu_n").getComponent(cc.Label)
        this.fanghao = this.node.getChildByName("i_fanghao_n").getComponent(cc.Label)
        this.fangzhuLabel._isBold = true
    },

    setState(state){
        var color = new cc.color(255,207,58,255);
        var strState = autoi18n.languageData.showText.zhunbeizhong;
        if(state==3){
            strState = autoi18n.languageData.showText.youxizhong;
            // color = new cc.color(193,209,255,255);
        }
        this.fangzhuLabel.node.color = color;
        this.fangzhuLabel.string = strState;
    },

    start () {
        // cc.log("roomList item------start-:" , this.gongkaifang)
    },
    /*
        {
            "roomId": "100029",
            "maxCount": 6,
            "status": 1,
            "payAmount": 300,
            "ownerId": "3",
            "owner": {
                "userId": "3",
                "avatarUrl": "/static/images/default_avatar.png",
                "nickName": "用户3",
                "userState": 1,
                "gender": 1
            },
            "roomType": 2,
            "userCount": 0
        }
     */

    roadUI(data){

        this.roomId = data.roomId;
        this.roomType = data.roomType;

        this.setRoomType(data.roomType);
        this.fangzhuName.string = window.subSTotring(data.owner.nickName);
        this.wanjiashu.string = data.userCount + "/" + data.maxCount;
        this.danzhushu.string = data.payAmount
        this.fanghao.string = data.roomId;

        this.setState(data.status);

        window.getHeadRes(data.owner.avatarUrl, (sp)=>{
            // this.headIcon.getComponent(cc.Sprite).spriteFrame = sp
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp;
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
    },


    setJiaRuCallBack(callback){
        this.jiaRuCallBack = callback
    },


    setRoomType(t){
        this.node.getChildByName("roomType_1").active = t == 1
        this.node.getChildByName("roomType_2").active = t == 2
    },

    onLiJiJiaRu(){
        if(this.jiaRuCallBack){
            this.jiaRuCallBack(this.roomId , this.roomType)
        }
    },
});
