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
        >内地mv排行榜</span
      >
    </div>
    <div class="mainContent">
      <div
        class="contentItem"
        v-for="(item, i) of videoList"
        :key="i"
        @click="videoPlay(item)"
      >
        <img :src="item.cover" />
        <p>{{ item.name }}</p>
        <div class="dianZan">
          <div class="rank">
            <p>{{ i + 1 }}</p>
          </div>
          <div class="playCount">
            <svg aria-hidden="true" class="dianZanImg">
              <use xlink:href="#icon-a-bofang1"></use>
            </svg>
            <p class="dianZanCount">{{ item.playCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTopMV } from "@/request/api/home.js";
export default {
  name: "mvList",
  data() {
    return {
      videoList: [],
    };
  },
  created: async function () {
    var time = new Date().getTime();
    this.videoList = (await getTopMV()).data.data;
  },
  methods: {
    videoPlay: function (data) {
      this.$router.push({
        name: "MvPlay",
        params: {
          video: JSON.stringify(data),
        },
      });
    },
  },
};
</script>
<style scoped lang="less">
.main {
  width: 100vw;
  height: 90%;
  // overflow-y: auto;
  .mainContent {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    // overflow-y: auto;
    .contentItem {
      width: 40%;
      height: 100%;
      position: relative;
      margin-top: 0.36rem;
      margin-top: 40px;
      padding-bottom: 50px;
      img {
        width: 3rem;
        height: 2.2rem;
        border-radius: 0.2rem;
      }
      .dianZan {
        position: absolute;
        margin: 0px;
        top: 0%;
        right: 2%;
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        .dianZanImg {
          width: 0.5rem;
          height: 0.5rem;
          fill: #999;
        }
        .dianZanCount {
          color: #999;
        }
        .rank {
          width: 0.5rem;
          display: flex;
          justify-content: space-evenly;
          color: aqua;
        }
        .playCount {
          display: flex;
          justify-content: right;
          align-items: center;
        }
      }
    }
  }
}
</style>
