cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        // this.content = this.scrollView.content;
        this.content = this.node.getComponent(cc.ScrollView).content
        this.scrollView = this.node.getComponent(cc.ScrollView)
        this.items = []; // 产生的item
        this.totalCount = 0, // 总数量
        this.lastContentPosY = 0; // 检测上下滚动
        this.itemTemplate = null;
        // cc.log("this.this.bufferZone:" , this.bufferZone)
        this.bufferZone = this.scrollView.node.height, // 缓冲区高度
        this.content.on("position-changed", this._updateContentView.bind(this));
        this.scrollView.node.on("scroll-to-bottom",this.srollToBottom,this)
    },

    start(){

    },

    initScrollView(arg){
        arg = arg || {}
        this.itemTemplate = arg.item;
        this.spawnCount = arg.spawnCount;
        this.spacing = arg.spacing;
        this.lblTotalItems = arg.lblTotalItems;
        this.isRead = true;
        this.dataArg = [];
        this.items = []
        this.content.removeAllChildren()
        this._cellHight = this.itemTemplate.height || this.itemTemplate.data.height

        let oneHight = this._cellHight+this.spacing
        this.bufferZone =  oneHight * this.spawnCount - this.scrollView.node.height/2

        if (this.content.getComponent(cc.Layout)) 
            this.content.removeComponent(cc.Layout)
        cc.log(".....................:" ,this.bufferZone )
    },

    addItemToScrollView(data){
        data = data || {}
        this.dataArg.push.apply(this.dataArg,data)
        this.totalCount = this.dataArg.length
        this.initialize()
        // cc.log("this.scrollView.height:" , this.bufferZone)
    },
    
    initialize: function () {
        this.content.height = this.totalCount * (this._cellHight + this.spacing) + this.spacing; // get total content height
        var dsize = this.dataArg.length
        if(this.items.length>=this.spawnCount){
            return
        }

        let maxValue = dsize < this.spawnCount ? dsize : this.spawnCount

    	for (let i = this.items.length; i < maxValue ; ++i) {
            if(!this.items[i]){
                let item = cc.instantiate(this.itemTemplate);
                item.active = true;
                item._name = i;
                this.content.addChild(item);
                item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
                this.updateItem(i,this.dataArg[i],item);
                this.items.push(item);
                // cc.log("------initialize:" , i)
            }
    	}
    },

    getPositionInView: function (item) { // get item position in scrollview's node space
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    _updateContentView: function(dt) {
        // this.updateTimer += dt;
        if(!this.isRead) return;
        // if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        // this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this._cellHight + this.spacing) * items.length;
        let newY = 0;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                newY = items[i].y + offset;
                if (viewPos.y < -buffer && newY < 0) {
                    items[i].y = newY;
                    let itemId = Number(items[i].name) - items.length; // update item id
                    if(itemId<0) {
                        return
                    };
                    this.updateItem(itemId,this.dataArg[itemId],items[i]);
                    items[i]._name = itemId
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                newY = items[i].y - offset;
                if (viewPos.y > buffer &&  newY > - this.content.height) {
                    items[i].y = newY;
                    let itemIds = Number(items[i].name) + items.length
                    if(Number(itemIds)>Number(this.dataArg.length-1)){
                        return
                    }
                    this.updateItem(itemIds,this.dataArg[itemIds],items[i]);
                    items[i]._name = itemIds
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
        if(this.lblTotalItems){
            this.lblTotalItems.string = "TotalItems: " + this.totalCount;
        }
    },



    // addItem: function( arg ) {
    //     this.content.height = (this.totalCount + 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    //     this.totalCount = this.totalCount + 1;
    // },

    // removeItem: function() {
    //     if (this.totalCount - 1 < 30) {
    //         return;
    //     }

    //     this.content.height = (this.totalCount - 1) * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
    //     this.totalCount = this.totalCount - 1;

    //     this.moveBottomItemToTop();
    // },

    // moveBottomItemToTop () {
    //     let offset = (this.itemTemplate.height + this.spacing) * this.items.length;
    //     let length = this.items.length;
    //     let item = this.getItemAtBottom();

    //     // whether need to move to top
    //     if (item.y + offset < 0) {
    //         item.y = item.y + offset;
    //         let itemComp = item.getComponent('Item');
    //         let itemId = itemComp.itemID - length;
    //         itemComp.updateItem(itemId);
    //     }
    // },

    // getItemAtBottom () {
    //     let item = this.items[0];
    //     for (let i = 1; i < this.items.length; ++i) {
    //         if (item.y > this.items[i].y) {
    //             item = this.items[i];
    //         }
    //     }
    //     return item;
    // },

    scrollToFixedPosition: function () {
        this.scrollView.scrollToOffset(cc.v2(0, 500), 2);
    }
});
