// 所有场景的父类
var AppScene = cc.Class({
    extends: cc.Component,

    properties: {
        
        // },
    },

    //子类需要实现这个方法
    initScene(sceneName){
        cc.vv.nowRunScene = this; //单例

        cc.vv.GAME_HIDE = false;//进入后台

        cc.game.on(cc.game.EVENT_HIDE, function(){
            this.hideGameTime = Date.parse(new Date());
            console.log("游戏进入后台 ",this.hideGameTime);
            cc.vv.GAME_HIDE = true;
            // MusicManage.stopAllEffects()
        },this);

        
        
        // this.scheduleOnce(()=>{
        //     cc.log(".............test exit:")
        //     window.alscOnAndroidKeyBack();
        // },3)


        cc.game.on(cc.game.EVENT_SHOW, function(){
            // MusicManage.resumeAllEffects()
            //处理游戏切回前台时的事件
            var backGameTime = Date.parse(new Date());
            console.log("重新返回游戏---",backGameTime)
            // 客户端只多处理5秒内的事件
            cc.vv.GAME_HIDE = false;
            if(cc.vv.webSoket){
                cc.vv.webSoket.closeSoket(); 
            }
            
            if((backGameTime-this.hideGameTime)/1000 >=10){
                // this.backApp()
            }else{
                // if(cc.vv.webSoket){
                //     cc.log("处理丢失数据--------")
                //     cc.vv.webSoket.doMessageList.call(this)
                // }
            }

        },this);
    },

    backApp(){
        // window.alsc.finish()
    },

    // 处理消息事件堆栈
    doMessageList(){

    },

    // 加载
    loadSprite(res, callback){
        if(!this.spriteFrameList){
            this.spriteFrameList = [];
        }

        this.spriteFrameList.push(res);
        cc.loader.loadRes(res, cc.SpriteFrame, callback);
    },

    // 释放
    releaseSpriteFrame(){
        if(this.spriteFrameList){
            for (var i = 0; i < this.spriteFrameList.length; i++) {
                cc.loader.releaseRes(this.spriteFrameList[i],cc.SpriteFrame);
            }

            this.spriteFrameList = null;
        }
    },

    // 加载合图集
    loadSpriteAtlas(res, callback){
        if(!this.spriteAtlasList){
            this.spriteAtlasList = [];
        }

        this.spriteAtlasList.push(res);
        cc.loader.loadRes(res, cc.SpriteAtlas, callback);
    },

    // 释放合图集
    releaseSpriteAtlas(){
        if(this.spriteAtlasList){
            for (var i = 0; i < this.spriteAtlasList.length; i++) {
                cc.loader.releaseRes(this.spriteAtlasList[i],cc.SpriteAtlas);
            }

            this.spriteAtlasList = null;
        }
    },

    // 加载spine资源
    loadSkeleton(res, callback){
        if(!this.skeletonDataList){
            this.skeletonDataList = [];
        }

        if (this.skeletonDataList.indexOf(res) === -1) {
            this.skeletonDataList.push(res);
        }
        cc.loader.loadRes(res, sp.SkeletonData, callback);
    },

    // 释放spine动画资源
    releaseSkeletonFrame(){
        // cc.log("releaseSkeletonFrame---")
        if(this.skeletonDataList){
            for (var i = 0; i < this.skeletonDataList.length; i++) {
                var sk = cc.loader.getRes(this.skeletonDataList[i], sp.SkeletonData)
                var dep = cc.loader.getDependsRecursively(sk);
                // cc.log(dep)
                cc.loader.release(dep);
                cc.loader.releaseRes(this.skeletonDataList[i], sp.SkeletonData);
            }

            this.skeletonDataList = null;
        }
    },

    //加载龙骨Asset
    loadDragonAsset(res, callback){
        if(!this.dragonAssetDataList){
            this.dragonAssetDataList = [];
        }
    
        if (this.dragonAssetDataList.indexOf(res) === -1) {
            this.dragonAssetDataList.push(res);
        }
        cc.loader.loadRes(res, dragonBones.DragonBonesAsset, callback)
    },

    //加载龙骨AtlasAsset
    loadDragonAtlasAsset(res, callback){
        if(!this.dragonAtlasAssetDataList){
            this.dragonAtlasAssetDataList = [];
        }
      
        if (this.dragonAtlasAssetDataList.indexOf(res) === -1) {
            this.dragonAtlasAssetDataList.push(res);
        }
        cc.loader.loadRes(res, dragonBones.DragonBonesAtlasAsset, callback)
    },

    //释放龙骨资源
    releaseDragonFrame() {
        if(this.dragonAssetDataList){
            for (var i = 0; i < this.dragonAssetDataList.length; i++) {
                // let res1 = cc.loader.getRes(this.dragonAssetDataList[i], dragonBones.DragonBonesAsset);
                cc.loader.releaseRes(this.dragonAssetDataList[i], dragonBones.DragonBonesAsset);
                // let res2 = cc.loader.getRes(this.dragonAssetDataList[i], dragonBones.DragonBonesAsset);
                // cc.log('DragonBonesAsset: ',res1, res2)
            }

            this.dragonAssetDataList = null;
        }

        if(this.dragonAtlasAssetDataList){
            for (var i = 0; i < this.dragonAtlasAssetDataList.length; i++) {
                // let res1 = cc.loader.getRes(this.dragonAtlasAssetDataList[i], dragonBones.DragonBonesAtlasAsset);
                cc.loader.releaseRes(this.dragonAtlasAssetDataList[i], dragonBones.DragonBonesAtlasAsset);
                // let res2 = cc.loader.getRes(this.dragonAtlasAssetDataList[i], dragonBones.DragonBonesAtlasAsset);
                // cc.log('DragonBonesAtlasAsset:', res1, res2)
            }

            this.dragonAtlasAssetDataList = null;
        }
    },

    onDestroy(){
        if(this.destroyTo){
            this.destroyTo();
        }
        cc.vv.nowRunScene = null;
        // cc.vv.PrefabMgr.clear();

        // cc.vv.musicManage.releaseClip();

        // this.releaseSpriteFrame();
        // this.releaseSpriteAtlas();
        // this.releaseSkeletonFrame();
        // this.releaseDragonFrame()

        // cc.sys.garbageCollect();
        cc.log("onDestroy--释放资源")
    }
});
