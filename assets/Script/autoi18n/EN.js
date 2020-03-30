if (!window.autoi18n) window.autoi18n = {};
window.autoi18n['EN'] = {
    "showText": {
        "cjfjtips": "Please input information for creating room",
        "rssrtips": "The number of players is 2-20",
        "jrsrtips": "Amount error, it could not be less than 10",
        "sjsrtips": "Play time is 1-3 minutes",
        "czerrortips": "Operation error ",
        "ssfjbcztips": "Searched room does not exist",
        "myhytips": "You do not have friends",
        "hqhylbtips": "Obtain list failure",	
        "fsyqxxsustips": "Send invitation message successfully",
        "xzyqhytips": "Send invitation message successfully",
        "wldktips": "Network interruption, connecting…",
        "fhbnwktips": "Room number could not be empty",
        "ssmmjrtips": "Please input the password and then enter",
        "zhwjtc": "The last player exist, the room will dissolve.. ",
        "qdtcyx": "Are you sure to log out game？",
        "xtydj": "System has frozen your account.",
        "bkxyyfz":"Game time could not be less than one minute",
    },
    "serverTips":{
        "Lang10001": "You have entered into {0} room, and you could not create room",
        "Lang10002": "You have entered into {0} room",
        "Lang10003": "Room password error ~",
        "Lang10004": "The room is already full~",
        "Lang10005": "The room is already full or game already starts ~",
        "Lang10006": "Obtain user information failure, please log in again~",
        "Lang10007": "Gams has already started",
        "Lang10008": "Please enter into room first",
        "Lang10009": "Preparing, please wait for the start of the game~",
        "Lang10011": "Obtain user information failure, please log in again~",
        "Lang10012": "ALSC coin balance insufficient ~",
        "Lang10013": "Prohibit exiting before the end of the game ",
        "Lang10014": "Game is over ",
        "Lang10015": "This mine has been excavated by other player ",
        "Lang10016": "This mine has been captured by other player ",
        "Lang10017": "Only could the owner of the room dissolve it~ ",
        "Lang10018": "Game has been started, and could not dissolve this room~ ",
        "Lang10019": "This room does not exist~ ",
        "Lang10020": "This room does not exist, please try again ~",
        "Lang10021": "Connection error ",
        "Lang10022": "Link information error ",
        "Lang10023": "The number of this room shall between 2 to 20 ",
        "Lang10024": "The minimum single amount is 10 ",
        "Lang10025": "The duration for game shall be larger than 1 minute ",
        "Lang10026": "No empty room, please wait a moment ",
        "Lang10027": "Mine parameter error",
        "Lang10028": "Game settlement abnormal",
    },

    "inviteText": {
        "sdyqxx": "Received the invitation information",
    },

    "HallScene": {
        "hallUI.text_RoomList": "Room list ",
        "RoomListIcon.headicondi.l_fangzhu": "Room owner ",
        "RoomListIcon.i_danzhu": "Single：",
        "RoomListIcon.i_wanjia": "Player：",
        "RoomListIcon.i_fanghao": "Room number：",
    },

    "GameScene": {
        "upNode.leftdi.nicheng":"Nickname：",
        "upNode.leftdi.defen":"Score：",
		"upNode.leftdi.paiming": "Ranking：",
        "upNode.rightdi.fanghao":"Room number：",
		"upNode.rightdi.wanjia": "Player：",
        "bjyxhd":"You gained for this round of the game ",
    },

    "CreateRoom": {
        "label_password":"Person number of the game",
        "label_renshu":"Game period ",
        "label_time":"Amount for single ",
        "label_jine":"Password of room ",
        "label_tips":"Creating room shall frozen",
        "EditBoxRenshu.label_ren":"erson ",
        "EditBoxTime.label_fen":"Score ",
        "EditBoxRenshu.PLACEHOLDER_LABEL":"2 people minimum",
        "EditBoxTime.PLACEHOLDER_LABEL": "Minimum 1 minute, maximum 3 minutes",
        "EditBoxJine.PLACEHOLDER_LABEL": "Minimum 10 ALSC",
        "EditBoxMima.PLACEHOLDER_LABEL": "Optional",
    },

     "GameRule": {
        "1" : 
        `1、如何创建房间？

        玩家登录成功进入下方点击第三个按钮，点击最上方“全民挖矿 等人来战”进入游戏页面，点击左下角“创建房间按钮”，点击后出现创建房间页面，创建房间页面信息：“游戏人数”不得低于2人，最多20人，“游戏时间”最低为1分钟，最高无上限，只可以输入整数，”单注金额”最低为10枚ALSC，最高无上限，每个进入此房间的用户都会冻结创建房间时输入的ALSC。
        没有开始游戏之前退出房间系统则会返还冻结的ALSC，游戏结束时会根据玩家得分排名分取分数最低的玩家的单注金额，若是分数并列则一并分取，其他玩家冻结的单注金额则会自动退还。
        若ALSC不足测无法创建房间、也无法进入房间，“房间密码”选填，如果创建房间时输入了密码，其他玩家进入此房间都需要密码，输入所有信息后点击“立即创建”按钮即可成功创建房间 。
        房间类型分为公共房和密码房 公共房:此房间所有玩家都可以进入 密码房：需要输入密码进入 创建房间成功后页面最上方会显示，“返回大厅”按钮、“游戏规则”按钮、“玩家列表”按钮、“邀请好友”按钮，下方一栏显示 玩家得分、昵称、ALSC、房间号等信息。
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
        
        创建房间或者加入房间成功后进入游戏页面，点击屏幕下方“准备”按钮 当准备人数达到此房间创建时输入的“游戏人数”的一半时，“准备”按钮下方会出现倒计时，此时玩家不可以取消准备。当下方倒计时结束时开始游戏并且踢出所有没有准备的玩家。
        如：创建房间时输入的“游戏人数”为10当5位玩家准备后，开始倒计时，倒计时结束时开始游戏并且踢出所有没有准备的玩家，如果10位玩家都点击准备后则会立马开始游戏。
        `,

        "5" :
        `5、开始游戏后
        
        开始游戏后玩家最上方的“退出游戏”按钮，“游戏规则”按钮，“玩家列表”按钮，“邀请好友”按钮，
        点击“”游戏规则“按钮会出现游戏玩法介绍，
        点击“玩家列表”按钮时会出现本局所有玩家到目前的排名，得分，等信息，
        点击“邀请好友”按钮则会出现好友状态 游戏中、空闲中、离线，此时邀请好友，好  友无法加入房间
        游戏中间页面会出现金矿，石头，抓取到金矿时金矿分数为1-100之间的随机数，抓取到石头是石头不计分，若多个玩家抓取到同一矿石时，最先勾到金矿的玩家进行得分，其他玩家不计分。
        当金矿和石头剩余三分之一时则会出现新一轮矿石。金矿、石头页面下方中间则会出现以倒计时的形式距离游戏结束时还有多久，此处倒计时时间以创建房间时输入的游戏时间为准，倒计时为0时游戏结束，如：玩家突然进到电话聊了30秒，此处倒计时也会过30秒不会暂停。
        最下方一排会显示此玩家的得分、昵称、ALSC数量、房号等信息，最下方则会显示每个玩家的 昵称 ALSC数量 目前得分等信息。
        `,

        "6" :
        `6、游戏结束后游戏结算
        
        倒计时为0时游戏结束出现结算页面，此页面中间会显示本局玩家的排名，得分，系统会根据此页面的得分，
        排名进行计算分取排名最低的玩家的单注金额（如果有并列玩家，则一起分取），除排名得分最低玩家之外的其他玩家需要收取玩家赢取的ALSC的一定的矿工费，除排名得分最低玩家之外其他玩家的单注金额会自动退回账户，玩家在排名得分下方可以看到本局游戏获得了多少ALSC。
        如果房间只有2位玩家，2位玩家得分相同，系统则不会进行计算，并且退出冻结的单注金额
        本局游戏获得了多少ALSC的下方会有两个按钮 “退出房间”、“再来一局”点击“退出房间”按钮即会回到房间列表页面，点击“再来一局”按钮即会回到房间页面，开始新的一轮，每轮都会冻结创建房间时输入的单注金额，待游戏结束时进行结算。
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
        "tip":"invite you to join the game "
     },

      "SearchRoom": {
         "fanghaoEditBox.PLACEHOLDER_LABEL":"Please input the room number ",
        "mimaEditBox.PLACEHOLDER_LABEL":"Please input the room password ",
     },
}