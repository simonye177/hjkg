﻿if (!window.autoi18n) window.autoi18n = {};
window.autoi18n['ZH'] = {
    "showText": {
        "cjfjtips": "请输入创建房间信息",
        "rssrtips": "游戏人数为3-6",
        "jrsrtips": "金额为100-1000，且是10的倍数",
        "sjsrtips": "游戏时间为60-90秒",
        "czerrortips": "操作错误",
        "ssfjbcztips": "搜索的房间不存在",
        "myhytips": "您还没有好友哦",
        "hqhylbtips": "获取列表失败",
        "fsyqxxsustips": "发送邀请信息成功",
        "xzyqhytips": "请选择需要邀请的好友",
        "wldktips": "网络断开，正在重连...",
        "fhbnwktips": "房号不能为空",
        "ssmmjrtips": "请输入密码后进入",
        "zhwjtc": "最后一位玩家退出，房间即将解散。",
        "qdtcyx": "您确定退出游戏吗？",
        "xtydj": "系统已冻结您",
        "bkxyyfz":"游戏时间不可小于一分钟",
		"jhts":"您的账号在别处登录",
        "zhunbeizhong":"准备中",
        "youxizhong":"游戏中",
        "smtcfj":"10S内没有准备的玩家，10S后踢出房间",
        "tcfjti":"还有{0}秒您才可以加入此房间",
        "btcfjl":"您已被房主踢出房间",
    },
    "serverTips":{
        "Lang10001": "您已进入{0}号房间,无法创建房间",
        "Lang10002": "您已进入{0}号房间",
        "Lang10003": "房间密码错误~",
        "Lang10004": "房间人数已满~",
        "Lang10005": "房间人数已满或已开始游戏~",
        "Lang10006": "用户信息获取失败,请重新登录~",
        "Lang10007": "游戏已开始",
        "Lang10008": "请先进入房间",
        "Lang10009": "已准备,请耐心等待开始游戏~",
        "Lang10011": "用户信息获取失败,请重新登录~",
        "Lang10012": "A13币余额不足~",
        "Lang10013": "游戏中不允许退出",
        "Lang10014": "游戏已结束",
        "Lang10015": "该矿石已被其他玩家挖出",
        "Lang10016": "该矿石已被其他玩家抢先一步",
        "Lang10017": "亲,房主才能解散房间哦~",
        "Lang10018": "游戏已开始,无法解散房间~",
        "Lang10019": "没有此房间~",
        "Lang10020": "房间不存在,请重试~",
        "Lang10021": "连接错误",
        "Lang10022": "链接信息错误",
        "Lang10023": "游戏人数为3-6",
        "Lang10024": "金额为100-1000,且是10的倍数",
        "Lang10025": "游戏时间为60-90秒",
        "Lang10026": "没有空闲房间~请稍后",
        "Lang10027": "矿石参数错误",
        "Lang10028": "游戏结算异常",
        "Lang10029": "游戏已开始",
        "Lang10030": "未准备踢出房间",
        "Lang10031": "余额不足踢出房间",
        "Lang10032": "房主才能开始游戏",
        "Lang10033": "游戏已开始",
        "Lang10034": "准备人数不足",
        "Lang10035": "您已被房主踢出房间",
        "Lang10036": "{0}s后您才能进入房间",
        "Lang10037": "无法取消准备",
        "Lang10038": "房主方可踢出玩家",
        "Lang10039": "游戏已开始，不可踢出玩家",

    },

    "inviteText": {
        "sdyqxx": "收到邀请信息",
    },

    "HallScene": {
        "hallUI.text_RoomList": "房间列表",
        "RoomListIcon.headicondi.l_fangzhu": "房主",
        "RoomListIcon.i_danzhu": "单注：",
        "RoomListIcon.i_wanjia": "玩家：",
        "RoomListIcon.i_fanghao": "房号：",
    },

    "GameScene": {
        "upNode.leftdi.nicheng": "昵称：",
        "upNode.leftdi.defen": "得分：",
        "upNode.leftdi.paiming": "排名：",
        "upNode.rightdi.fanghao": "房号：",
        "upNode.rightdi.wanjia": "玩家：",
        "bjyxhd": "本局游戏您获得",
        "upNode.leftUp.kszl": "矿石总量：",
    },

    "CreateRoom": {
        "label_password": "游戏人数",
        "label_renshu": "游戏时间",
        "label_time": "单注金额",
        "label_jine": "房间密码",
        "label_tips": "创建房间需要冻结",
        "EditBoxRenshu.label_ren": "人",
        "EditBoxTime.label_fen": "秒",
        "EditBoxRenshu.PLACEHOLDER_LABEL": "3-6",
        "EditBoxTime.PLACEHOLDER_LABEL": "60-90",
        "EditBoxJine.PLACEHOLDER_LABEL": "100-1000",
        "EditBoxMima.PLACEHOLDER_LABEL": "可不填",
    },

     "GameRule": {
        "1" : 
        `1、如何创建房间？

        玩家登录成功进入下方点击第三个按钮，点击最上方“全民挖矿 等人来战”进入游戏页面，点击左下角“创建房间按钮”，点击后出现创建房间页面，创建房间页面信息：“游戏人数”不得低于3人，最多6人，“游戏时间”最低为1分钟，最高无上限，只可以输入整数，”单注金额”最低为100枚A13，最高为1000，每个进入此房间的用户都会冻结创建房间时输入的A13。
        没有开始游戏之前退出房间系统则会返还冻结的A13，游戏结束时会根据玩家得分排名分取分数最低的玩家的单注金额，若是分数并列则一并分取，其他玩家冻结的单注金额则会自动退还。
        若A13不足测无法创建房间、也无法进入房间，“房间密码”选填，如果创建房间时输入了密码，其他玩家进入此房间都需要密码，输入所有信息后点击“立即创建”按钮即可成功创建房间 。
        房间类型分为公共房和密码房 公共房:此房间所有玩家都可以进入 密码房：需要输入密码进入 创建房间成功后页面最上方会显示，“返回大厅”按钮、“游戏规则”按钮、“玩家列表”按钮、“邀请好友”按钮，下方一栏显示 玩家得分、昵称、A13、房间号等信息。
        `,


        "2" : 
        `2、如何邀请好友？
        
        创建房间成功后，可以看到页面最上方第四个按钮为“邀请好友”，点击此按钮出现邀请好友页面，可以看到好友的状态（游戏中、空闲中、离线，）选中要邀请的好友点击立即邀请，好友收到邀请信息，进入房间，可以在准备按钮下方看到好友信息，只可以邀请空闲中、离线的好友
        `,


        "3" :
        `3、如何加入房间？
        
        登录成功进入下方点击第三个按钮，点击最上方“全民挖矿 等人来战”进入游戏页面，在“房间列表页面”可以看到每个房间的具体信息，如“房间状态”，“房号”，“玩家人数”，“单注金额，”，“公开房”，“密码房”等信息。
        点击“房间列表”右侧“搜索房间”按钮输入房间号点击立即加入即可加入房间，可以点击房间信息处“立即加入”按钮即可加入房间，也可以点击最下方“快速加入”按钮即可加入 距离游戏开始时间最快的房间，正在游戏中的房间则不可以加入，成功加入房间后系统会冻结此房间创建时输入的的单注金额，待游戏结束时进行结算。
        `,

        "4" :
        `4、如何开始游戏？
        
          创建房间或者加入房间成功后进入游戏页面，点击屏幕下方“准备”按钮 当房间内所有玩家都准备时游戏开始，“准备”按钮下方会出现30S倒计时。当下方倒计时结束时会踢出所有没有准备的玩家。
        或者，当有玩家准备后，房主也可主动开始游戏，房主主动开始游戏时，会踢出所有没有准备的玩家并且游戏开始
        `,

        "5" :
        `5、开始游戏后
        
        开始游戏后玩家最上方的“退出游戏”按钮，“游戏规则”按钮，“玩家列表”按钮，“邀请好友”按钮，
        点击“”游戏规则“按钮会出现游戏玩法介绍，
        点击“玩家列表”按钮时会出现本局所有玩家到目前的排名，得分，等信息，
        点击“邀请好友”按钮则会出现好友状态 游戏中、空闲中、离线，此时邀请好友，好友无法加入房间
        游戏中间页面会出现金矿，石头，抓取到金矿时金矿分数为1-100之间的随机数，抓取到石头是石头不计分，若多个玩家抓取到同一矿石时，最先勾到金矿的玩家进行得分，其他玩家不计分。
        当金矿和石头剩余三分之一时则会出现新一轮矿石。金矿、石头页面下方中间则会出现以倒计时的形式距离游戏结束时还有多久，此处倒计时时间以创建房间时输入的游戏时间为准，倒计时为0时游戏结束，如：玩家突然进到电话聊了30秒，此处倒计时也会过30秒不会暂停。
        最下方一排会显示此玩家的得分、昵称、A13数量、房号等信息，最下方则会显示每个玩家的 昵称 A13数量 目前得分等信息。
        `,

        "6" :
        `6、游戏结束后游戏结算
        
        游戏中当下方倒计时为0时本局结束，系统自动计算所有玩家得分，显示在结算页面上，此页面中间会显示本局玩家的排名，得分，系统会根据此页面的得分，
        排名进行计算分取排名最低的玩家的单注金额（如果有并列玩家，则根据抓取得时间来进行计算），除排名得分最低玩家之外的其他玩家需要收取玩家赢取的A13的一定的矿工费，除排名得分最低玩家之外其他玩家的单注金额会自动退回账户，玩家在排名得分下方可以看到本局游戏获得了多少A13。    
        本局游戏获得了多少A13的下方会有两个按钮 “退出房间”、“再来一局”点击“退出房间”按钮即会回到房间列表页面，点击“再来一局”按钮即会回到房间页面，开始新的一轮，每轮都会冻结创建房间时输入的单注金额，待游戏结束时进行结算。
        `,

        "7":
        `7、断线重连
        
        黄金矿工有断线重连功能，玩家可能接电话，回信息，手机没电，切出APP，网络掉线或者网络不稳定等，再次登录游戏点击重新连接按钮可以继续游戏，返回原来的页面。
        断线重连有着时间限制，断线时游戏内的倒计时不会停止的，玩家重新连接后如果倒计时没有结束会继续游戏，如果本局游戏已经结束则会跳转到游戏结算页面。
        `,

        "8":
        `8、游戏中临时离开
        
        游戏中临时离开时点击“退出游戏”按钮时则可以退出“黄金矿工”页面，去进行投资理财或者转账，点击“全民挖矿 等人来战”时如果倒计时没结束则会跳转到游戏中，倒计时结束时跳转到结算页面`,
     },

     "GetInvite": {
        "tip": "邀请你加入游戏"
     },

      "SearchRoom": {
        "fanghaoEditBox.PLACEHOLDER_LABEL": "请输入房间号",
        "mimaEditBox.PLACEHOLDER_LABEL": "请输入房间密码",
     },
}