<script>
import {onMounted, ref } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChatRoomNav from '../../components/ChatRoomNav.vue';
import NotLogin from '../../components/NotLogin.vue';
import ChatNav from '../../components/ChatNav.vue';
import statusStore from '../../stores/statusStore';
import chatRoomStore from '../../stores/chatRoomStore';

export default {
  components:{
    HeaderComponent,
    ChatRoomNav,
    ChatNav,
    NotLogin
  },
  setup(){
    const status = statusStore();

    const chatRoom = chatRoomStore();
    const { sendMsg } = chatRoom;
    const newMsg = ref("");

    const callSendMsg = ()=>{
      if(!newMsg.value.trim()){
        return
      }
      sendMsg(newMsg.value);
      newMsg.value = "";
    }

    const userId = ref("");
    onMounted(()=>{
      status.navState = "chatroom";
      userId.value = localStorage.getItem("userId");
    })
    
    return{
      status,
      userId,
      newMsg,
      callSendMsg
    }
  }
}
</script>

<template>
  <HeaderComponent/>
  <!-- 背景 -->
  <div class="bg-hangout-second border border-hangout-second" v-if="userId">
    <div class="myContainer">

      <!-- 主要內容 -->
      <div class="d-flex position-relative" >

        <!-- 側邊選單選人 -->
        <ChatNav class="w-25 chatRoomTargets"/>

        <!-- 聊天內容 -->
        <content class="w-75 bg-hangout-bg">
          <router-view/>

          <div class="inputArea bg-hangout-primary position-absolute d-flex justify-content-center align-items-center">
            <input v-model="newMsg" @keyup.enter="callSendMsg" type="text" class="inputText px-4" placeholder="輸入訊息">
            <button @click="callSendMsg" type="button" class="sendBtn ms-2">送出</button>
          </div>
        </content>

      </div>
      

    </div>
  </div>

  <NotLogin v-else />
  
  <ChatRoomNav/>
</template>


<style lang="scss" scoped>

  .myContainer{
    margin: 0px 8px;
  }

  .chatRoomTargets{
    height:calc(100vh - 120px);
    @include pc{
      height:calc(100vh - 170px);
    }
  }
  
  .inputArea{
    width: 75%;
    height: 70px;
    bottom:0px;
    @include pc{
      height: 100px;
    }
  }

  .inputText{
    background-color: $hangout-bg;
    border: none;
    border-radius: 30px;
    height: 65%;
    width: 70%;
    @include pc{
      height: 50%;
      width: 70%;
    }
  }

  .sendBtn{
    font-size: 12px;
    background-color: $hangout-decorate;
    border: none;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    @include pc{
      font-size: 16px;
      height: 50px;
      width: 50px;
    }

    &:hover{
      box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
</style>