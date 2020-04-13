
cc.Class({
    extends: cc.Component,

    properties: {

    },

    addAutoI18n(){
        autoi18n.analysisLanguageSprite(this.node,'zhunbei','yizhunbeiz');
    },

    onLoad () {
        this.headIcon = this.node.getChildByName("headicon")
        this.isReady = this.node.getChildByName("zhunbei")
        this.name = this.node.getChildByName("name").getComponent(cc.Label)
        this.money = this.node.getChildByName("money").getComponent(cc.Label)
        this.defenNum = this.node.getChildByName("defenNum").getComponent(cc.Label)
        this.time = this.node.getChildByName("time").getComponent(cc.Label)
        this.addAutoI18n();
    },

    initUI(data , _size , isIinit){
        data = data || {}
        this._size = _size+1;
        data.userStore = data.userStore || {}
        this.name.string = window.subSTotring(data.nickName);
        this.setIsReady(data.userStore.ready)
        this.setUserScore(data.userStore.score)
        this.setUserAlsc(data.userStore.balance)
        this.updateTime(data.userStore.fen || 0)
        window.getHeadRes(data.avatarUrl, (sp)=>{
            if(this.headIcon){
                this.headIcon.getComponent(cc.Sprite).spriteFrame = sp;
                this.headIcon.height = 200;
                this.headIcon.width = 200;
            }
        })
        if(isIinit){
            this.initRank()
        }
    },

    //设置排名
    setUserScore(score){
        // this.defenNum.string = score || 0
    },

    updateRank(rank){
        this.defenNum.string = rank || 1;
        this.updateUI(rank)
    },

    updateTime(_time){
        this.time.node.active = true;
        this.time.string = _time + " ms";
    },

    updateUI(rank){
        let _size = this._size;
        if(!rank)return;
        if(!_size)return;
        this.node.getChildByName("di1").active = rank==1;
        this.node.getChildByName("di2").active = rank==2;
        this.node.getChildByName("di3").active = rank>2 && _size == rank;
        this.node.getChildByName("di").active = rank>2 && _size != rank;

        this.node.getChildByName("rank1").active = rank==1;
        this.node.getChildByName("rank2").active = rank==2;
        this.node.getChildByName("rank3").active = rank>2 && _size == rank;
        this.node.getChildByName("defen").active = rank>2 && _size != rank;
        this.node.getChildByName("defenNum").active = rank>2 && _size != rank;
        
    },

    initRank(){
        this.node.getChildByName("di").active = true;
        this.node.getChildByName("di1").active = false;
        this.node.getChildByName("di2").active = false;
        this.node.getChildByName("di3").active = false;

        this.node.getChildByName("rank1").active = false;
        this.node.getChildByName("rank2").active = false;
        this.node.getChildByName("rank3").active = false;
        this.node.getChildByName("defen").active = false;
        this.node.getChildByName("defenNum").active = false;
    },

    setTime(){

    },

    setUserAlsc(alsc){
        this.money.string = Number(alsc).toFixed(2) || 0
    },

    setIsReady(isReady){
        isReady = isReady || false
        this.isReady.active = isReady
    },

});
