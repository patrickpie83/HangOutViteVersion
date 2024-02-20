<script>
  export default {
  }
</script>

<template>
  <div class="bg-hangout-bg py-7" style="height:100vh">
    <div class="container">
      <p class="text-center fw-bold fs-3 text-hangout-primary">您還尚未登入會員</p>
      <div class="row mt-7">
        <div class="col-6 mx-auto">
          <router-link to="/login" type="button" class="goBtn btn bg-hangout-decorate border-hangout-decorate w-100 rounded-0">來去登入</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  .goBtn{
    &:hover{
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    
    &:active {
      transform: scale(0.98);
      box-shadow:none
    }
  }

</style>