<script>
  import { mapActions } from 'pinia';
  import loginStore from '../stores/loginStore';

  export default {
    data(){
      return{
        showLogoutBtn:false,
      }
    },
    methods:{
      ...mapActions(loginStore,['logout'])
    },
    mounted(){
      if(localStorage.getItem("userId")){
        this.showLogoutBtn = true;
      }
    }
  }
</script>

<template>
  <header class="bg-hangout-primary">
    <div class="container">
      <div class="row justify-content-end">
        <!-- 左邊也加一個，讓logo可以置中 -->
        <div class="col-3 col-lg-2"></div>
        <div class="col-6 col-lg-8 d-flex justify-content-center">
          <router-link to="/about" type="button" class="text-decoration-none">
            <p class="fs-6 logoBtn">Hang Out</p>
          </router-link>
        </div>
        <div class="col-3 col-lg-2">
          <button v-if="showLogoutBtn " @click="logout" type="button" class="logoutBtn p-1 w-100 btn bg-hangout-decorate border-hangout-decorate">登出</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  @import "../assets/main";

  header{
    padding: 16px 0px 16px 0px;
    @include pc{
        padding: 24px 0px 32px 0px;
    }
  }

  .logoBtn{
    color:#fff;
    position: relative;
    &::before {
      position:absolute;
      content:"";
      background-color: $hangout-decorate;
      border-radius:8px;
      height:8px;
      width:70px;
      top:100%;
    }
  }

  .logoutBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.95);
      box-shadow:none
    }
  }
  
</style>