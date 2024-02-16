<script>
import {ref} from 'vue'
import LoginNav from '@/components/LoginNav.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import loginStore from '../../stores/loginStore.js';

export default {
  components:{
  LoginNav,
  HeaderComponent
  },
  setup(){
    const signupInfo = ref({
      "name":"",
      "email":"",
      "password":""
    })

    const { signup } = loginStore();

    return{
      signupInfo,
      signup
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
          <img class="loginImg" src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_signup.png?raw=true" alt="img_signup">
        </div>
        <div class="col-lg-6">
          <form class="mt-lg-7">
            <label for="signupName" class="form-label mb-2">用戶名稱</label>
            <input v-model="signupInfo.name" type="text" class="form-control rounded-0 border-0 shadow-sm mb-4" id="signupName" placeholder="請輸入用戶大名">
            <label for="signupEmail" class="form-label mb-2">電子信箱</label>
            <input v-model="signupInfo.email" type="email" class="form-control rounded-0 border-0 shadow-sm mb-4" id="signupEmail" placeholder="請輸入電子信箱">
            <label for="signupPassword" class="form-label mb-2">密碼</label>
            <input v-model="signupInfo.password" type="password" class="form-control rounded-0 border-0 shadow-sm mb-5" id="signupPassword" placeholder="請輸入密碼">
            <button @click="signup(signupInfo)" type="button" class="signupBtn btn bg-hangout-decorate border-hangout-decorate w-100 rounded-0">註冊</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <LoginNav/>
</template>



<style lang="scss" scoped>
  @import "../../assets/main";
  
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

  .signupBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow:none
    }
  }

</style>