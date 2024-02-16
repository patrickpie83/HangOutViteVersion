import { defineStore } from 'pinia';
import toastMessageStore from './toastMessageStore';
import axios from 'axios';
import router from '@/router';

const apiUrl = import.meta.env.VITE_API_URL;
const toastMessage = toastMessageStore();

export default defineStore ('loginStore',{
    state:()=>({
        isLogin:false,
    }),
    actions:{
        //註冊
        signup(signupInfo){
            let myuuid = crypto.randomUUID();
            axios.post(`${apiUrl}/users`,{
                "id":myuuid,
                "email":signupInfo.email,
                "password":signupInfo.password,
                "userInfo":{
                    "name":signupInfo.name,
                    "pic":"https://github.com/patrickpie83/HangOut/blob/master/public/images/img_memberPic.png?raw=true",
                    "gender":"",
                    "sexualOrientation":"",
                    "intro":""
                },
                "petInfo":{
                    "name":"",
                    "pic":"https://github.com/patrickpie83/HangOut/blob/master/public/images/img_petPic.png?raw=true",
                    "breed":"",
                    "gender":"",
                },
                "lifePic":[],
                "chatRoomKey":[]
            })
            .then(()=>{
                toastMessage.pushMessage("success","註冊成功");
                router.push('/login');
            })
            .catch((err)=>{
                toastMessage.pushMessage("warning","註冊失敗");
                console.log(err);
            })
        },
        //登入
        login(loginInfo){
            axios.post(`${apiUrl}/login`,loginInfo)
            .then((res)=>{
                localStorage.setItem("userId",res.data.user.id);
                this.isLogin = true;
                toastMessage.pushMessage("success","登入成功");
                router.push('/browse');
            })
            .catch((err)=>{
                toastMessage.pushMessage("warning","登入失敗");
                console.log(err);
            })
        },
        // 登出
        logout(){
            localStorage.clear();
            this.isLogin = false;
            toastMessage.pushMessage("success","已登出");
            router.push('/');
        }
    }
})