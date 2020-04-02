// 游戏用的公共父类
cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(){
        this.soketState = 0;  //0 未连接  1：连接  2：关闭
        this.isJihao = false; //是否被挤号了
        this.isCloseGame = false;//是否是退游戏
    },

    getSoketState(){
        return this.soketState
    },

    setIsJiHao(jh){
        this.isJihao = jh;
    },

    closeSoket(state){
        cc.log("...............close soket.............:" , state);
        this.isCloseGame = state;
        if(this.websock)
            this.websock.close()
    },


    WebSocketConn(urlPar){
        // websockstr2 = cc.URL_http[2]
        
        // cc.log("websockstr---",websockstr)
        // cc.log("WebSocketConn---")
        var websock = new WebSocket(urlPar);
    
        websock.onerror= function(e){
            cc.log("websock.onerror") 
        };
        return websock
    },

    webSocketInit(connStr){
        this.messageList = [];
        var self = this

        this.websock = this.WebSocketConn(connStr);

        this.websock.onopen = function(){
            cc.log("websocket open ---")
            self.soketState = 1;
            cc.vv.eventMgr.emit(GlobalConfig.SOKET_OPEN);
        };

        this.websock.onclose =  function (e) {
            cc.log("websocket onclose--")
            self.soketState = 2;            
            self.scheduleOnce(()=>{
                if(self.isJihao){
                    return
                }
                if(self.isCloseGame){
                    self.isCloseGame = false;
                    cc.log("退出游戏了")
                    if(window.alsc && window.alsc.finish){
                        window.alsc.finish();
                    }
                    return
                }
                ShowTipsLabel(autoi18n.languageData.showText.wldktips)
                cc.vv.eventMgr.emit(GlobalConfig.SOKET_CLOSE);
            },0.5)
        }


        this.websock.onmessage = function (e) {
            // cc.log("onmessage----------:" ,e)
            var s_data = JSON.parse(e.data)
            if(s_data.cmd == GlobalConfig.LOGIN_OUT){
                self.setIsJiHao(true);
                window.showJiHaoTips(()=>{
                    // cc.vv.webSoket.closeSoket(true);
                    cc.log("挤号退出游戏")
                    if(window.alsc && window.alsc.finish){
                        window.alsc.finish();
                    }
                })
                return
            }
            if(cc.vv.GAME_HIDE){
                self.messageList.push(s_data)
            }else{
                // self.websocketMessage(s_data)
                cc.vv.eventMgr.emit(GlobalConfig.GET_SOKET_MSG, s_data);
            }
        }
    },

     /* websochet发送信息 */
    websocketSend(data) {
        data = JSON.stringify(data)
        cc.log("websocketSend-------:" , data)
        this.websock.send(data);
    },

    doMessageList(){
        cc.log("处理断线消息----------",this.messageList)
        if(!this.messageList){
            return
        }
        for (var i = 0; i < this.messageList.length; i++) {
            let s_data = this.messageList[i];
            cc.vv.eventMgr.emit(GlobalConfig.GET_SOKET_MSG, s_data);
        }

        this.messageList = [];
    },

    findKeyIsHave(key){
        var have = false;
        for(let i = 0 ; i < GlobalConfig.wsArg.length ; i++){
            if(key == GlobalConfig.wsArg[i]){
                have = true;
            }
        }
        return have
    },
});
