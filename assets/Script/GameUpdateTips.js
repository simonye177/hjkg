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
        // data = {
        //     title:"公告",
        //     content:"阿斯顿发大开杀戒法看电视剧福利卡法拉速度快打瞌\n睡来激发凉快圣诞节福利法拉速度快打瞌\n睡来激发凉快圣法拉速度快打瞌\n睡来激发凉快圣诞节福利法拉速度快打瞌\n睡来激发凉法拉速度快打瞌\n睡来激发凉快圣诞节福利法拉速度快打瞌\n睡来激发凉快圣诞节福利快圣诞节福利诞节福利法拉速度快打瞌\n睡来激发凉快圣诞节福利接收到立刻就发\n了山东矿机弗拉开始冻结福利卡接收到了分开讲案例卡死的积分卡\n拉见识到了卡房间阿里斯顿会计法拉速度快打瞌\n睡来激发凉快圣诞节福利卡世纪东方立卡坚实的法律卡视角奥克斯来得及福利卡圣诞节福利卡接收到了开发拉克丝都解封卢卡斯剪短发可适当减肥啦"
        // }
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
            this.scrollView.content.height = this.labelTips.node.height;
            cc.log("..............xxxxxxxxxx:" , this.scrollView.content.height)
        },0.1)
        
    },

    onCloseLayer(){
        window.playEff("button");
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },


    // update (dt) {},
});
