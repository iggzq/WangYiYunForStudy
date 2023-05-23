<template>
  <div class="main">
    <div class="TopBackground">
      <img :src="ranking.data.playlist.tracks[0].al.picUrl" class="centerImg" />
      <img :src="ranking.data.playlist.tracks[0].al.picUrl" class="backgroundImg" />
      <div class="topItemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <span class="name">{{ ranking.data.playlist.name }}</span>
      <span class="description">{{ ranking.data.playlist.description }}</span>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in ranking.data.playlist.tracks" :key="i">
        <div class="itemLeft" @click.stop="playMusic(item)">
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
import { mapMutations, mapState } from "vuex";
export default {
  name: "ranking",
  data() {
    return {
      rankingList: [],
      ranking: null,
      rankingListName: '',
    };
  },
  methods: {
    incrementPlayListIndex: function () {
      // let num = playList.length;
      this.updatePlayIndex(this.playList.length - 1);
      // this.updatePlayIndex(num + 1);
    },
    playMusic: function (item) {
      this.incrementPlayListIndex();
      this.updatePlayList(item);
    },
    ...mapMutations(["updateAllPlayList", "updatePlayList", "updatePlayIndex"]),
  },
  created() {
    this.ranking = JSON.parse(this.$route.query.ranking);
  },
  computed: {
    ...mapState(["playListIndex", "playList"]),
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  animation: fadenum 0.5s;
  z-index: 1;
  @keyframes fadenum {
    0% {
      transform: translateX(250px);
    }
  }
  // display: flex;
  // flex-direction: column;
  .TopBackground {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .topItemLeft {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      // margin: 0 10px;
      z-index: 1;
      position: fixed;
      opacity: 0.5;
    }
    .centerImg {
      width: 100%;
      height: 10rem;
      height: 40%;
      position: relative;
      z-index: -1;
      filter: blur(0.5rem);
    }
    .backgroundImg {
      position: absolute;
      width: 3rem;
      height: 3rem;
      border-radius: 25%;
      top: 20%;
      left: 7%;
    }
    .description {
      position: absolute;
      color: #999;
      top: 37%;
      left: 54%;
    }
    .name {
      z-index: 1;
      color: rgb(143, 33, 33);
      font-size: xx-large;
      font-weight: 600;
      position: absolute;
      align-self: center;
      top: 100px;
      left: 53%;
    }
  }
  .itemList {
    width: 100%;
    position: absolute;
    top: 40%;
    background-color: #74ebd5;
    background-image: linear-gradient(90deg, #74ebd5 0%, #9face6 100%);

    .item {
      width: 100%;
      height: 1.4rem;
      top: 40%;
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