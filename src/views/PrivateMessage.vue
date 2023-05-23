<template>
  <div class="main">
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
    <div class="content">
      <div
        class="items"
        v-for="(item, i) of message"
        :key="i"
        @click="goPrivateMessageHistory(item)"
      >
        <div class="inside">
          <img :src="item.fromUser.avatarUrl" />
          <div class="text">
            <div class="line1">
              <p>{{ item.fromUser.nickname }}</p>
              <p>{{ item.lastMsgTime }}</p>
            </div>
            <div class="line2">
              <van-text-ellipsis
                :content="item.lastMsg.msg"
                style="width: 90%"
                rows="1"
              />
              <div class="count" v-if="item.newMsgCount != 0">
                <van-tag type="danger" style="border-radius: 50%">{{
                  item.newMsgCount
                }}</van-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPrivateMessage } from "@/request/api/home.js";
export default {
  name: "privateMessage",
  data() {
    return {
      message: [],
    };
  },
  methods: {
    goPrivateMessageHistory: function (item) {
      this.$router.push({
        path: "privateMessageHistory",
        query: {
          uid: item.fromUser.userId,
          toUid: item.toUser.userId,
        },
      });
    },
  },
  created: async function () {
    this.message = (await getPrivateMessage()).data.msgs;
    for (let i = 0; i < this.message.length; i++) {
      this.message[i].lastMsg = JSON.parse(this.message[i].lastMsg);
      this.message[i].lastMsgTime = new Date(
        this.message[i].lastMsgTime
      ).toLocaleString();
    }

    console.log(this.message);
  },
};
</script>
<style scoped lang="less">
.main {
  position: relative;
  z-index: 99999;
  background-color: white;
  .content {
    padding-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    .items {
      height: 10%;
      width: 100%;

      .inside {
        padding: 7px;
        display: flex;
        justify-content: left;
        // border-bottom: 1px solid #999;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        .text {
          width: 100%;
          .line1 {
            display: flex;
            justify-content: space-between;
          }
          .line2 {
            padding: 2px;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
div {
  .FooterMusic {
    display: none;
  }
}
</style>
