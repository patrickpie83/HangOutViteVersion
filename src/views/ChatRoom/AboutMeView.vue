<script>
import axios from 'axios';
import Swal from 'sweetalert2'

import HeaderComponent from '@/components/HeaderComponent.vue';
import ChatRoomNav from '../../components/ChatRoomNav.vue';
import NotLogin from '../../components/NotLogin.vue';
import statusStore from '../../stores/statusStore';
import toastMessageStore from '../../stores/toastMessageStore';
import timeStore from '../../stores/timeStore';

import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const status = statusStore();
const toastMessage = toastMessageStore();
const time = timeStore();

export default {
  components:{
    HeaderComponent,
    ChatRoomNav,
    NotLogin
  },
  setup(){
    const memberInfo = ref({
      "email": "",
      "userInfo": {},
      "petInfo": {},
      "lifePic": []
    });
    //編輯資料
    const editInfo = async (field)=>{
      //會員名稱
      if(field=="會員名稱"){
        //await等待 Swal.fire返回值後，才回執行if(userName)後面的邏輯
        const { value: userNameTemp } = await Swal.fire({
          title: "編輯會員名稱",
          input: "text",
          inputLabel: "",
          inputValue:memberInfo.value.userInfo.name,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "不得為空白";
            }
          }
        });
        if(userNameTemp){
          memberInfo.value.userInfo.name = userNameTemp
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      //性別
      else if(field=="性別"){
        const { value: userGenderTemp } = await Swal.fire({
          title: "編輯會員性別",
          input: "select",
          inputOptions: {
              男性: "男性",
              女性: "女性",
              多元: "多元",
              不公開: "不公開",
          },
          inputPlaceholder:"請選擇",
          showCancelButton: true,
        });
        if(userGenderTemp){
          memberInfo.value.userInfo.gender = userGenderTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      //性取向
      else if(field=="性取向"){
        const { value: userSexualOrientationTemp } = await Swal.fire({
          title: "編輯會員性取向",
          input: "select",
          inputOptions: {
              異性戀: "異性戀",
              同性戀: "同性戀",
              雙性戀: "雙性戀",
              泛性戀: "泛性戀",
              無性戀: "無性戀",
              不公開: "不公開",
          },
          inputPlaceholder:"請選擇",
          showCancelButton: true,
        });
        if(userSexualOrientationTemp){
          memberInfo.value.userInfo.sexualOrientation = userSexualOrientationTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 寵物名稱
      else if(field=="寵物名稱"){
        const { value: petNameTemp } = await Swal.fire({
          title: "編輯寵物名稱",
          input: "text",
          inputLabel: "",
          inputValue:memberInfo.value.petInfo.name,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "不得為空白";
            }
          }
        });
        if(petNameTemp){
          memberInfo.value.petInfo.name = petNameTemp
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 寵物品種
      else if(field=="寵物品種"){
        const { value: petBreedTemp } = await Swal.fire({
          title: "編輯寵物品種",
          input: "text",
          inputLabel: "",
          inputValue:memberInfo.value.petInfo.breed,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "不得為空白";
            }
          }
        });
        if(petBreedTemp){
          memberInfo.value.petInfo.breed = petBreedTemp
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 寵物性別
      else if(field=="寵物性別"){
        const { value: petGenderTemp } = await Swal.fire({
          title: "編輯寵物性別",
          input: "select",
          inputOptions: {
              男生: "男生",
              女生: "女生",
              雌雄同體:"雌雄同體"
          },
          inputPlaceholder:"請選擇",
          showCancelButton: true,
        });
        if(petGenderTemp){
          memberInfo.value.petInfo.gender = petGenderTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 關於我
      else if(field=="關於我"){
        const { value: userIntroTemp } = await Swal.fire({
          input: "textarea",
          inputLabel: "關於我",
          inputPlaceholder: "關於你和寵物的故事...",
          inputAttributes: {
            "aria-label": "關於你和寵物的故事..."
          },
          showCancelButton: true,
        });
        if(userIntroTemp){
          memberInfo.value.userInfo.intro = userIntroTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 我的頭像
      else if(field=="我的頭像"){
        const { value: userPicTemp } = await Swal.fire({
          input: "url",
          inputLabel: "編輯我的頭像",
          inputPlaceholder: "置入有效圖片網址"
        });
        if(userPicTemp){
          memberInfo.value.userInfo.pic = userPicTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
      // 寵物頭像
      else if(field=="寵物頭像"){
        const { value: petPicTemp } = await Swal.fire({
          input: "url",
          inputLabel: "編輯寵物頭像",
          inputPlaceholder: "置入有效圖片網址"
        });
        if(petPicTemp){
          memberInfo.value.petInfo.pic = petPicTemp;
          axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
          .then(()=>{
            toastMessage.pushMessage("success","修改成功");
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      }
    }

    // 新增貼文
    const newPost = ref({
      postId:"",
      postImg:"",
      postText:"",
      createDate:"",
      whoLikes:[]
    })
    const createPost =()=>{
      let myuuid = crypto.randomUUID();
      newPost.value.postId = myuuid ;
      newPost.value.createDate = time.getCurrentTime();
      memberInfo.value.lifePic.push(newPost.value)
      
      axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
      .then(()=>{
        toastMessage.pushMessage("success","新增成功");
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    const clearPost =()=>{
      newPost.value.postImg = "";
      newPost.value.postText = "";
    }

    // 編輯貼文
    const editPostTemp = ref({
      postId:"",
      postImg:"",
      postText:"",
      createDate:"",
      whoLikes:[]
    })
    const editPost = (data)=>{
      editPostTemp.value.postId = data.postId;
      editPostTemp.value.postImg = data.postImg;
      editPostTemp.value.postText = data.postText;
      editPostTemp.value.whoLikes = data.whoLikes
    }

    const sendEditPost =()=>{
      editPostTemp.value.createDate = time.getCurrentTime();

      for(let i=0 ; i<memberInfo.value.lifePic.length ; i++){
        if(memberInfo.value.lifePic[i].postId == editPostTemp.value.postId){
          //深層複製 - 因為不是要賦予指向
          memberInfo.value.lifePic[i] = JSON.parse( JSON.stringify(editPostTemp.value) )
        }
      }
      
      axios.patch(`${apiUrl}/users/${userId.value}`,memberInfo.value)
      .then(()=>{
        toastMessage.pushMessage("success","編輯成功");
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    // 查看誰按讚
    const users=ref([]);
    const likersInfo = ref([]);

    const seeWhoLikes = (likerAry)=>{
      likersInfo.value = [];
      likerAry.forEach( element => {
        let findResult = users.value.filter( obj=>{
          return obj.id == element
        })
        likersInfo.value.push(findResult[0])
      });
    }

    const userId = ref("");
    onMounted(()=>{
      status.navState = "aboutme";
      userId.value = localStorage.getItem("userId");

      if(userId.value){
        axios.get(`${apiUrl}/users/${userId.value}`)
          .then((res)=>{
            memberInfo.value.email = res.data.email;
            memberInfo.value.userInfo = res.data.userInfo;
            memberInfo.value.petInfo = res.data.petInfo;
            memberInfo.value.lifePic = res.data.lifePic;
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
      memberInfo,
      newPost,
      userId,
      editPostTemp,
      likersInfo,

      editInfo,
      createPost,
      clearPost,
      seeWhoLikes,
      editPost,
      sendEditPost,
    }
  }
}
</script>

<template>
  <HeaderComponent/>
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
                <div @click="editInfo('我的頭像')" class="headPicEffect ratio ratio-1x1">
                  <img v-if="memberInfo.userInfo.pic" :src="memberInfo.userInfo.pic" alt="userPic">
                  <img v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_memberPic.png?raw=true" alt="defaulfUserPic">
                </div>
              </div>
              <!-- 資料 -->
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>會員名稱</span>
                </div>
                <div @click="editInfo('會員名稱')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.userInfo.name" class="text-center">{{memberInfo.userInfo.name}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
                </div>
              </div>
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>性別</span>
                </div>
                <div @click="editInfo('性別')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.userInfo.gender" class="text-center">{{memberInfo.userInfo.gender}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
                </div>
              </div>
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>性取向</span>
                </div>
                <div @click="editInfo('性取向')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.userInfo.sexualOrientation" class="text-center">{{memberInfo.userInfo.sexualOrientation}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
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
                <div @click="editInfo('寵物頭像')" class="headPicEffect ratio ratio-1x1">
                  <img v-if="memberInfo.petInfo.pic" :src="memberInfo.petInfo.pic" alt="petPic">
                  <img v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_petPic.png?raw=true" alt="defaultPetPic">
                </div>
              </div>
              <!-- 資料 -->
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>寵物名稱</span>
                </div>
                <div @click="editInfo('寵物名稱')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.petInfo.name" class="text-center">{{memberInfo.petInfo.name}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
                </div>
              </div>
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>寵物品種</span>
                </div>
                <div @click="editInfo('寵物品種')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.petInfo.breed" class="text-center">{{memberInfo.petInfo.breed}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
                </div>
              </div>
              <div class="mb-5">
                <div class="d-flex align-items-center mb-2">
                  <span>寵物性別</span>
                </div>
                <div @click="editInfo('寵物性別')" class="memberEffect border border-hangout-second border-2 py-3">
                  <p v-if="memberInfo.petInfo.gender" class="text-center">{{memberInfo.petInfo.gender}}</p>
                  <p v-else class="text-center text-hangout-second fw-bold">請填寫</p>
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
              <div @click="editInfo('關於我')" class="memberEffect border border-hangout-second border-2 p-4">
                <p v-if="memberInfo.userInfo.intro">{{memberInfo.userInfo.intro}}</p>
                <p v-else class="text-hangout-second fw-bold">在這邊留下一些關於你和寵物的故事吧</p>
              </div>
            </div>
          </div>
          <!-- 生活照 -->
          <div class="row mt-6 mb-4">
            <div class="col-6 col-lg-9 d-flex align-items-center">
              <span>生活照</span>
            </div>
            <div class="col-6 col-lg-3">
              <button @click="clearPost" type="button" class="newPostBtn w-100 btn bg-hangout-decorate border-hangout-decorate" data-bs-toggle="modal" data-bs-target="#newPost">新增貼文</button>
            </div>
          </div>

          <!-- 新增貼文彈窗 -->
          <div class="modal fade" id="newPost" tabindex="-1" aria-labelledby="newPostModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">新增貼文</h5>
                </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row">

                      <div class="col-12 mb-4">
                        <div class="bg-white shadow-sm border border-hangout-second border-2" style="border-radius: 30px;">
                          <div class="bg-hangout-block p-5" style="border-radius: 30px;">
                            <div class="row">
                              <div class="col-lg-12 mb-3">
                                <div class="form-floating">
                                  <input v-model.lazy="newPost.postImg" type="text" class="form-control w-100" id="postImg" placeholder="">
                                  <label for="postImg">置入圖片網址</label>
                                </div>
                              </div>
                              <div class="col-lg-4">
                                <div class="border border-hangout-second w-100">
                                  <div class="ratio ratio-1x1">
                                    <img v-if="newPost.postImg" :src="newPost.postImg" alt="" >
                                    <p v-else class="text-center">尚未置入圖片</p>
                                  </div>
                                </div>
                              </div>
                              <div class="col-lg-8">
                                <div class="form-floating">
                                  <textarea v-model="newPost.postText" class="form-control w-100" id="postText" placeholder="" style="height: 317px"></textarea>
                                  <label for="postText">貼文內容</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button @click="createPost" type="button" class="btn btn-hangout-primary text-white" data-bs-dismiss="modal">上傳</button>
                  <button @click="clearPost" type="button" class="btn btn-secondary" data-bs-dismiss="modal">放棄</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 貼文 -->
          <div v-if="memberInfo.lifePic.length > 0" class="row">
            <div v-for="item in memberInfo.lifePic" :key="item.createDate" class="col-12 mb-4">

              <div class="bg-white shadow-sm border border-hangout-second border-2" style="border-radius: 30px;">
                <div class="bg-hangout-block p-5" style="border-radius: 28px;">
                  <div class="d-sm-flex justify-content-sm-between">
                    <div class="ratio ratio-1x1 postPic">
                      <img class="w-100" :src="item.postImg" alt="">
                    </div>
                    <p class="postText mt-4 mt-sm-0">
                      {{item.postText}}
                    </p>
                  </div>
                </div>

                <div class="py-3 px-5 d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <span class="material-icons me-2">
                    favorite_border
                    </span>
                    <a @click="seeWhoLikes(item.whoLikes)" type="button" v-if="item.whoLikes.length>0" class="text-hangout-text" data-bs-toggle="modal" data-bs-target="#seeWhoLikes">{{item.whoLikes.length}}人</a>
                    <span v-else>0人</span>
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

                            <div v-for="liker in likersInfo" :key="liker.id" class="row border-bottom pb-3 mb-3">
                              <div class="col-6 d-flex justify-content-center">
                                <img :src="liker.userInfo.pic" alt="" style="width:80px;height:80px;">
                              </div>
                              <div class="col-6 d-flex align-items-center">
                                <p >{{liker.userInfo.name}}</p>
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

                  <a @click="editPost(item)" type="button" class="text-hangout-text text-decoration-none" data-bs-toggle="modal" data-bs-target="#editPost">編輯</a>
                   <!-- 編輯貼文彈窗 -->
                  <div class="modal fade" id="editPost" tabindex="-1" aria-labelledby="editPostModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">編輯貼文</h5>
                        </div>
                        <div class="modal-body">
                          <div class="container">
                            <div class="row">

                              <div class="col-12 mb-4">
                                <div class="bg-white shadow-sm border border-hangout-second border-2" style="border-radius: 30px;">
                                  <div class="bg-hangout-block p-5" style="border-radius: 30px;">
                                    <div class="row">
                                      <div class="col-lg-12 mb-3">
                                        <div class="form-floating">
                                          <input v-model.lazy="editPostTemp.postImg" type="text" class="form-control w-100" id="postImg" placeholder="">
                                          <label for="postImg">置入圖片網址</label>
                                        </div>
                                      </div>
                                      <div class="col-lg-4">
                                        <div class="border border-hangout-second w-100">
                                          <div class="ratio ratio-1x1">
                                            <img v-if="editPostTemp.postImg" :src="editPostTemp.postImg" alt="" >
                                            <p v-else class="text-center">未置入圖片</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-lg-8">
                                        <div class="form-floating">
                                          <textarea v-model="editPostTemp.postText" class="form-control w-100" id="postText" placeholder="" style="height: 317px"></textarea>
                                          <label for="postText">貼文內容</label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button @click="sendEditPost" type="button" class="btn btn-hangout-primary text-white" data-bs-dismiss="modal">完成</button>
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        </div>
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
                  <p class="text-center text-hangout-second fw-bold">目前還沒有貼文</p>
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
  // @import "../../assets/main";

  .headPicEffect{
    border: 4px solid $hangout-primary;
    &:hover{
      cursor: pointer;
      border: 4px solid $hangout-decorate;
      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
  }

  .memberEffect{
    background-color: $hangout-block;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    &:hover{
      cursor: pointer;
      background-color: $hangout-decorate;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }

  .newPostBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.95);
    }
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

</style>