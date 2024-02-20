<script>
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import chatRoomStore from '../../stores/chatRoomStore';
import { storeToRefs } from 'pinia';

export default {
  setup(){
    //聊天室內容
    const chatRoom = chatRoomStore();
    const { userId, targetId, renderMsgData} = storeToRefs(chatRoom)
    const { getTargetRoomMsg, getTargetInfo } = chatRoom;

    //滾動條保持在最底部
    const scrollBtmContainer = ref(null);

    const scrollToBottom = () => {
      if (scrollBtmContainer.value) {
        scrollBtmContainer.value.scrollTop = scrollBtmContainer.value.scrollHeight;
        scrollToBottomAgain();
      }
    };

    const scrollToBottomAgain = () => {
      if (scrollBtmContainer.value) {
        scrollBtmContainer.value.scrollTop = scrollBtmContainer.value.scrollHeight;
      }
    };
    
    watch( renderMsgData , ()=>{
      scrollToBottom();
    })

    onMounted(()=>{
      userId.value = localStorage.getItem("userId");
      targetId.value = getCurrentInstance().proxy.$route.query.targetId;
      getTargetRoomMsg();
      getTargetInfo();
    })

    return{
      scrollBtmContainer,
      userId,
      targetId,
      renderMsgData
    }
  }
}
</script>

<template >
  <div class="chatRoomArea pt-3 px-2 px-lg-4" ref="scrollBtmContainer" style="overflow-y: scroll">
    <!-- 如果是自己傳的，在右側 -->
    <div class="row w-100 gx-0" v-for="item in renderMsgData" :key="item.msgKey">
      
      <div v-if="item.sender == userId" class="d-flex justify-content-end ms-auto col-8">
        <div class="d-flex flex-column-reverse flex-lg-row align-items-end justify-content-lg-end mb-5">
          <div class="timeArea d-flex align-items-end me-2">
            <p>{{item.time}}</p>
          </div>
          <div class="msgArea bg-hangout-block">
            <p>{{item.msg}}</p>
          </div>
        </div>
      </div>
      
      <div v-else class="col-8">
        <div class="d-inline-flex flex-column flex-lg-row mb-5">
          <div class="msgArea bg-white me-2">
            <p>{{item.msg}}</p>
          </div>
          <div class="timeArea d-flex align-items-end ">
            <p>{{item.time}}</p>
          </div>
        </div>
      </div>

    </div>
  </div>  
</template>

<style lang="scss" scoped>

  .chatRoomArea{
    //訊息視窗的高度
    //需扣除header跟footer的高度最外層才不會有捲軸，並且完整顯示內容不被擋住
    //pc以下 66px 54px 共120
    //pc 90px 80px 共170

    // 輸入框
    // pc以下 70px
    // pc  100px
    height:calc(100vh - 190px); 
    @include pc{
        height:calc(100vh - 270px);
    }
  }

  .msgArea{
    border: 1px solid $hangout-text;
    padding: 12px;
    border-radius: 24px;
    @include pc{
        padding: 24px;
    }
  }

  .timeArea{
    color: $hangout-primary;
    font-size: 8px;
    @include pc{
        font-size: 12px;
    }
  }
  
</style>