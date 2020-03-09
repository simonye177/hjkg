
cc.Class({
    extends: cc.Component,

    properties: {

        editbox_renshu:{
            default:null,
            type:cc.EditBox
        },

        editbox_shijian:{
            default:null,
            type:cc.EditBox
        },

        editbox_jine:{
            default:null,
            type:cc.EditBox
        },

        editbox_mima:{
            default:null,
            type:cc.EditBox
        },

    },

    addAutoI18n(){
        autoi18n.analysisLanguageData(this.node,'label_password','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'label_renshu','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'label_time','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'label_jine','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxRenshu.label_ren','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxTime.label_fen','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxRenshu.PLACEHOLDER_LABEL','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxTime.PLACEHOLDER_LABEL','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxJine.PLACEHOLDER_LABEL','CreateRoom');
        autoi18n.analysisLanguageData(this.node,'EditBoxMima.PLACEHOLDER_LABEL','CreateRoom');

        autoi18n.analysisLanguageSprite(this.node,'title','titlecjfj');
        autoi18n.analysisLanguageSprite(this.node,'btn_lijijinru','titlecjfj');
    },


    onLoad () {

        this.tipsStr = this.node.getChildByName("label_tips").getComponent(cc.Label)
        this.editbox_jine.node.on('editing-did-ended', this.jineCallback, this);
        this.addAutoI18n();
    },

    jineCallback(editbox){
        var str_jine = this.editbox_jine.getComponent(cc.EditBox).string;
        this.tipsStr.string = autoi18n.languageData.CreateRoom.label_tips + str_jine +"ALSC"
    },

    OnCreateRoom(){
        var str_renshu = this.editbox_renshu.getComponent(cc.EditBox).string;
        var str_shijian = this.editbox_shijian.getComponent(cc.EditBox).string;
        var str_jine = this.editbox_jine.getComponent(cc.EditBox).string;
        var str_mima = this.editbox_mima.getComponent(cc.EditBox).string;

        if(!str_renshu || !str_shijian || !str_jine || str_renshu.trim()=="" || str_shijian.trim()=="" || str_jine.trim()==""){
            ShowTipsLabel(autoi18n.languageData.showText.cjfjtips)
            return
        }

        if(Number(str_renshu)<=1 || Number(str_renshu)>20){
            ShowTipsLabel(autoi18n.languageData.showText.rssrtips)
            return   
        }

        if(Number(str_jine)<10){
            ShowTipsLabel(autoi18n.languageData.showText.jrsrtips)
            return   
        }


        if(Number(str_shijian)<0){
            ShowTipsLabel(autoi18n.languageData.showText.sjsrtips)
            return   
        }
        var sendStr =   {
            cmd: GlobalConfig.CREATE_ROOM,
            maxCount: str_renshu,
            totalTime:str_shijian*60,
            payAmount:str_jine,
            password:str_mima
        }
        cc.vv.webSoket.websocketSend(sendStr)

    },

    onCreatRoom(){
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },

});




