<template>
  <div class="main" v-if="historyMessages.length !== 0">
    <div
      class="topItemLeft"
      style="
        width: 100%;
        display: flex;
        align-items: center;
        height: 20px;
        background-color: white;
        position: fixed;

        z-index: 10;
      "
    >
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span
        style="
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          font-size: large;
        "
        >网易云私信</span
      >
    </div>
    <div class="userMessage" ref="listContainer">
      <div
        v-for="(item, i) of historyMessages"
        :key="i"
        :class="
          i == historyMessages.length - 1 ? 'singleMessage' : 'lastMessage'
        "
      >
        <div class="fromUser" v-if="item.fromUser.userId == uid">
          <img :src="item.fromUser.avatarUrl" />
          <van-text-ellipsis
            rows="999"
            :content="item.msg.msg"
            expand-text="展开"
            collapse-text="收起"
            style="
              max-width: 70%;
              margin: 30px;
              margin-left: 0px;
              margin-top: 0px;
              border: 1px solid #999;
              white-space: pre-line;
              border-radius: 10px;
              padding: 8px;
            "
          />
        </div>
        <div class="toUser" v-if="item.fromUser.userId == toUid">
          <img :src="item.fromUser.avatarUrl" />
          <van-text-ellipsis
            rows="999"
            :content="item.msg.msg"
            expand-text="展开"
            collapse-text="收起"
            style="
              max-width: 70%;
              margin: 30px;
              margin-right: 0px;
              margin-top: 0px;
              border: 1px solid #999;
              white-space: pre-line;
              border-radius: 10px;
              padding: 8px;
            "
          />
        </div>
      </div>
    </div>
    <div class="userInput">
      <van-field
        v-model="inputText"
        style="
          max-width: 90%;
          background-color: rgb(181, 184, 178);
          border: 2px solid #999;
          padding: 0px;
          height: 70%;
          border-radius: 5px;
        "
        @keydown.enter="sendMessage"
      />
      <svg class="icon" aria-hidden="true" @click="sendMessage()">
        <use xlink:href="#icon-fasong"></use>
      </svg>
    </div>
  </div>
</template> 
<script>
import { getPrivateMessageHistory, sendMessage } from "@/request/api/home.js";
export default {
  name: "privateMessageHistory",
  data() {
    return {
      uid: null,
      historyMessages: [],
      toUid: null,
      inputText: "",
    };
  },
  created: async function () {
    this.uid = this.$route.query.uid;
    this.toUid = this.$route.query.toUid;
    var time = new Date();
    this.historyMessages = (
      await getPrivateMessageHistory(this.uid, time)
    ).data.msgs;
    console.log(this.historyMessages);
    for (var i = 0; i < this.historyMessages.length; i++) {
      this.historyMessages[i].msg = JSON.parse(this.historyMessages[i].msg);
    }
    this.historyMessages.sort((a, b) => a.time - b.time);
    this.$nextTick(() => {
      const container = this.$refs.listContainer;
      const lastMessage = container.lastElementChild;
      lastMessage.scrollIntoView({ behavior: "auto" });
    });
    console.log(this.toUid);
    console.log(this.uid);
  },
  methods: {
    sendMessage: async function () {
      let result = await sendMessage(this.uid, this.inputText);
      this.inputText = "";
      for (var i = 0; i < result.data.newMsgs.length; i++) {
        result.data.newMsgs[i].msg = JSON.parse(result.data.newMsgs[i].msg);
        this.historyMessages.push(result.data.newMsgs[i]);
      }
      this.$nextTick(() => {
        const container = this.$refs.listContainer;
        const lastMessage = container.lastElementChild;
        lastMessage.scrollIntoView({ behavior: "auto" });
      });
      console.log(1);
    },
  },
};
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .userMessage {
    width: 100%;
    height: 80vh;
    position: relative;
    top: 40px;
    .singleMessage {
      padding-bottom: 0.5rem;
      .fromUser {
        width: 100%;
        display: flex;
        justify-content: left;
        align-content: flex-start;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      .toUser {
        width: 100%;
        display: flex;
        justify-items: end;
        flex-direction: row-reverse;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
    .lastMessage {
      padding: 0px;
      .fromUser {
        width: 100%;
        display: flex;
        justify-content: left;
        align-content: flex-start;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
      .toUser {
        width: 100%;
        display: flex;
        justify-items: end;
        flex-direction: row-reverse;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
  }
  .userInput {
    width: 100%;
    height: 0.8rem;
    background-color: rgb(181, 184, 178);
    border-top: 1px solid #999;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      svg {
        width: 0.4rem;
        height: 0.4rem;
      }
      width: 20%;
    }
  }
}
</style>
