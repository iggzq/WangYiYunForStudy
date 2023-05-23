<template>
  <transition enter-active-class="expand" leave-active-class="exit">
    <div class="main" name="main">
      <div class="TopBackground">
        <img :src="dailyList[0].al.picUrl" />
        <div class="topItemLeft" @click="exit">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
        </div>
        <span class="name">每日推荐</span>
      </div>
      <div class="itemList">
        <div class="item" v-for="(item, i) in dailyList" :key="i">
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
  </transition>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "dailyRecommend",
  data() {
    return {
      dailyList: [],
      dailyRec: null,
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
    exit: function () {
      document.getElementsByName("main")[0].classList.add("exit");
      this.$router.go(-1);
    },
    ...mapMutations(["updateAllPlayList", "updatePlayList", "updatePlayIndex"]),
  },
  created() {
    this.dailyRec = JSON.parse(this.$route.query.dailyRec);
    this.dailyList = JSON.parse(this.$route.query.dailyList);
  },
  computed: {
    ...mapState(["playListIndex", "playList"]),
  },
};
</script>
<style lang="less" scoped>
.exit {
  animation: fadeOut 0.5s ease forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

.main {
  .expand {
    animation: fade 5s;
  }
  @keyframes fade {
    0% {
      transform: translateY(5rem);
    }
  }
  width: 100%;
  // display: flex;
  // flex-direction: column;

  .TopBackground {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .topItemLeft {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin: 0 10px;
      z-index: 0;
      position: absolute;
    }
    img {
      width: 100%;
      height: 10rem;
      height: 40%;
      position: relative;

      // z-index: -1;
      filter: blur(0.5rem);
    }
    .name {
      z-index: 0;
      color: rgb(143, 33, 33);
      font-size: xx-large;
      font-weight: 600;
      position: absolute;
      align-self: center;
      top: 150px;
    }
  }
  .itemList {
    border-radius: 5%;
    width: 100%;
    position: absolute;
    top: 40%;
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
