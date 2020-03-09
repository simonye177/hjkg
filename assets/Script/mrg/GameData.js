
cc.Class({
    extends: cc.Component,

    onLoad(){
        cc.log("gamdata...........onLoad....")
    },

    start(){
        cc.log("gamdata...........start....")
    },

    initData(){
        this.joinType = 0
        this.cleanRoomInfo();
        this.cleanUserInfo();
    },

    cleanRoomInfo(){
        this.roomInfo = {}
    },

    cleanUserInfo(){
        this.userInfo = {}
    },


    /**

    avatarUrl: "/static/images/default_avatar.png"
​​
    channel: "game"
    ​​
    clientId: "0000000007d000000013"
    ​​
    gender: 1
    ​​
    nickName: "用户3"
    ​​
    userId: "3"
    ​​
    userState: 1

     */

    setUserInfo(arg){
        arg = arg || {}
        this.userInfo.avatarUrl = arg.avatarUrl;
        this.userInfo.gender = arg.gender;
        this.userInfo.nickName = arg.nickName;
        this.userInfo.userId = arg.userId;
        this.userInfo.userState = arg.userState;

        cc.log("gamdata...........setuserInfo....")
    },

    getUserInfo(){
        return this.userInfo
    },

    setBackInfo(b){
        this.backInfo = b
    },

    
    getBackInfo(){
        return this.backInfo
    },


    setCurRoomInfo(arg){
        arg = arg || {}
        this.roomInfo.maxCount = arg.maxCount;
        this.roomInfo.owner = arg.owner;
        this.roomInfo.payAmount = arg.payAmount;
        this.roomInfo.roomId = arg.roomId;
        this.roomInfo.roomType = arg.roomType;
        this.roomInfo.screenItems = arg.screenItems;
        this.roomInfo.timer = arg.timer;
        this.roomInfo.status = arg.status;
        this.roomInfo.userCount = arg.userCount;
        this.roomInfo.userStore = arg.userStore;
        this.roomInfo.users = arg.users;
        this.roomInfo.result = arg;
    },

    getCurRoomInfo(){
        return this.roomInfo
    },


    /*  owner:
    avatarUrl: "/static/images/default_avatar.png"
    ​​​
    channel: "game"
    ​​​
    clientId: "0000000007d000000004"
    ​​​
    gender: 1
    ​​​
    nickName: "用户3"
    ​​​
    userId: "3"
    ​​​
    userState: 1
    */

    getCurRoomCreatorInfo(){
        return this.roomInfo.owner
    },

    //1 創建房間  2 加入房間
    setJoinRoomType(t){
        this.joinType = t
    },

    getJoinRoomType(){
        return this.joinType
    },

    // 是否断线重连
    setIsRecoverJoinRoom(is){
        this.isRecoverJoinRoom = is
    },

    // 是否断线重连
    getIsRecoverJoinRoom(){
        return this.isRecoverJoinRoom
    },

});