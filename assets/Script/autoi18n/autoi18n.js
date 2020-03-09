
if(!window.autoi18n)window.autoi18n={};

window.autoi18n.languageData={};

window.autoi18n.lang="ZH";

window.autoi18n.analysisLanguageSprite=function(parent,nodeKey,name){

    cc.log("analysisLanguageSprite:" , nodeKey ,  name)
    let keys=nodeKey.split(".");
    let node=parent;
    for(let i=0;i<keys.length;i++){
        node=node.getChildByName(keys[i]);
    }
    var sp= node.getComponent(cc.Sprite);
    let code=window.autoi18n.lang;
    cc.loader.loadRes("autoi18n/"+code+"/"+name,cc.SpriteFrame,(err,frame)=>{
        if(!err){
            sp.spriteFrame=frame;
        }else{
            cc.error("err",err);
        }
    })
},

window.autoi18n.analysisLanguageData=function(parent,nodeKey,moduleName,...args){
    let keys=nodeKey.split(".");
    let node=parent;
    for(let i=0;i<keys.length;i++){
        node=node.getChildByName(keys[i]);
    }
    //args=args || [];
    //args.unshift(autoi18n.languageData[moduleName][nodeKey]);
    (node.getComponent(cc.Label) || node.getComponent(cc.RichText)).string=cc.js.formatStr(autoi18n.languageData[moduleName][nodeKey],args);
}

window.autoi18n.changeLanguage=function(code){
    window.autoi18n.lang=code;
    cc.sys.localStorage.setItem("lang",code);
    if(window.autoi18n[code]){
        autoi18n.languageData=window.autoi18n[code];
    }else{
        console.error("语言包["+code+"]未找到");
    }
    cc.game.emit("onLanguageChange");
}