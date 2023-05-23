<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in musicList" :key="item" class="swipeItem">
          <router-link
            :to="{
              path: '/itemMusic',
              query: { id: item.id, picUrl: item.picUrl },
            }"
          >
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home";
export default {
  name: "musicList",
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGedan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
    },
    changeCount: function (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
  mounted() {
    this.getGedan();
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    width: 100%;
    height: 4rem;
    display: flex;
    .my-swipe {
      height: 100%;
      .swipeItem {
        position: relative;
        padding: 0.05rem;
        .playCount {
          position: absolute;
          top: 0;
          right: 0;
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #fff;
          padding: 0.1rem;
          //   background-color: rgba(0, 0, 0, 0.3);
          border-radius: 0 0 0 0.2rem;
        }
      }
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.2rem;
      }
    }
  }
}
.playCount svg {
  font-size: 0.1rem;
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.02rem;
}
</style>