<template>
  <div class="TopNav">
    <van-tabs v-model:active="lastPage" class="menu" line-width="0rem">
      <van-tab title="我的" class="myInfo" @click="updateLastPage(0)">
        <myInfomation />
      </van-tab>
      <van-tab title="发现" class="discover" @click="updateLastPage(1)">
        <SwipeTop />
        <IconList />
        <MusicList />
      </van-tab>
      <van-tab title="云村" @click="updateLastPage(2)"> 
        <ProjectChoice />
      </van-tab>
      <van-tab title="视频" @click="updateLastPage(3)" style="overflow: hidden;">
        <VideoList />
      </van-tab>
    </van-tabs>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
    <div class="topLeft" @click="$router.push('/privateMessage')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import SwipeTop from "@/components/home/SwipeTop.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList";
import myInfomation from "@/views/MyInfomation.vue";
import ProjectChoice from "@/views/ProjectChoice.vue"
import VideoList from "@/views/VideoList.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    SwipeTop,
    IconList,
    MusicList,
    myInfomation,
    ProjectChoice,
    VideoList,
  },
  data() {
    return {};
  },
  watch: {
    activeItem() {
      console.log("我的");
      this.getActive(this.activeItem);
    },
  },
  methods: {
    ...mapMutations(["updateLastPage"]),
  },
  computed: {
    ...mapState(["lastPage"]),
  },
};
</script>

<style lang="less" scoped>
.TopNav {
  width: 100%;
  // padding: 10px;
  position: relative;

  // display: flex;
  // justify-content: space-between;
  .topLeft {
    position: fixed;
    top: 8px;
    left: 0%;
  }
  .topRight {
    position: fixed;
    top: 8px;
    right: 0%;
  }
  .active {
    font-weight: 900;
  }
  .menu {
    .discover {
      position: absolute;
      left: 0%;
      width: 100%;
    }
    .myInfo {
      position: absolute;
      left: 0%;
      width: 100%;
    }
  }
}
</style>