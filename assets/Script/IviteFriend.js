
cc.Class({
    extends: cc.Component,

    properties: {

        playerListItem:{
            default:null,
            type:cc.Node
        },

        playerListScrollView: {
            default: null,
            type: cc.ScrollView
        },

    },

    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.node,'bg.title','titleyqhy');
        autoi18n.analysisLanguageSprite(this.node,'qanxuan','quanxuan');
        autoi18n.analysisLanguageSprite(this.node,'lijiyaoqing','lijiyaoqing');

        autoi18n.analysisLanguageSprite(this.node,'InvitePlayerItem.youxizhong','youxizhong');
        autoi18n.analysisLanguageSprite(this.node,'InvitePlayerItem.kongxian','kongxian');

    },

    onLoad () {

        this.ItemArg = []

        this.playerListScrollViewContent = this.playerListScrollView.content;

        this.getList();
        // this.addPlayerListCell();

        this.addAutoI18n()
    },


    setMyInfo(info , roomId){
        this.myInfo = info
        this.roomId = roomId
    },


    getList(){
        let url = GlobalConfig.GetFriendListUrl;
        let arg = { Authorization : GlobalConfig.token }
        window.httpGet(url, arg,(ret)=>{
            cc.log("getList:" , ret)
            if(ret && ret.code == 200){
                if(ret.result && ret.result.length>0){
                    this.addPlayerListCell(ret.result)
                }else{
                    ShowTipsLabel(autoi18n.languageData.showText.myhytips)
                }
            }else{
                ShowTipsLabel(ret.msg || autoi18n.languageData.showText.hqhylbtips)
            }
        })
    },

    posFriend(idsArg,url,type){
        let jsonObj = { contactIds : idsArg ,
            msg:{
                cmd:3020 , 
                extend1:autoi18n.languageData.inviteText.sdyqxx,
                roomId:this.roomId,
                nickName:this.myInfo.nickName,
                avatarUrl:this.myInfo.avatarUrl,
            }
        }

        let xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        xhr.open("POST", url, true);

        xhr.setRequestHeader("Authorization", GlobalConfig.token);
        xhr.onerror = function (res) {
            console.log("onerror");
        }

        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 400){
                    var response = xhr.responseText;
                    // console.log(response)
                    // if(response){
                    //     var responseJson = JSON.parse(response);
                    //     cc.log("================ssss=:" ,responseJson )
                    // }else{
                    //     console.log("返回数据不存在")
                    // }
                    if(type==1){
                        ShowTipsLabel(autoi18n.languageData.showText.fsyqxxsustips)
                    }
                    cc.log("..................发送邀请成功:" , url)
                    this.onCloseLayer()
                }else{
                    // console.log("post请求失败")
                }
            }
        };

        let data = JSON.stringify(jsonObj)
        cc.log("dddddddddddddd:" , data)
        // 发送 obj  若发送 JSON str 则头部信息设为：
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xhr.send(data);
    },
    
    addPlayerListCell(ret){

        if(!ret || ret.length <= 0){
            return
        }
        this.playerListScrollViewContent.removeAllChildren();

        this.playerListScrollViewContent.height = this.playerListItem.height * ret.length

        for (var i = 0; i < ret.length; i++) {
            var newPcell = cc.instantiate(this.playerListItem)
            newPcell.x = 0;
            newPcell._name = ret[i].contactId;
            newPcell.active = true
            this.playerListScrollViewContent.addChild(newPcell)
            newPcell.getComponent("InvitePlayerItem").initItemUI(ret[i])
            this.ItemArg.push(newPcell)
        }


        // cc.log("......................sdfasdfasdfasd:" , this.ItemArg.length)

    },

    onCloseLayer(){
        window.playEff("button");
        var cPopUpManage = PopUpManage().getComponent("PopUpManage");
        cPopUpManage.hide(this.node, true)
    },


    quanxuanBtn(){
        window.playEff("button");
        cc.log("this.ItemArg......length:" , this.ItemArg.length)
        for(var i = 0 ;  i< this.ItemArg.length ; i++){
            this.ItemArg[i].getComponent("InvitePlayerItem").setIsChoose(true)
        }
    },

    lijiyaoqingbtn(){
        window.playEff("button");
        let argUid = []
        for(var i = 0 ;  i< this.ItemArg.length ; i++){
            var ischoose = this.ItemArg[i].getComponent("InvitePlayerItem").getIsChoose()
            if(ischoose){
                argUid[argUid.length] = this.ItemArg[i]._name;
            }
        }

        if(argUid.length){
            this.posFriend(argUid,GlobalConfig.PostInviteFriendUrl,1);
            this.posFriend(argUid,GlobalConfig.PostInviteFriendUrlGame,2);
        }else{
            ShowTipsLabel(autoi18n.languageData.showText.xzyqhytips)
        }
    },


});
