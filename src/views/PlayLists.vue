<template>
  <div class="main">
    <div class="mainTop">
      <div class="topItemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
    </div>
    <div class="mainContent">
      <div class="contentItem" v-for="(item, i) of playLists" :key="i">
        <router-link
          :to="{
            path: '/itemMusic',
            query: { id: item.id, picUrl: item.picUrl },
          }"
        >
          <img :src="item.coverImgUrl" />
          <p>{{ item.name }}</p>
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang"></use>
            </svg>
            {{ changeCount(item.playCount) }}
          </span>
        </router-link>
      </div>

      <van-back-top bottom="10vh" />
    </div>
  </div>
</template>
<script>
import { getPlayLists } from "@/request/api/home.js";
export default {
  name: "playLists",
  data() {
    return {
      playLists: [],
    };
  },
  created: async function () {
    var time = new Date().getTime();
    this.playLists = (await getPlayLists(time)).data.playlists;
    console.log(this.playLists);
  },
  methods: {
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
};
</script>
<style scoped lang="less">
.main {
  width: 100vw;
  height: 100%;
  background-color: #fbab7e;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);

  position: relative;

  .mainContent {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

    .contentItem {
      margin: 10px;
      width: 40%;
      height: 40%;
      position: relative;
      img {
        height: 3rem;
        border-radius: 0.2rem;
      }
      .playCount {
        position: absolute;
        display: flex;
        align-items: center;
        top: 0%;
        right: 0%;
        font-size: 0.24rem;
        color: #fff;
        padding: 0.1rem;
        svg{
            width: 0.4rem;
            height: 0.4rem;
        }
      }
    }
  }
}
</style>
