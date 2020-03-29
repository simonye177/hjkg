
//音乐相关管理类

var manage = {}
manage.resList = [];

manage.getMusicVolume = ()=> {
    var musicvolume = cc.sys.localStorage.getItem("musicvolume")
    if (!musicvolume) {
        musicvolume = 1
    }
    return parseInt(musicvolume)
}

manage.getEffectVolume = ()=> {
    var effectvolume = cc.sys.localStorage.getItem("effectvolume")
    // cc.log("effectvolume",effectvolume)
    if (!effectvolume) {
        effectvolume = 1
    }
    return parseInt(effectvolume)
}


manage.getMusicState = ()=>{
    var state = cc.sys.localStorage.getItem("musicState");
    if(state==null)
        state = "1";
    var b_state = state == "1" ? true : false;
    return b_state
}

manage.setMusicState = (v)=>{
    var s_v = v ? "1" : "0";
    cc.sys.localStorage.setItem("musicState" , s_v)
    manage.setMusicVolume(parseInt(s_v));
}


manage.playMusic = (clip,loop,volume)=>{
    if (!clip || !clip._name) {return}
    if(!manage.getMusicState()){
        manage.setMusicVolume(0);
        return
    }
    manage.stopMusic()
    cc.audioEngine.playMusic(clip, loop)
}

manage.playEffect = (clip,loop)=>{
    if (!clip || !clip._name) {return}
    if(!manage.getMusicState()){return}
    // var effectvolume = manage.getEffectVolume()
    cc.audioEngine.playEffect(clip, loop)
    // manage.setEffectsVolume(effectvolume)
}

manage.setMusicVolume = (volume)=>{
    cc.audioEngine.setMusicVolume(volume)
}

manage.setEffectsVolume = (volume)=>{
    cc.audioEngine.setEffectsVolume(volume)
}

manage.pauseMusic = ()=>{
    cc.audioEngine.pauseMusic()
    // cc.sys.localStorage.setItem("musicvolume", 0)
}

manage.resumeMusic = ()=>{
    cc.audioEngine.resumeMusic()
    // cc.sys.localStorage.setItem("musicvolume", 1)
    manage.setMusicVolume(1)
}

manage.stopMusic = ()=>{
    cc.audioEngine.stopMusic()
    // cc.sys.localStorage.setItem("musicvolume", 0)
}

manage.pauseEffect = (audioID)=>{
    cc.audioEngine.pauseEffect(audioID)
    // cc.sys.localStorage.setItem("effectvolume", 0)
}

manage.pauseAllEffects = ()=>{
    cc.audioEngine.pauseAllEffects()
}

manage.stopAllEffects = ()=>{
    cc.audioEngine.stopAllEffects()
    // cc.sys.localStorage.setItem("effectvolume", 0)
}

manage.resumeEffect = (audioID)=>{
    cc.audioEngine.resumeEffect(audioID)
    // cc.sys.localStorage.setItem("effectvolume", 1)
    manage.setEffectsVolume(1)
}

manage.resumeAllEffects = ()=>{
    cc.audioEngine.resumeAllEffects()
    // cc.sys.localStorage.setItem("effectvolume", 1)
    manage.setEffectsVolume(1)
}

// 预加载音效音乐
manage.loadClip = (res,callback)=>{
    cc.log("loadClip", res)
    manage.resList.push(res)
    cc.loader.loadRes(res, cc.AudioClip, callback);
}

// 释放所有预加载
manage.releaseClip = ()=>{
    if(manage.resList.length > 0){
        for (var i = 0; i < manage.resList.length; i++) {
            cc.loader.releaseRes(manage.resList[i],cc.AudioClip);
        }

        manage.resList = null;
        manage.resList = [];
    }

}



module.exports = manage;

