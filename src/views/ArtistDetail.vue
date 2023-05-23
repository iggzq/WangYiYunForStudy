<template>
  <div class="main" v-if="artistDeatil != null">
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
        >歌手详情</span
      >
    </div>
    <div class="contentTop">
      <img :src="artistDeatil.artist.cover" class="topBackground" />

      <div class="artistContent">
        <img :src="artistDeatil.artist.cover" class="topCenterImg" />
        <div class="contentText">
          <p class="name">{{ artistDeatil.artist.name }}</p>
          <p class="imageDesc">{{ artistDeatil.identify.imageDesc }}</p>
          <p
            class="alias"
            v-for="(item, i) of artistDeatil.artist.alias"
            :key="i"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>

    <div class="musicList">
      <div class="item" v-for="(item, i) of musicList" :key="i">
        <div class="itemLeft" @click="playMusic(item)">
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
    </div>
    <van-back-top bottom="10vh" />
  </div>
</template>
<script>
import { getArtistDetail, getArtistTopMusic } from "@/request/api/home.js";
import { mapMutations, mapState } from "vuex";
export default {
  name: "artistDetail",
  data() {
    return {
      artist: null,
      artistDeatil: null,
      musicList: [],
    };
  },
  created: async function () {
    this.artist = JSON.parse(this.$route.query.artist);
    this.artistDeatil = (await getArtistDetail(this.artist.id)).data.data;
    this.musicList = (await getArtistTopMusic(this.artist.id)).data.songs;
    console.log(this.musicList);
  },
  methods: {
    playMusic: function (item) {
      this.updatePlayList(item);
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
};
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .contentTop {
    width: 100%;
    position: relative;
    .topBackground {
      width: 100%;
      position: relative;
      z-index: -1;
    }

    .artistContent {
      display: flex;
      flex-direction: column;
      align-items: center;
      .topCenterImg {
        border-radius: 50%;
        width: 1.65rem;
        height: 1.5rem;
        position: absolute;
        top: 75%;
        z-index: 1;
      }
      .contentText {
        border: 1px solid rgb(243, 237, 237);
        border-radius: 25px;
        background-color: rgb(243, 237, 237);
        position: absolute;
        width: 90%;
        left: 5%;
        top: 90%;
        height: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          position: relative;
          top: 25%;
        }
        .imageDesc {
          color: #999;
        }
        .alias {
          color: #999;
        }
      }
    }
  }
  .musicList {
    width: 100%;
    position: absolute;
    top: 51%;
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
