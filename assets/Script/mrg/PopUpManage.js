cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.popArry = []

        //屏蔽下层监听
        // this.blockInputLayer()

        this.zIndex = 0

    },

    start () {
        // this.node.y = cc.winSize.height/2
        // this.node.x = cc.winSize.width/2
    },

    //屏蔽下层监听
    blockInputLayer(zIndex) {
        var zindex = zIndex?zIndex:-1
        var block = this.node.getChildByName("block")
        var size = cc.winSize//cc.view.getFrameSize();
        if (block) {
            block.setContentSize(size.width, size.height)
            // var spos = this.node.convertToNodeSpaceAR(cc.v2(cc.winSize.width/2, cc.winSize.height/2))
            // block.setPosition(spos)
            block.opacity = 128
            block.zIndex = zindex
            block.active = true
        }
    },

    setBlockLayerColor() {

    },

    //获取窗口下标index
    arryContainIndex(view) {
        var index = -1
        var len = this.popArry.length;
        for (var i = 0; i <len; i++) {
            if (this.popArry[i].view == view) {
                index = i
                break
            } 
        }
        return index
    },

    //通过view节点移除
    removeView(view) {
        var index = this.arryContainIndex(view)
        if (index > -1) {
            cc.log("removeView" + view.getName())
            this.popArry.splice(index,1)
        }
    },
    //通过下标移除
    removeViewByIndex(index) {
        var len = this.popArry.length;
        for (var i = 0; i <len; i++) {
            if (i == index) {
                this.popArry.splice(i,1)
                break
            }
        }
    },

    //获取当前显示在最上层的view 没有就返回null
    getHighestShow() {
        var view = null //当前显示在最上层的view
        var compare_ = function (objx, objy) {//比较函数
            var viewx = objx.view
            var viewy = objy.view
            if (viewx.zIndex > viewy.zIndex) {
                return -1;
            } else if (viewx.zIndex < viewx.zIndex) {
                return 1;
            } else {
                return 0;
            }
        }
        //按照zIndex 降序排序 
        this.popArry.sort(compare_)

        var len = this.popArry.length
        for (let index = 0; index < len; index++) {
            var view_ = this.popArry[index].view
            if (view_.active) {
                view = view_
                break
            }
        }
        return view
    },

    //获取当前正在显示的弹框数组
    getCurrShow() {

    },

    //获取当前正在显示的弹框个数
    getCurrShowCount() {

    },

    //全部重新设置弹框的zIndex
    resetAllShowzIndex() {
        var compare_ = function (objx, objy) {//比较函数
            var viewx = objx.view
            var viewy = objy.view
            if (viewx.zIndex < viewy.zIndex) {
                return -1;
            } else if (viewx.zIndex > viewx.zIndex) {
                return 1;
            } else {
                return 0;
            }
        }
        //按照zIndex 升序排序 
        this.popArry.sort(compare_)
        var zindex = 0
        var len = this.popArry.length
        for (let index = 0; index < len; index++) {
            var view_ = this.popArry[index].view
            if (view_.active) {
                zindex = zindex + 1
                view_.zIndex = zindex
            } else {
                view_.zIndex = 0
            }
        }
        this.zIndex = zindex  //重置zIndex
    },

    //考虑h5性能， 使用显示隐藏方式
    show(view, pos, callback) {
        // pos = !pos ? cc.v2(cc.winSize.width/2,cc.winSize.height/2) : pos
        pos = pos || cc.v2(0,0)
        if (view) {  

            if (this.arryContainIndex(view)==-1) {//遍历数组, 如果没有就添加， 有就显示
                var obj = new Object();
                obj.view = view
                // obj.pos = pos
                this.popArry.push(obj)
                this.node.addChild(view)
            }

            view.active = true
            //放大、慢慢出现动画
            // var spos = view.getParent().convertToNodeSpaceAR(cc.v2(pos.x, pos.y))
            view.stopAction()
            // view.setPosition(spos)
            var _scale = view.scale
            view.scale = 0.1
            var time = 0.4
            // var frameSize = cc.view.getFrameSize()
            var designSize = cc.view.getDesignResolutionSize()
            var winSize = cc.winSize
            if (winSize.width == designSize.width) {    //适配宽
                var scale = winSize.height / designSize.height 
                if (scale< 1) {
                    _scale = _scale*scale
                }
            } else {    //适配高
                var scale = winSize.width / designSize.width 
                if (scale< 1) {
                    _scale = _scale*scale
                }
            }
            var seq = cc.sequence(
                    cc.spawn(cc.moveTo(time, pos.x, pos.y), cc.scaleTo(time, _scale, _scale).easing(cc.easeBackOut())),
                    cc.callFunc(function (rec) {
                        if (callback) {
                            callback()
                        }
                    })
                    );
            view.runAction(seq)
            this.zIndex = this.zIndex + 2
            if (this.zIndex > 1000) {   //防止zIndex太大而出现bug
                this.resetAllShowzIndex()
            }
            view.zIndex = this.zIndex
            this.blockInputLayer(this.zIndex-1) 
        }
    },

    //view:需要隐藏的对象 remove:是否删除
    hide(view, remove, callback,resUrl, perfab) {
        if (!view) {
            cc.log("hide对象不存在")
            return
        }

        if (remove==true) {
           this.removeView(view)  //移除数组中的view
           // if(resUrl){
           //      cc.vv.PrefabMgr.remove(resUrl, perfab);
           // }else{
                view.removeFromParent()  //移除view节点
           // }
            // view.destroy()
        } else {
            view.active = false
        }

        //判断还有没有显示的弹窗， 如果显示就将遮罩下移
        var block = this.node.getChildByName("block")
        var view_ = this.getHighestShow()
        if (view_) {
            block.zIndex = view_.zIndex-1
        } else {
            block.active =false
        }
    },

    hideAll() {
        var len = this.popArry.length;
        for (var index = 0; index <len; index++) {
            this.popArry[index].view.removeFromParent()
        }
        this.popArry = []
    },
})