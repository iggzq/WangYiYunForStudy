<template>
  <div class="TopBackground">
    <img :src="firstLikeMusicPic" class="centerImg" />
    <img :src="firstLikeMusicPic" class="backgroundImg" />
    <div class="topItemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
    </div>
    <span class="name">我喜欢的音乐</span>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemLikeMusicDetail" :key="i">
        <div class="itemLeft" @click="playMusic()">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">
              {{ item1.name }}</span
            >
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-a-24gl-playSquare"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-a-31liebiao"></use>
          </svg>
        </div>
      </div>
      <van-back-top bottom="10vh" />
    </div>
  </div>
</template>
<script>
import { getMusicUrl } from "@/request/api/home.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "likeMusicList",
  data() {
    return {
      firstLikeMusicPic: null,
      itemLikeList: [],
      itemLikeMusicDetail: [],
    };
  },
  methods:{
    playMusic: function () {
      this.updateAllPlayList(this.itemLikeMusicDetail);
      this.incrementPlayListIndex();
    },
    incrementPlayListIndex: function () {
      // let num = playList.length;
      this.updatePlayIndex(this.playList.length - 1);
      // this.updatePlayIndex(num + 1);
    },
    ...mapMutations(["updateAllPlayList", "updatePlayList", "updatePlayIndex"]),
  },
  computed: {
    ...mapState(["playListIndex", "playList"]),
  },
  created: async function () {
    this.firstLikeMusicPic = JSON.parse(
      this.$route.query.firstLikeMusic
    ).data.songs[0].al.picUrl;
    this.itemLikeList = JSON.parse(this.$route.query.itemLikeList).data.ids;
    var ids = "";
    for (var i = 0; i < this.itemLikeList.length; i++) {
      if (i != this.itemLikeList.length - 1) {
        ids = ids + this.itemLikeList[i] + ",";
      } else {
        ids = ids + this.itemLikeList[i];
      }
    }
    this.itemLikeMusicDetail = (await getMusicUrl(ids)).data.songs;
  },
};
</script>

<style scoped lang="less">
.TopBackground {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100vw;
  height: 98vh;
  .topItemLeft {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    // margin: 0 10px;
    z-index: 0;
    position: fixed;
    opacity: 0.5;
  }
  .centerImg {
    width: 100%;
    height: 6rem;
    position: relative;
    z-index: -1;
    filter: blur(0.5rem);
  }
  .backgroundImg {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border-radius: 25%;
    top: 11%;
    left: 7%;
  }
  .description {
    position: absolute;
    color: #999;
    top: 37%;
    left: 54%;
  }
  .name {
    z-index: 0;
    color: rgb(143, 33, 33);
    font-size: xx-large;
    font-weight: 600;
    position: absolute;
    align-self: center;
    top: 100px;
    left: 53%;
  }

  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon {
          fill: #999;
        }
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
