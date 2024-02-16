<script>
import { onMounted } from 'vue';
import chatRoomStore from '../../stores/chatRoomStore';
import { storeToRefs } from 'pinia';

export default {
  setup(){
    const chatRoom = chatRoomStore();
    const { userId,targetId} = storeToRefs(chatRoom)

    onMounted(()=>{
      userId.value = localStorage.getItem("userId");
      targetId.value = "";
    })

    return{
      userId
    }
  }

}
</script>


<template>
  <!-- 迎接畫面 -->
  <div class="py-7 container d-flex justify-content-center align-items-center">
    <p class="text-center fw-bold fs-3 text-hangout-primary">Hello 歡迎來到HangOut！請選擇聊天對象</p>
  </div>
</template>

<style>

</style>