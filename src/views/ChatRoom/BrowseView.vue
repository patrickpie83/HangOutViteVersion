<script>
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChatRoomNav from '../../components/ChatRoomNav.vue';
import NotLogin from '../../components/NotLogin.vue';
import statusStore from '../../stores/statusStore';
import { onMounted, ref } from 'vue';

const apiUrl = import.meta.env.VITE_API_URL;
const status = statusStore();

export default {
  components:{
    HeaderComponent,
    ChatRoomNav,
    NotLogin
  },
  setup(){
    // 瀏覽頁各使用者資料
    const usersData = ref([]);
    const isLoading = ref(false);

    const userId = ref("");
    onMounted(()=>{
      status.navState = "browse";
      userId.value = localStorage.getItem("userId");

      if(userId.value){
        isLoading.value =true;
        axios.get(`${apiUrl}/users`)
        .then((res)=>{
          //陣列filter - 將自己以外的使用者過濾出來
          usersData.value = res.data.filter(value => value.id != userId.value );
          isLoading.value = false;
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    })
    
    return{
      usersData,
      userId,
      isLoading
    }
  }
}
</script>

<template>
  <HeaderComponent/>
  <div class="bg-hangout-bg pt-4 pb-7" v-if="userId">
    <VueLoading 
      v-model:active = "isLoading" 
      />

    <div class="container">
      <div class="row">
        <div v-for="item in usersData" :key="item.id" class="col-sm-6 mb-4">
          <router-link :to="{ path: '/person/'+item.id, query: { id : item.id } }" class="browseCard">
            <div class="position-relative">
              <div class="d-block">
                <img class="picSize" v-if="item.userInfo.pic" :src="item.userInfo.pic" :alt="item.userInfo.name">
                <img class="picSize" v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_memberPic.png?raw=true" alt="defaulfUserPic">
              </div>
              <span class="namePosition">{{item.userInfo.name}}</span>
            </div>
            <div class="position-relative">
              <div class="d-block">
                <img class="picSize" v-if="item.petInfo.pic" :src="item.petInfo.pic" :alt="item.petInfo.name">
                <img class="picSize" v-else src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_petPic.png?raw=true" alt="defaultPetPic">
              </div>
              <span v-if="item.petInfo.name" class="namePosition">{{item.petInfo.name}}</span>
              <span v-else class="namePosition">未設定</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <NotLogin v-else />

  <ChatRoomNav/>
</template>


<style lang="scss" scoped>
  @import "../../assets/main";
  
  .browseCard{
    padding: 24px 0px;
    display: flex;
    justify-content: space-evenly;
    background-color: $hangout-primary;
    border-radius: 30px;

    &:hover{
      cursor: pointer;
      background-color: $hangout-second;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    }
    @include pc{
        padding: 36px 0px;
    }
  }

  .picSize{
    width: 117px;
    height: 117px;
    @include xs{
        width: 140px;
        height: 140px;
    }
    @include ss{
        width: 176px;
        height: 176px;
    }
    @include sm{
        width: 94px;
        height: 94px;
    }
    @include pad{
        width: 140px;
        height: 140px;
    }
    @include pc{
        width: 176px;
        height: 176px;
    }
     @include pc-xl{
        width: 234px;
        height: 234px;
    }
  }

  .namePosition{
    position: absolute;
    color: #fff;
    bottom: 0%;
    left: 8px;
  }

</style>