// 游戏用的公共父类
cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(){
        this.soketState = 0;  //0 未连接  1：连接  2：关闭
        this.isJihao = false; //是否被挤号了
    },

    getSoketState(){
        return this.soketState
    },

    setIsJiHao(jh){
        this.isJihao = jh;
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
                if(this.isJihao){
                    return
                }
                ShowTipsLabel(autoi18n.languageData.showText.wldktips)
                cc.vv.eventMgr.emit(GlobalConfig.SOKET_CLOSE);
            },0.5)
        }


        this.websock.onmessage = function (e) {
            // cc.log("onmessage----------:" ,e)
            var s_data = JSON.parse(e.data) 
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
});
