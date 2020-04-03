
cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start () {

    },

        /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        // console.log('.....................on collision enter..............other:' , other);
        cc.log("---碰撞了---:" , other.tag)
        if(other.tag == 1){
            // cc.log("peng dao le qiang bi")
            cc.vv.eventMgr.emit(GlobalConfig.PENGZHUANG_WALL, null);
            return
        }else if(other.tag ==2){
            var id = other.node.getComponent("Mineral").getID();
            var isgold = other.node.getComponent("Mineral").getIsJinse();
            var iconId = other.node.getComponent("Mineral").getIconID();
            if(id==0){
                return
            }
            other.node.removeFromParent()
            cc.vv.eventMgr.emit(GlobalConfig.PENGZHUANG_GOLD, {id:id,isgold:isgold,iconId:iconId});
            // cc.log("peng dao le kuangshi")

            var manager = cc.director.getCollisionManager();
            manager.enabled = false;
        }



        // 碰撞系统会计算出碰撞组件在世界坐标系下的相关的值，并放到 world 这个属性里面
        var world = self.world;

        var otherWorld = other.word;

        // 碰撞组件的 aabb 碰撞框
        var aabb = world.aabb;

        // 节点碰撞前上一帧 aabb 碰撞框的位置
        var preAabb = world.preAabb;

        // 碰撞框的世界矩阵
        var t = world.transform;

        // 以下属性为圆形碰撞组件特有属性
        var r = world.radius;
        var p = world.position;

        // 以下属性为 矩形 和 多边形 碰撞组件特有属性
        var ps = world.points;
    },

    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        console.log('on collision stay');
    },

    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        console.log('on collision exit');
    }


});
