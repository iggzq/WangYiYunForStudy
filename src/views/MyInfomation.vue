<template>
  <div class="main" v-if="userInfo && likeMusicList.length != 0 && firstLikeMusic != null">
    <div class="userIcon">
      <img :src="userInfo.data.profile.avatarUrl" />
    </div>
    <div class="iconBorder">
      <span class="userName">{{ userInfo.data.profile.nickname }}</span>
    </div>

    <div class="likeMusicListDiv" @click="goLikeMusicList()">
      <div class="leftLikeMusicDiv">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-xihuan3"></use>
        </svg> -->
        <img :src="firstLikeMusic.data.songs[0].al.picUrl" />
        <svg class="bofang" aria-hidden="true">
          <use xlink:href="#icon-a-xihuan3"></use>
        </svg>
        <span class="likeMusicText">我喜欢的音乐</span>
        <span class="likeMusicLength"
          >{{ this.likeMusicList.data.ids.length }}首</span
        >
      </div>
      <div class="rightMusicListDiv" @click="goPlayLoveModel">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_xindong"></use>
        </svg>
        <span>心动模式</span>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { getUserInfo, getLikeList, getMusicUrl,getHeartLoveModel,getUserDetail } from "@/request/api/home.js";
export default {
  name: "myInfomation",
  created: async function () {
    if (Cookies.get("MUSIC_A_T") === undefined) {
      console.log("未登录");
      console.log(Cookies.get())
      this.$router.push("login");
    } else {
      this.userInfo = await getUserInfo();
      this.likeMusicList = await getLikeList(this.userInfo.data.profile.userId);
      console.log(this.likeMusicList);
      this.firstLikeMusic = await getMusicUrl(this.likeMusicList.data.ids[0]);
    }
  },
  data() {
    return {
      userInfo: null,
      likeMusicList: [],
      firstLikeMusic: null,
    };
  },
  methods: {
    goLikeMusicList: function () {
      this.$router.push({
        path: "/likeMusicList",
        query:{
          firstLikeMusic: JSON.stringify(this.firstLikeMusic),
          itemLikeList: JSON.stringify(this.likeMusicList),
        }
      });
    },
    goPlayLoveModel:async function(){
      let result1 = await getUserDetail();
      let user = Cookies.get("user");
      console.log(user);
      console.log(result1);
    }
  },
};
</script>
<style lang="less" scoped>
.main {
  position: relative;
  width: 100%;
  height: 93vh;
  .userIcon {
    position: absolute;
    top: 6%;
    left: 37%;
    img {
      position: absolute;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      z-index: 1  ;
    }
  }
  .iconBorder {
    position: absolute;
    z-index: 0;
    top: 13%;
    left: 5%;
    border-radius: 20px;
    border: 2px solid #999;
    width: 90%;
    height: 10%;
    background-color: #999;
    .userName {
      position: absolute;
      top: 60%;
      left: 45%;
    }
  }
  .likeMusicListDiv {
    position: absolute;
    z-index: 0;
    top: 26%;
    left: 5%;
    border-radius: 20px;
    border: 2px solid #999;
    width: 90%;
    height: 10%;
    .leftLikeMusicDiv {
      img {
        position: absolute;
        top: 10%;
        left: 4%;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        filter: blur(2px);
      }
      svg{
        position: absolute;
        left: 7%;
        top: 23%;
        width: 0.78rem;
        height: 0.78rem;
      }
      .likeMusicText {
        position: absolute;
        top: 27%;
        left: 23%;
        font-weight: 600;
      }
      .likeMusicLength {
        position: absolute;
        bottom: 25%;
        left: 23%;
        font-size: xx-small;
        color: #999;
      }
    }

    .rightMusicListDiv {
      border: 1px solid #999;
      width: 1.5rem;
      height: 0.6rem;
      position: absolute;
      right: 7%;
      top: 30%;
      border-radius: 100px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      svg {
        width: 0.5rem;
        height: 0.5rem;
      }
      font-size: xx-small;
    }
  }
}
</style>
