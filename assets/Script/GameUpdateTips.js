// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView:{
            default:null,
            type:cc.ScrollView
        },
        labelTitle:{
            default:null,
            type:cc.Label
        },

        labelTips:{
            default:null,
            type:cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    setData(data){
        data = data || {};
        let lang = window.autoi18n.lang;
        let title = data.title || "";
        let tipstr = data.content || "";
        if(lang != "ZH"){
            title = data.title || "";
            tipstr = data.content || "";
        }
        this.labelTitle.string = "- " + title + " -";
        this.labelTips.string = tipstr;


        this.scheduleOnce(()=>{
            this.scrollView.content.height = this.labelTips.height;
        },0.1)
    },

    onCloseLayer(){
        window.playEff("button");
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },


    // update (dt) {},
});
