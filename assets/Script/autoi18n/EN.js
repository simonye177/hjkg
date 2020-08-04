if (!window.autoi18n) window.autoi18n = {};
window.autoi18n['EN'] = {
    "showText": {
        "cjfjtips": "Please input information for creating room",
        "rssrtips": "3-6 players",
        "jrsrtips": "The amount is 100-1000 as a multiple of 10",
        "sjsrtips": "Game time is 60-90 seconds",
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
		"jhts":"Your account is logged in elsewhere",
        "zhunbeizhong":"preparing",
        "youxizhong":"in the game",
		"smtcfj":"Players who are not prepared within 10S kick out",
		"tcfjti":"You can join this room in {0} seconds",
		"btcfjl":"You have been kicked out of the room by the host",

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
        "Lang10012": "a13 coin balance insufficient ~",
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
		"Lang10029": "Gams has already started",
        "Lang10030": "Not ready to kick out of the room",
        "Lang10031": "Insufficient balance kick out the room",
        "Lang10032": "Homeowner can start the game",
        "Lang10033": "Gams has already started",
        "Lang10034": "Not enough people",
        "Lang10035": "You have been kicked out of the room by the host",
        "Lang10036": "You can enter the room after {0}s",
        "Lang10037": "Unable to cancel preparation",
        "Lang10038": "The host can kick out the player",
        "Lang10039": "The game has started, players cannot be kicked out",
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
		"upNode.leftUp.kszl": "Total ore：",
    },

    "CreateRoom": {
        "label_password":"Person number of the game",
        "label_renshu":"Game period ",
        "label_time":"Amount for single ",
        "label_jine":"Password of room ",
        "label_tips":"Creating room shall frozen ",
        "EditBoxRenshu.label_ren":"person ",
        "EditBoxTime.label_fen":"Score ",
        "EditBoxRenshu.PLACEHOLDER_LABEL":"3-6",
        "EditBoxTime.PLACEHOLDER_LABEL": "60-90",
        "EditBoxJine.PLACEHOLDER_LABEL": "100-1000",
        "EditBoxMima.PLACEHOLDER_LABEL": "Optional",
    },

     "GameRule": {
        "1" : 
        `1、 how to create a room?？

        After the player has successfully logged in, get to the bottom and click the third button, click the topmost "Everyone Mining, Come to Fight" to enter the game page. Click the button "Create Room" in the lower left corner, after clicking, the create room page appears. Page Information for create room: The "number of players" must not be less than 2 and the maximum is 20, The minimum "game time" is 1 minute, and the maximum is unlimited, and only integers can be entered. The "single bet amount" is a minimum of 10 a13, and the maximum is unlimited, the a13 amount will be frozen when creating the room for users whoever entered this room.
        Exiting the room system before starting the game will return the frozen a13. When the game finishes,the bet amount of the player with the lowest score will be shared according to the player score ranking, if the scores are tied, the single bet amount will be shared together, the frozen single bet amount of other players will be refunded automatically.
        If a13 is insufficient, then it is unable to create a room nor enter the room, "room password" is optional, if a password is entered when creating a room, other players will also need the password to enter this room, after entering all the information, click the "create now" button to successfully create a room.
		The room types are divided into public rooms and password rooms. Public rooms: All players can enter this room. Password room: Need to enter password to enter the room. After successful creation of the room, the top of the page will be displaying: "Back to game center" button, "Game rules" button, "Player list" button, "Invite friends" button, the lower column displays: player score, nickname, a13, room number and other information.
		`,


        "2" : 
        `2、How to invite friends？
        
        After successfully creating a room, you can see that the fourth button at the top of the page is "invite friends". Click this button to display the Invite friends page. You can see the status of the friends (in game, available, offline, etc.). Choose the friends you want to invite and click invite now, when friends receive the invitation information, they can enter the room, you can see the friend information under the ready button, you can only only invite friends who are available or offline.
        `,


        "3" :
        `3、如何加入房间？
        
        After login successfully, click the third button below, and click the "Everyone Mining, Come to Fight" at the top to enter the game page. On the page "Room List", you can see the specific information of each room, such as "Room Status", "Room No. "," Number of players "," Single bet amount "," Public room", “Password room" and other information.
        Click the "Search Room" button to the right of the "Room List" and enter the room number. You can click the "Join Now" button at the room information to join the room, or click the "Quick Join" button at the bottom to join the room which is with the fastest time to the start of the game. You cannot join rooms which their games are in progress. After successfully joining the room, the system will freeze the single bet amount entered when the room was created and will be settled when the game ends
        `,

        "4" :
        `4、How to start a game?？
        
        After successfully creating a room or joining a room, enter the game page, and click the "Ready" button at the bottom of the screen. When the number of ready players reaches half of the "player number" entered when the room was created, a countdown will appear under the "Ready" button, players cannot cancel ready at this time. The game starts when the countdown ends and kicks out all unready players.
        For example, the "player number" entered when creating the room is 10. When 5 players are ready, the countdown starts. When the countdown ends, the game starts and all players who are not ready will be kicked out. If all 10 players click on ready, the game will start immediately .
        `,

        "5" :
        `5、After starting the game
        
        The "Exit Game" button, "Game Rules" button, "Player List" button, "Invite Friends" button at the top of the player after starting the game,
        Click on the "Game Rules" button to get an introduction to gameplay,
        Click the "Player List" button, all the players in the game to the current ranking, score, and other information will appear.
        Click the "Invite friends" button, the status of friends will appear. In-game, available, offline, if invite friends at this time, friends can not join the room
        The middle page of the game will appear gold mines, stones. When the gold mines are captured, the gold mine score will be a random number between 1-100. If the stones are captured, the stones are not scored. The player who first hooks up a gold mine will get the gold mine scores, other players do not score at the same gold mine.
        AThe bottom row will show the player's score, nickname, a13 number, room number and other information, and the bottom row will show each player's nickname a13 number, current score and other information.
        `,

        "6" :
        `6、Game settlement after the game
        
        At the end of the game when the countdown is 0, a settlement page will appear. At the center of this page the ranking and score of the player in the game will be displayed, according to the scores on this page, the system will: 
        Rank and calculate to share the single bet amount of the players who are with the lowest ranking (if there are side-by-side players, they are shared together), other players except the players with the lowest ranking score will need to charge a certain miner fee of a13 won by the player. The single bet amount of players other than the lowest scoring players will be automatically returned to the account. Below the ranking score, players can see how much a13 they have earned in the game.
        If there are only 2 players in the room and the 2 players score the same, the system will not calculate and return the frozen single bet amount
        There are two buttons below the a13 obtained in this game: "Exit the room" and "One more game". Click the "Exit room" button to return to the room list page. Click the "One more game" button to return to the room page, a new round will be started, each round will freeze the single bet amount entered when creating the room, and will be settled when the game is over.
		`,

        "7":
        `7、Reconnection after disconnection
        
        The gold miner has a function for reconnection after disconnection. The player may come across issues like receive a call, return a message, out of power, cut out the APP, disconnected the network, unstable network. Log in to the game again and click the reconnect button to continue the game, the original page can be returned
        There is a time limit for reconnection after disconnection. When the disconnection occurs, the countdown in the game will not stop. If the countdown does not end after the player reconnects, the game will continue. If the game has ended, the game will jump to the game settlement page.
		`,

        "8":
        `8、Temporary leave during the game
        
        When you temporarily leave the game and click the "Exit Game" button, you can exit the "Gold Miner" page to go for your investment or money transferring. When the countdown has not ended when you click the "Everyone Mining, Come to Fight", it will jump to the game, if the countdown has ended, it will jump to the settlement page at the end of the countdown`,
     },

     "GetInvite": {
        "tip":"invite you to join the game "
     },

      "SearchRoom": {
         "fanghaoEditBox.PLACEHOLDER_LABEL":"Please input the room number ",
        "mimaEditBox.PLACEHOLDER_LABEL":"Please input the room password ",
     },
}