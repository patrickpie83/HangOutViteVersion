import { defineStore } from 'pinia';
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { ref as fireBaseRef, getDatabase, onValue, update, push, child} from "firebase/database";
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const firebaseConfig = {
  apiKey: "AIzaSyCTIDRYBSvZak9CqKLulVG3XcqXQgbA4Tk",
  authDomain: "hangoutchatroom-e390c.firebaseapp.com",
  projectId: "hangoutchatroom-e390c",
  storageBucket: "hangoutchatroom-e390c.appspot.com",
  messagingSenderId: "59840666908",
  appId: "1:59840666908:web:a03db8e68c40b76b4baed9",
  measurementId: "G-TSYQ76H9JL"
};

const chatRoomApp = initializeApp(firebaseConfig);
const db = getDatabase(chatRoomApp);

import timeStore from '../stores/timeStore';
const time = timeStore();

export default defineStore ('chatRoomStore',{
    state:()=>({
        loadingRoom:false,
        allRoom:{},
        userId:"",
        targetId:"",
        targetRoomKey:"",
        targetName:"",
        targetPic:"",
        ownKeys:[],
        ownRooms:[],// ownRooms以陣列形式才能用時間排序
        renderNavData:[],
        targetMsgDataAry:[],
        renderMsgData:[],
    }),
    actions:{
        getConnect(){
            //初始都先設空值
            this.targetRoomKey="";
            this.allRoom={};
            this.ownKeys=[];
            this.ownRooms=[];
            this.renderNavData=[];
            //先取得所有聊天室
            const chatRoomRef = fireBaseRef(db, `/`);
            //建立連線，當監聽的數據產生變化時
            onValue(chatRoomRef, (snapshot) => {
                this.allRoom = snapshot.val(); //snapshot當前的數據狀態 .val()結果是一整個物件
            });
        },
        getTargetRoomKey(){
            // 取得與目標對象的聊天室鑰匙號碼
            if(this.allRoom == null){
                //如果伺服器完全沒有聊天室，則表示沒有與目標的聊天室
                return
            }else{
                //若伺服器有聊天室
                //取得與目標對象的鑰匙號碼（ChatRoomTarget視窗使用）
                let allRoomKeys = Object.keys(this.allRoom)
                allRoomKeys.forEach((item)=>{
                    if(this.allRoom[item].owner==undefined){
                        return
                    }
                    // 若鑰匙的擁有者為自己和目標對象，則取得目標聊天室鑰匙
                    if(this.allRoom[item].owner.includes(this.userId) && this.allRoom[item].owner.includes(this.targetId)){
                        this.targetRoomKey = item
                    }
                })
            }
        },
        getOwnKeys(){
            //取得自己所擁有的所有鑰匙號碼(ChatNav側邊選單使用)
            if(this.allRoom == null){
                //如果伺服器完全沒有聊天室，則表示自己也沒有任何鑰匙
                return
            }else{
                //如果有聊天室，要篩選出自己有的鑰匙號碼＋聊天對象
                let allRoomKeys = Object.keys(this.allRoom)
                allRoomKeys.forEach((item)=>{
                    if(this.allRoom[item].owner==undefined){
                        return
                    }
                    // 若鑰匙的擁有者有自己，且尚未寫入，則寫入自己擁有鑰匙
                    if(this.allRoom[item].owner.includes(this.userId) && (!this.ownKeys.includes(item))){
                        //鑰匙號碼
                        this.ownKeys.push(item)
                        //房間資訊
                        this.ownRooms.push(this.allRoom[item])
                    }
                    else if( this.ownKeys.includes(item) ){
                    //如果伺服器資料變動是我擁有的聊天室，的時間更新，那麼就更新房間資訊
                    //找到房間，更新資訊
                        let updateRoomIndex;
                        for(let i=0;i<this.ownKeys.length;i++){
                            if( item == this.ownRooms[i].roomKey && ( this.ownRooms[i].lastestTime.time!=this.allRoom[item].lastestTime.time)){
                                updateRoomIndex = i;
                                this.ownRooms[updateRoomIndex] = this.allRoom[item]
                            }
                        }
                    }
                })
                //取得目標房間資訊
                this.getTargetRoomMsg();
                //將房間資料替換成要渲染的資料
                this.updateData();
            }
        },
        updateData(){
            console.log(`執行了一次updateData`)
            this.renderNavData = [];
            
            let promises = [];
            for (let i=0;i<this.ownRooms.length;i++){
                let obj ={
                    "lastestTime":"",
                    "roomKey":"",
                    "otherId":"",
                    "otherName":"",
                    "otherPic":"",
                    "petPic":""
                }
                obj.lastestTime = this.ownRooms[i].lastestTime.time;
                let otherIdFilter = this.ownRooms[i].owner.filter((id)=>{
                    return id!=this.userId
                })
                obj.otherId = otherIdFilter[0];
                obj.roomKey = this.ownRooms[i].roomKey;
                this.loadingRoom = true;

                let axiosPromise = axios.get(`${apiUrl}/users/${otherIdFilter[0]}`)
                .then((res)=>{
                    obj.otherName = res.data.userInfo.name
                    obj.otherPic = res.data.userInfo.pic
                    obj.petPic = res.data.petInfo.pic

                    // 因數據產生變化時，會同時多次執行updateData函式，故若已有對象資料則不再push
                    let alreadyResult = this.renderNavData.filter( data =>{
                        return data.otherId == otherIdFilter[0]
                    })
                    if(alreadyResult[0] == undefined){
                        this.renderNavData.push(obj)
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })

                promises.push(axiosPromise);
            }
            
            Promise.all(promises)
            .then(() => {
                //排序房間
                this.sortOwnRooms()
            })
            .catch(err => {
                console.log(err);
            });
        },
        sortOwnRooms(){
            this.renderNavData = this.renderNavData.sort(function (a, b) {
                return a.lastestTime < b.lastestTime ? 1 : -1;
            });
            this.loadingRoom = false;
        },
        switchTargetIdAndRoomKey(id,key){
            this.targetRoomKey = key;
            this.targetId = id;
            this.getTargetRoomMsg();
            this.getTargetInfo();
        },
        getTargetRoomMsg(){
            this.targetMsgDataAry=[];
            this.renderMsgData=[];
            for(let i=0;i<this.ownRooms.length;i++){
                //取得與目標對象的聊天室
                if(this.ownRooms[i].roomKey==this.targetRoomKey){

                    let ownRoomsMsgKeys = Object.keys(this.ownRooms[i].msgData)

                    ownRoomsMsgKeys.forEach((msgKey)=>{
                        this.targetMsgDataAry.push(this.ownRooms[i].msgData[msgKey])
                    })
                    
                    this.sortMsgData(this.targetMsgDataAry)
                    return
                }
            }
        },
        getTargetInfo(){
            if(this.targetId){
                axios.get(`${apiUrl}/users/${this.targetId}`)
                .then((res)=>{
                    this.targetName = res.data.userInfo.name
                    this.targetPic = res.data.userInfo.pic
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
        },
        sortMsgData(data){
            this.renderMsgData = data.sort(function (a, b) {
                return a.time > b.time ? 1 : -1;
            });
        },

        sendMsg(msg){
            let roomKey;
            if(this.targetRoomKey){
                // 如果已有開聊天室，則往下加入訊息
                roomKey = this.targetRoomKey;
                //訊息鑰匙
                const msgKey = push(child(fireBaseRef(db), `/${roomKey}`)).key

                let msgData={
                    msgKey,
                    "sender":this.userId,
                    msg,
                    "time":time.getCurrentTime()
                }
                //新增訊息
                const updates = {};
                updates[`/${roomKey}/msgData/${msgKey}`] = msgData;
                update(fireBaseRef(db), updates) ;
                //更新最新訊息時間
                let lastestTime ={
                    "time":time.getCurrentTime()
                }
                const updateLatestTime={};
                updateLatestTime[`/${roomKey}/lastestTime`] = lastestTime ;
                update(fireBaseRef(db), updateLatestTime);

            }else{
                // 如果未開聊天室，則拿一把新聊天室鑰匙
                roomKey = push(child(fireBaseRef(db), `/`)).key;
                //訊息鑰匙
                const msgKey = push(child(fireBaseRef(db), `/${roomKey}`)).key

                let roomData ={
                    roomKey,
                    "owner":[this.userId,this.targetId],
                    "lastestTime":{
                        "time":time.getCurrentTime()
                    },
                    "msgData":{}
                }
                roomData.msgData[msgKey]={
                    msgKey,
                    "sender":this.userId,
                    msg,
                    "time":time.getCurrentTime()
                }
                const updates = {};
                updates[`/${roomKey}`] = roomData;
                update(fireBaseRef(db), updates) ;
            }
        }
    }
})


  