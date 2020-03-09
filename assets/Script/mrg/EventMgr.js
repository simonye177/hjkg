/**
    观察者模式
*/
var HashMap = require("Hashmap")
cc.Class({
    extends: cc.Component,

    init(){
        this.handlers = new HashMap();
    },

    //类型,绑定事件 
    addHandler:function(event, handler, target) {
        
        // if(this.handlers.get(event)){
        //     return;
        // }

        // if (typeof this.handlers[event] == "undefined") {
        //     this.handlers[event] = [];//每个事件都可以绑定多次
        // }
        
        this.handlers.set(event, handler);

        this.target = target;

        // cc.log("this.handlers[" + event + "]的长度是: " + this.handlers[event].length);
        return handler;
    },

    removeHandler:function(event) {


        // if(null == handler)
        // { 
        //     return;   
        // }
        
        var handler = this.handlers.get(event);
        if(!handler)
        {
            return;
        }
        this.handlers.remove(event);

        // console.log(events);
        // for (var i = 0, len = events.length; i < len; i++) {
        //     if (events[i] == handler) {
        //         // cc.log("------找到要删除的函数了!!!-------");
        //         events.splice(i, 1);
        //         break;
        //     }
        // }

        // cc.log("事件: " + event + "的数量是: " + events.length);
    },

    // arguments emit 函数的参数对象 参数在后面加，args为参数数组
    emit: function (event) {
        // if (this.handlers[event] instanceof Array) {
        //     var handlers = this.handlers[event];
        //     var args = Array.prototype.slice.call(arguments, 1);
        //     for (var i = 0, len = handlers.length; i < len; i++) {
        //         handlers[i].apply(null, args);
        //         //handlers[i].call(null, args);  不能用call调用
        //     }
        // }

        var handler = this.handlers.get(event);
        if(!handler)
        {
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this.target, args);
    },


});