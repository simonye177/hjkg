// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        qiu:{
            type:cc.Node,
            default:null
        },

        liuxing:{
            type:cc.Node,
            default:null
        },

        feidie:{
            type:cc.Node,
            default:null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("..................bgAction:start");
        this.acQiu();
        this.acLiuXing();
        this.acFeiDie();
    },


    acQiu(){
        var node = cc.instantiate(this.qiu);
        node.parent = this.node.parent;
        node.active = true;
        node.x = -600;
        node.y = -100;

        var bezier = [cc.v2(-600,-100),cc.v2(100,150),cc.v2(600,-100)];
        node.runAction(cc.repeatForever(cc.rotateBy(15,360)))
        node.runAction(cc.sequence(
            cc.bezierTo(15, bezier),
            cc.callFunc((rec) => {
                this.acQiu();
                node.destroy();
            })
        ))
    },

    acLiuXing(){
        let arrPosy = [250,0,-250];
        for(let i = 0 ; i < 3 ; i++){
            let delayTime = Math.random() * 3
            this.scheduleOnce(()=>{
                var node = cc.instantiate(this.liuxing);
                node.parent = this.node.parent;
                node.y = arrPosy[i];
                node.active = true;
            },delayTime)
        }
    },


    acFeiDie(){
        var node = cc.instantiate(this.feidie);
        node.parent = this.node.parent;
        node.active = true;
        node.x = -500;
        node.y = 200;

        node.runAction(cc.sequence(
            cc.moveTo(0.8,cc.v2(150,50)),
            cc.delayTime(0.8),
            cc.moveTo(1,cc.v2(500,200)),
            cc.callFunc((rec) => {
                this.acFeiDie();
                node.destroy();
            })
        ))
    },

    // update (dt) {},
});
