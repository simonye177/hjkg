var HashMap = require("Hashmap")
cc.Class({
    extends: cc.Component,


    init(){
        // 属于当前场景的预制体，切换场景需要释放
        this.nowScenePrefab = new HashMap();
    },

    // callback为空， 只做单纯的加载
    add(pNmae,callback){
        cc.log("PrefabMgr add --",pNmae)

        var prefabPool = this.nowScenePrefab.get(pNmae);

        if(prefabPool){

            return callback(cc.instantiate(prefabPool));
        }


        // cc.log("add----- new")

        var self = this
        cc.loader.loadRes(pNmae, cc.Prefab,function (err, data) {
            var prefabInstance = cc.instantiate(data);


            
            if(callback){
                self.nowScenePrefab.set(pNmae, data)
                callback(prefabInstance)
            }else{

                self.nowScenePrefab.set(pNmae, data)
            }
            
        });
    },

    // 初始化加载
    loadRes(pNmae, callback){
        var self = this
        cc.loader.loadRes(pNmae, cc.Prefab,function (err, data) {
            var prefabInstance = cc.instantiate(data);

    
            
            callback(prefabInstance);
            self.nowScenePrefab.set(pNmae, data)
            
        });
    },

    // 获取预制体对象
    get(pNmae){
        var prefabPool = this.nowScenePrefab.get(pNmae);
       
        return cc.instantiate(prefabPool);
    },

    // 回收到对象池
    remove(pNmae, prefabObj){
       
    },

    clear(){
        var prefabKeys = this.nowScenePrefab.keys();
        cc.log("--------------prefabKeys",prefabKeys)
        for (var i = 0; i < prefabKeys.length; i++) {
            var prefabKey = prefabKeys[i];
            // 清预制体
            var deps = cc.loader.getDependsRecursively(prefabKey);
            cc.loader.release(deps);
        }
        // 清hashmap
        this.nowScenePrefab.clear();
    }

});
