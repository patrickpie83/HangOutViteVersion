<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components:{
    HeaderComponent
  },
}
</script>

<template>
  <HeaderComponent/>
  <div class="bg-hangout-bg pt-2 pb-7">
    <div class="container">
      <div class="row">
        <div class="col-9 mx-auto py-7">
          <p class="fs-2 text-center lh-lg">
            這是一個以<strong>寵物開啟聊天</strong>模式的交友平台，<br>
          在這裡你可以盡情曬毛孩、認識新朋友。<br>
          專屬於兩個人的聊天室，為您創造無限的可能。
          </p>
          
        </div>
        <div class="col-4 mx-auto">
           <router-link to="/" type="button" class="backToHomeBtn btn btn-hangout-decorate w-100">
            回到首頁
           </router-link>
        </div>
      </div>
      <p class="fs-7 text-center mt-7">
        本網站僅為Vue框架練習作品，
        以模擬交友平台聊天室為主，
        勿留下機密資訊。
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .backToHomeBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow:none
    }
  }

</style>