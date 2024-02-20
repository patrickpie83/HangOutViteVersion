<script>
export default {

}
</script>

<template>
  <div class="banner position-relative" >
    <div class="container pt-5 mb-7">
      <div class="d-flex">
        <h1 class="mt-5 mt-lg-0 text-white fs-2 position-absolute start-50 translate-middle-x logo" >Hang Out</h1>
        <p class="indexText me-5 text-white position-absolute end-0" >以寵物為主題的交友聊天室</p> 
      </div>
    </div>

    <div class="container loginArea">
      <div class="row justify-content-center mb-5">
        <div class="col-10 col-lg-4">
          <router-link to="/login" type="button" class="btn w-100 py-4 py-lg-5 border-0 loginBtn text-decoration-none">
            <div class="d-flex justify-content-center">
              <p class="loginText me-2 me-lg-4">立即登入</p>
              <p class="fs-6 loginLogo">Hang Out</p>
            </div>
          </router-link>
        </div>
      </div>

      <div class="row">
        <div class="col-10 col-lg-6 mx-auto mb-4 mb-lg-0">
          <div class=" bg-hangout-second py-5 py-lg-4 px-3 px-sm-5 px-lg-3 shadow" style="border-radius:60px;height:100%;">
            <div class="d-flex flex-column flex-lg-row align-items-center align-items-lg-start">
              <img class="indexImg" src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_indexFemale.png?raw=true" alt="img_indexFemale">
              <div class="mt-3 mt-lg-0 ms-lg-4">
                <p class="text-hangout-decorate mb-3 mb-lg-4">Emmy</p>
                <p class="text-hangout-decorate">
                  我的貓叫咕嚕，不過最近好多人叫她咪咪，不知道為什麼？
                  最喜歡帶貓出門逛街了，希望可以認識喜歡逛街也喜歡寵物的朋友！
                  </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-10 col-lg-6 mx-auto">
          <div class=" bg-hangout-second py-5 py-lg-4 px-3 px-sm-5 px-lg-3 shadow" style="border-radius:60px;height:100%;">
            <div class="d-flex flex-column flex-lg-row align-items-center align-items-lg-start">
              <img class="indexImg" src="https://github.com/patrickpie83/HangOut/blob/master/public/images/img_indexMale.png?raw=true" alt="img_indexMale">
              <div class="mt-3 mt-lg-0 ms-lg-4">
                <p class="text-hangout-decorate mb-3 mb-lg-4">路易斯</p>
                <p class="text-hangout-decorate">
                  我養了三隻狗，照片牽的是奶茶，他最喜歡到海邊玩了，我都會帶著他一起衝浪。
                  最近想再養隻貓，可以給些建議嗎～
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss" scoped>

  .banner{
    background-image: url("https://github.com/patrickpie83/HangOut/blob/master/public/images/img_banner.png?raw=true");
    background-position: center center;
    height:1200px;
    background-size: cover;
    @include sm{
      height:1400px;
    }
    @include pc{
      height:960px;
    }
  }

  .logo::before {
    position:absolute;
    content:"";
    background-color: $hangout-decorate;
    border-radius:8px;
    height:16px;
    width:100%;
    top:120%;
  }

  .indexText{
    font-size: 12px;
    @include pc{
      font-size: 16px;
    }
  }

  .indexImg{
    width: 210px;
    @include sm{
      width: 324px;
    }
    @include pc{
      width: 180px;
    }
    @include pc-xl{
      width: 288px;
    }
  }

  .loginArea{
    margin-top:200px;
    @include sm{
      margin-top:360px;
    }
    @include pc{
      margin-top:320px;
    }
  }

  .loginBtn{
    background-color: #fff;
    border-radius:60px;

    .loginText{
        color:$hangout-primary;
        @include pc{
          font-size: 24px;
        }
      }

    .loginLogo{
      color:$hangout-primary;
      position: relative;
      &::before {
        position:absolute;
        content:"";
        background-color: $hangout-decorate;
        border-radius:8px;
        height:8px;
        width:70px;
        bottom:-30%;
        @include pc{
          bottom:10%;
        }
      }
    }

    &:hover{
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      background-color:$hangout-primary;
      .loginText{
        color:#fff;
      }
      .loginLogo{
        color:#fff;
      }
    }

    &:active {
      background-color:$hangout-primary!important;
      transform: scale(0.95);
      box-shadow:none
    }
  }

</style>>
