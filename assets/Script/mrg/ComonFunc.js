
//弹窗
window.PopUpManage = function() {
    var PopUpManage = cc.director.getScene().getChildByName("Canvas").getChildByName("node_popUp")
    PopUpManage.zIndex = 1000
    return PopUpManage
},



window.PrefixInteger = function (num, length) {
    length = length || 2
    return (Array(length).join('0') + num).slice(-length);
},


window.subSTotring = function (str, leng) {
    str = "" + str
    leng = leng || 8
    if (str.length > leng) {
        return str.substring(0, leng) + "..."
    }
    else {
        return str
    }
},

window.sendHeart = function(){
    var sendStr =   {
        cmd: GlobalConfig.HEART_PACK,
        time:(new Date()).valueOf()
    }
    cc.vv.webSoket.websocketSend(sendStr)
},

window.getHeadRes = function(url,callback){
    cc.loader.load(url, function (err, tex) {
        if( err ){
            cc.error(err);
        }else{
            var spriteFrame = new cc.SpriteFrame(tex);
            if( spriteFrame ){
                callback(spriteFrame);
            }
        }
    });

},

//合并user的内容
window.mergeUsers=function( users ,userStore ){
    for(let i = 0 ; i<users.length ; ++i){
        if(!users[i]){
            break
        }
        users[i].userStore = {score:0,ready:false}
        for(let j = 0 ; j <userStore.length;++j){
            if(users[i].userId == userStore[j].userId){
                users[i].userStore = userStore[j]
                break
            }
        }
    }
    return users
},

window.joinGame = function(data,isrecover){
    cc.vv.gameData.setCurRoomInfo(data)
    cc.vv.gameData.setIsRecoverJoinRoom(isrecover)
    cc.director.loadScene("game")
},

window.exitGame = function( isrecover ){
    cc.vv.gameData.setBackInfo(isrecover)
    cc.vv.gameData.cleanRoomInfo()
    cc.director.loadScene("hall")
},


window.distanceWin = function(pos,pos2){
    var distance = Math.sqrt(Math.pow(pos.x - pos2.x, 2) + Math.pow(pos.y - pos2.y, 2));
    return distance
},


//显示文本提示
window.tipsObjList = [];
window.ShowTipsLabel = function (str, pos) {
    cc.vv.PrefabMgr.add("prefab/showTips", function (perfabInstance) {
        var newNode = perfabInstance;
        var parentNode = cc.director.getScene().getChildByName("Canvas")
        parentNode.addChild(newNode, GlobalConfig.tipsZidx - window.tipsObjList.length);


        var tipsBg = newNode.getChildByName("tipsBg")
        var tipsLabel = tipsBg.getChildByName("tipsLabel")
        tipsLabel.getComponent(cc.Label).string = str

        tipsBg.opacity = 255
        tipsBg.setPosition(cc.v2(0, 0))

        if (pos) {
            tipsBg.setPosition(pos)
        }

        var removeFromList = function (obj) {
            for (var i = 0; i < window.tipsObjList.length; i++) {
                if (window.tipsObjList[i].idx == obj.idx) {
                    window.tipsObjList.splice(i, 1)
                    break
                }
            }
        }


        if (window.tipsObjList.length > 0) {
            for (var i = 0; i < window.tipsObjList.length; i++) {
                let act = cc.moveBy(0.3, cc.v2(0, 50))
                window.tipsObjList[i].runAction(act)
            }
        }




        tipsBg.idx = window.tipsObjList.length
        window.tipsObjList.push(tipsBg)
        // window.playEff("tips")
        tipsBg.runAction(cc.sequence(
            cc.scaleTo(0.1, 0.9),
            cc.scaleTo(0.1, 1),
            cc.delayTime(2),
            cc.fadeOut(0.5),
            cc.callFunc(function (rec) {
                removeFromList(tipsBg)
                // cc.vv.PrefabMgr.remove("prefab/showTips",newNode);
                newNode.removeFromParent()
            })
        ))
    });
}




window.httpGet = function(url,reqData,callback){
    var self = this;
    url += "?";
    for(var item in reqData){
        url += item +"=" +reqData[item] +"&";
    }
    // console.log(self.ip + url)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 400){
                var response = xhr.responseText;
                // console.log(response)
                if(response){
                    var responseJson = JSON.parse(response);
                    callback(responseJson);
                }else{
                    console.log("返回数据不存在")
                    callback(false);
                }
            }else{
                console.log("请求失败")
                callback(false);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
},

window.httpPost = function (url, reqData, callback) {
    var self = this;
    // console.log(url)
    // console.log(reqData)
    //1.拼接请求参数
    var param = "";
    for(var item in reqData){
        param += item + "=" + reqData[item] + "&";
    }

    cc.log("posparam:" , param)

    //2.发起请求
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 400){
                var response = xhr.responseText;
                // console.log(response)
                if(response){
                    var responseJson = JSON.parse(response);
                    callback(responseJson);
                }else{
                    console.log("返回数据不存在")
                    callback(false);
                }
            }else{
                console.log("post请求失败")
                callback(false);
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");  
    xhr.send(param);//reqData为字符串形式： "key=value"

}

window.deepClone = function(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}   