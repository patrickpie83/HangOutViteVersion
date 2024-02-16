<script>
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChatRoomNav from '../../components/ChatRoomNav.vue';
import NotLogin from '../../components/NotLogin.vue';
import statusStore from '../../stores/statusStore';
import toastMessageStore from '../../stores/toastMessageStore';
import { onMounted, ref, getCurrentInstance } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const status = statusStore();
const toastMessage = toastMessageStore();

export default {
  components:{
    HeaderComponent,
    ChatRoomNav,
    NotLogin
  },
  
  setup(){
    //瀏覽者
    const userId = ref("");

    //對象
    const personInfo = ref({
      "email": "",
      "userInfo": {},
      "petInfo": {},
      "lifePic": []
    })

    const alreadyLike = (data)=>{
      //如果有按過讚
      if(data.indexOf(userId.value)>=0){
        return true
      }else{
        return false
      }
    }

    //對象的貼文
    //按喜歡
    const likePost = (data)=>{
      //如果有按過讚
      if(data.whoLikes.indexOf(userId.value)>=0){
        //收回讚
        data.whoLikes.splice( data.whoLikes.indexOf(userId.value) ,1 )
        axios.patch(`${apiUrl}/users/${personInfo.value.id}`,{
          "lifePic": personInfo.value.lifePic
        })
        .then(()=>{
          toastMessage.pushMessage("info","已收回喜歡");
        })
        .catch((err)=>{
          console.log(err)
        })

      }else{
        // 沒按過讚->送出讚
        data.whoLikes.push(userId.value)
        axios.patch(`${apiUrl}/users/${personInfo.value.id}`,{
          "lifePic": personInfo.value.lifePic
        })
        .then(()=>{
          toastMessage.pushMessage("success","已送出喜歡");
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    }

    const users=ref([]);
    const likerPic = (likerId)=>{
      try{
        let findResult = users.value.filter( obj=>{
          return obj.id == likerId
        })
        return findResult[0].userInfo.pic
      } catch(err){
        console.log(err)
        return ""
      }
    }

    const likerName = (likerId)=>{
      try{
        let findResult = users.value.filter( obj=>{
          return obj.id == likerId
        })
        return findResult[0].userInfo.name
      } catch(err){
        console.log(err)
        return "無法顯示"
      }
    }

    onMounted(()=>{
      status.navState = "browse";
      //先確認登入狀態
      userId.value = localStorage.getItem("userId");
      //取得當前路由id參數
      const personId = getCurrentInstance().proxy.$route.query.id;
      
      if(userId.value){
        axios.get(`${apiUrl}/users/${personId}`)
          .then((res)=>{
            personInfo.value.id = res.data.id;
            personInfo.value.email = res.data.email;
            personInfo.value.userInfo = res.data.userInfo;
            personInfo.value.petInfo = res.data.petInfo;
            personInfo.value.lifePic = res.data.lifePic;
          })
          .catch((err)=>{
            console.log(err)
          })

        axios.get(`${apiUrl}/users`)
          .then((res)=>{
            users.value =  res.data
          })
          .catch((err)=>{
            console.log(err)
          })
      }
    })

    return{
      userId,
      personInfo,

      likePost,
      alreadyLike,
      likerPic,
      likerName
    }
  }
}
</script>

<template>
  <HeaderComponent/>
    <router-link :to="{ path: '/chatroom/'+personInfo.id, query: { targetId : personInfo.id } }" type="button" class="chatBtn d-flex flex-column flex-sm-row align-items-center text-decoration-none">
      <span class="material-icons me-sm-3">chat</span>
      <span class="d-none d-sm-block">點我聊天</span>
      <span class="d-sm-none">點我</span>
      <span class="d-sm-none">聊天</span>
    </router-link>
    <div class="bg-hangout-bg pt-4 pb-7" v-if="userId">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10 col-lg-8">
            <!-- 資料 -->
            <div class="row">
              <!-- 主人資料 -->
              <div class="col-sm-6">
                <!-- 頭像 -->
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>我的頭像</span>
                  </div>
                  <div class="headPicEffect ratio ratio-1x1">
                    <img v-if="personInfo.userInfo.pic" :src="personInfo.userInfo.pic" alt="userPic">
                    <img v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_memberPic.png?raw=true" alt="defaulfUserPic">
                  </div>
                </div>
                <!-- 資料 -->
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>會員名稱</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.userInfo.name" class="text-center">{{personInfo.userInfo.name}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>性別</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.userInfo.gender" class="text-center">{{personInfo.userInfo.gender}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>性取向</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.userInfo.sexualOrientation" class="text-center">{{personInfo.userInfo.sexualOrientation}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
              </div>
              <!-- 寵物資料 -->
              <div class="col-sm-6">
                <!-- 頭像 -->
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>寵物頭像</span>
                  </div>
                  <div class="headPicEffect ratio ratio-1x1">
                    <img v-if="personInfo.petInfo.pic" :src="personInfo.petInfo.pic" alt="petPic">
                    <img v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_petPic.png?raw=true" alt="defaultPetPic">
                  </div>
                </div>
                <!-- 資料 -->
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>寵物名稱</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.petInfo.name" class="text-center">{{personInfo.petInfo.name}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>寵物品種</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.petInfo.breed" class="text-center">{{personInfo.petInfo.breed}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
                <div class="mb-5">
                  <div class="d-flex align-items-center mb-2">
                    <span>寵物性別</span>
                  </div>
                  <div class="memberEffect border border-hangout-second border-2 py-3">
                    <p v-if="personInfo.petInfo.gender" class="text-center">{{personInfo.petInfo.gender}}</p>
                    <p v-else class="text-center text-hangout-second fw-bold">尚未填寫</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 關於我 -->
            <div class="row pb-6 border-bottom">
              <div class="col">
                <div class="d-flex align-items-center mb-2">
                  <span>關於我</span>
                </div>
                <div class="memberEffect border border-hangout-second border-2 p-4">
                  <p v-if="personInfo.userInfo.intro">{{personInfo.userInfo.intro}}</p>
                  <p v-else class="text-hangout-second fw-bold">尚未填寫</p>
                </div>
              </div>
            </div>

            <!-- 生活照 -->
            <div class="row mt-6 mb-4">
              <div class="col-6 col-lg-9 d-flex align-items-center">
                <span>生活照</span>
              </div>
            </div>

            <div v-if="personInfo.lifePic.length > 0" class="row">
              <div v-for="item in personInfo.lifePic" :key="item.createDate" class="col-12 mb-4">

                <div class="bg-white shadow-sm border border-hangout-second border-2" style="border-radius: 30px;">
                  <div @click="likePost(item)" class="likeBg p-5" style="border-radius: 28px;">

                    <div class="d-sm-flex justify-content-sm-between">
                      <div class="ratio ratio-1x1 postPic">
                        <img class="w-100" :src="item.postImg" alt="">
                      </div>
                      <p class="postText mt-4 mt-sm-0">
                        {{item.postText}}
                      </p>
                    </div>

                    <span :class="{'text-hangout-second' : alreadyLike(item.whoLikes)}" class="likeIcon material-icons position-absolute">
                      favorite
                    </span>
                    
                  </div>
                  <div class="py-4 px-5">
                    <div class="d-flex align-items-center">
                      <a type="button" v-if="item.whoLikes.length>0" class="ms-5 text-hangout-text" data-bs-toggle="modal" data-bs-target="#seeWhoLikes">{{item.whoLikes.length}}人</a>
                      <span v-else class="ms-5">0人</span>
                    </div>
                  </div>
                  <!-- 彈窗內容 -->
                  <div class="modal fade" id="seeWhoLikes" tabindex="-1" aria-labelledby="seeWhoLikesModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">這些人按了喜歡</h5>
                        </div>
                        <div class="modal-body">
                          <div class="container">

                            <div v-for="(likerId,index) in item.whoLikes" :key="index" class="row border-bottom pb-3 mb-3">
                              <div class="col-6 d-flex justify-content-center">
                                <img :src="likerPic(likerId)" alt="" style="width:80px;height:80px;">
                              </div>
                              <div class="col-6 d-flex align-items-center">
                                <p >{{likerName(likerId)}}</p>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div v-else class="row">
              <div class="col-12 mb-7">
                <div class="bg-white shadow-sm border border-hangout-second border-2" style="border-radius: 30px;">
                  <div class="bg-hangout-block p-7" style="border-radius: 28px;">
                    <p class="text-center text-hangout-second fw-bold">這位用戶目前還沒有貼文</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>

    <NotLogin v-else />
    
  <ChatRoomNav/>
</template>


<style lang="scss" scoped>
  @import "../../assets/main";

  .chatBtn{
      position: fixed; /* Fixed/sticky position */
      bottom: 150px; /* Place the button at the bottom of the page */
      right: 0px; /* Place the button 30px from the right */
      z-index: 99; /* Make sure it does not overlap */
      border: none; /* Remove borders */
      outline: none; /* Remove outline */
      background-color:$hangout-decorate; /* Set a background color */
      color: $hangout-text; /* Text color */
      cursor: pointer; /* Add a mouse pointer on hover */
      padding: 16px ; /* Some padding */
      border-radius: 20px 0px 0px 20px; /* Rounded corners */
      font-size: 16px; /* Increase font size */

      @include pad{
        padding: 16px 24px; /* Some padding */
      }
      @include pc{
        padding: 16px 70px; /* Some padding */
      }

    &:hover{
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

    &:active {
      box-shadow:none
    }
  }

  .headPicEffect{
    border: 4px solid $hangout-primary;
  }

  .memberEffect{
    background-color: $hangout-block;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .postPic{
    width: 100%;
    @include sm{
        width: 48%;
    }
  }
  .postText{
    width: 100%;
    @include sm{
        width: 48%;
    }
  }

  .likeIcon{
    bottom: -48px;
  }

  .likeBg{
    background-color: $hangout-block;
    position: relative;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.2s; /* Safari */

    &:hover{
      cursor: pointer;
      background-color: $hangout-second;
        .likeIcon{
          color: $hangout-second;
        }
    }

    &:after{
      content: "";
      display: block;
      position: absolute;
      border-radius: 30px;
      left: 0;
      top:0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.5s;
      box-shadow: 0 0 10px 40px $hangout-second;
    }

    &:active:after {
      box-shadow: 0 0 0 0 $hangout-second;
      position: absolute;
      border-radius: 30px;
      left: 0;
      top:0;
      opacity: 1;
      transition: 0s;
    }

    &:active {
      top: 1px;
    }
  }

</style>