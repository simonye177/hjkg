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
        gameRuleScrollView:{
            default:null,
            type:cc.ScrollView
        },
        labelRule:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    addAutoI18n(){
        // autoi18n.analysisLanguageData(this.node,'ruleScrollView.view.content.ruleLabel','GameRule');

        autoi18n.analysisLanguageSprite(this.node,'title','titleyxgz');
        this.content = this.gameRuleScrollView.content;
    },

    start () {
        this.addAutoI18n();

        this.setRuleString();
    },

    setRuleString(){
        // this.labelRule.string = autoi18n.languageData.GameRule["ruleScrollView.view.content.ruleLabel"];
        // this.scheduleOnce(()=>{
        //     this.gameRuleScrollView.content.height = this.labelRule.node.height;
        // },0)

        var data = autoi18n.languageData.GameRule;
        this.labelRule.string = "";
        var ___height = 0 ;

        for(let i = 0 ; i < 8 ; ++i){
            var stringNode = cc.instantiate(this.labelRule.node);
            stringNode.getComponent(cc.Label).string = data[i+1];
            stringNode.parent = this.content;
            ___height = ___height + stringNode.height;
        }

        this.scheduleOnce(()=>{
            this.gameRuleScrollView.content.height = ___height;
        },0.1)
    },

    // update (dt) {},
});
