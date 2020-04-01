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

        ren:{
            type:cc.Node,
            default:null
        },

        huojian:{
            type:cc.Node,
            default:null
        },

        pingxingArr:{
            type:[cc.Node],
            default:[]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("..................bgAction:start");
        //this.acQiu();
        this.acLiuXing();
        this.acFeiDie();
        this.renAc();
        // this.huojianAc();


        this.pingxingArr =  this.pingxingArr || {}

        var createPingxing = ()=>{
            let index = Math.floor(Math.random() * 6);
            // cc.log("..................createPingxing.....idx:" , index)
            let time = 5 + Math.random() * 15
            if(this.pingxingArr[index]){
                this.scheduleOnce(()=>{
                    this.pingxingMove(this.pingxingArr[index])
                    createPingxing();
                },time)
            }
        }

        createPingxing();
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
        // var node = cc.instantiate(this.feidie);
        // node.parent = this.node.parent;
        // node.active = true;
        // node.x = -650;
        // node.y = Math.random()*400-200;
        // var time = 40 + Math.random()*20;
        // node.runAction(cc.sequence(
        //     cc.delayTime(Math.random()*5),
        //     this.bsa(time,cc.v2(node.x , node.y),cc.v2(node.x + 1300 , node.y),200,60),
        //     cc.delayTime(Math.random()*5),
        //     cc.callFunc((rec) => {
        //         this.acFeiDie();
        //         node.destroy();
        //     })
        // ))


        cc.log("...........feidie")
        var node = cc.instantiate(this.feidie);
        node.parent = this.node.parent;
        node.active = true;
        node.x = -650;
        node.y = Math.random()*400-200;

        var ___x = 0;
        var __times = 0;
        var __count = 0;

        var __action = ()=>{
            __count = __count + 1;
            __times = __times + 1;
            ___x = ___x + w;
            var __zf = __count % 2 == 0 ? 1 : -1;

            var w = 80 + 100 * Math.random();
            var h = 80 + 150 * Math.random() * __zf;
            var speed = 50;
            var endPos = cc.v2(node.x + w,node.y+h);
            var time = distanceWin(cc.v2(node.x,node.y) , endPos) / speed;
            // cc.log(".................time:" , time , endPos)
            node.runAction(cc.sequence(
                cc.moveBy(time , cc.v2(w,h)),
                cc.callFunc((rec) => {
                    __action();
                    if(___x > 1300){
                        this.acFeiDie();
                        node.destroy();
                        return
                    }
                })
            ))
        }
        __action();
    },


    huojianAc(){
        var node = cc.instantiate(this.huojian);
        node.parent = this.node.parent;
        node.active = true;
        node.x = 500;
        node.y = Math.random()*800-400;
        var time = 30 + Math.random()*15;
        node.runAction(cc.sequence(
            cc.delayTime(Math.random()*5),
            cc.moveBy(time,cc.v2(-1000,Math.random()*500)),
            cc.delayTime(Math.random()*5),
            cc.callFunc((rec) => {
                this.huojianAc();
                node.destroy();
            })
        ))
    },


    pingxingMove(node){
        var node = cc.instantiate(node);
        node.parent = this.node.parent;
        node.active = true;
        var isLeft = Math.random()>0.5
        node.x =  isLeft ? -500 : 500;
        var constX = isLeft ? 1000 : -1000;
        node.y = Math.random()*800-400;
        var time = 30 + Math.random()*15;
        node.runAction(cc.sequence(
            cc.moveTo( time , cc.v2(node.x+constX,node.y)),
            cc.callFunc((rec) => {
                node.destroy();
            })
        ))
    },


    renAc(){
    //     var node = cc.instantiate(this.ren);
    //     node.parent = this.node.parent;
    //     node.active = true;
    //     node.x = -500;
    //     node.y = Math.random()*800-400;

    //     var time = 30 + Math.random()*15;
    //     node.runAction(cc.sequence(
    //         cc.delayTime(Math.random()*5),
    //         cc.moveBy(time,cc.v2(1000,Math.random()*500)),
    //         cc.delayTime(Math.random()*5),
    //         cc.callFunc((rec) => {
    //             this.renAc();
    //             node.destroy();
    //         })
    //     ))

        var node = cc.instantiate(this.ren);
        node.parent = this.node.parent;
        node.active = true;
        node.x = Math.random()*500-350;
        node.y = Math.random()*800-400;
        var constIter = 80;
        var time = 5;
        let PointArr = [cc.v2(0,constIter),cc.v2(constIter,0),cc.v2(0,-constIter),cc.v2(-constIter,0)];


        node.runAction(cc.repeatForever(cc.sequence(
            cc.moveBy(time,PointArr[0]).easing(cc.easeOut(3.0)),
            cc.moveBy(time,PointArr[1]).easing(cc.easeOut(3.0)),
            cc.moveBy(time,PointArr[2]).easing(cc.easeOut(3.0)),
            cc.moveBy(time,PointArr[3]).easing(cc.easeOut(3.0)),
            // cc.callFunc((rec) => {
            //     this.renAc();
            //     node.destroy();
            // })
        )))
    },
});
