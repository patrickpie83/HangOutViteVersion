<script>
import { ref } from 'vue'
import LoginNav from '@/components/LoginNav.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import loginStore from '../../stores/loginStore.js';

export default {
  components:{
    LoginNav,
    HeaderComponent
  },
  // 利用 navigation guard 可以避免這個 component 被 mount，從而提升效率，或避免畫面閃現而過
  // https://router.vuejs.org/guide/advanced/data-fetching.html#Fetching-Before-Navigation
  beforeRouteEnter(to, from, next){
    const userId= localStorage.getItem("userId");
    if (userId) {
      next({ path: '/browse' })
    }
    else {
      next()
    }
  },
  setup(){
    const loginInfo = ref({
      "email":"",
      "password":""
    })

    const { login } = loginStore();

    return{
      loginInfo,
      login
    }
  }
}
</script>

<template>
  <HeaderComponent/>
  <div class="bg-hangout-bg pt-2 pt-lg-4 pb-7">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 text-center mb-2 mb-lg-0">
          <img class="loginImg" src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_login.png?raw=true" alt="img_login">
        </div>
        <div class="col-lg-6">
          <form class="mt-lg-7">
            <label for="loginEmail" class="form-label mb-2">電子信箱</label>
            <input v-model="loginInfo.email" type="email" class="form-control rounded-0 border-0 shadow-sm mb-4" id="loginEmail" placeholder="請輸入電子信箱" autocomplete="username">
            <label for="loginPassword" class="form-label mb-2">密碼</label>
            <input v-model="loginInfo.password" type="password" class="form-control rounded-0 border-0 shadow-sm mb-5" id="loginPassword" placeholder="請輸入密碼" autocomplete="current-password">
            <button type="button" class="loginBtn btn bg-hangout-decorate border-hangout-decorate w-100 rounded-0" @click="login(loginInfo)">登入</button>
            <a class="d-block text-hangout-primary mt-4 text-decoration-none text-end" href="">忘記密碼？</a>
          </form>
        </div>
      </div>
    </div>
  </div>
  <LoginNav/>
</template>

<style lang="scss" scoped>
  
  .loginImg{
    width: 35%;
    border: 12px solid $hangout-block;
    border-radius: 50%;
    @include pad{
      border: 8px solid $hangout-block;
      width: 20%;
    }
    @include pc{
      border: 32px solid $hangout-block;
      width: 100%;
    }
  }
  ::placeholder{
    color:$hangout-primary!important;
  }

  .loginBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow:none
    }
  }

</style>