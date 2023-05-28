<template>
  <div @click.stop>
    <transition name="van-fade" class="van-fade">
      <div v-show="visible" class="text" style="color: white">无下载链接</div>
    </transition>
    <img :src="musicList.al.picUrl" alt="" class="bgImg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click.stop="changeDetailShow">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <div class="leftMarquee">
          <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
          <div class="rightBottom" style="display: flex; align-items: center">
            <span v-for="item in musicList.ar" :key="item">
              <!-- <div class="van-ellipsis">{{ item.name }}</div> -->
              <div>{{ item.name }}</div>
            </span>
            <svg class="icon" aria-hidden="true" @click="goToArtistDetail">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      class="detailContent"
      v-show="!isLyricShow"
      @click.stop="isLyricShow = !isLyricShow"
    >
      <img
        src="@/assets/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: !isbtnShow }"
      />
      <img src="@/assets/musicBackground.png" class="img_cd" />
      <img
        :src="musicList.al.picUrl"
        class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }"
      />
    </div>
    <div
      class="musicLyric"
      ref="musicLyric"
      v-show="isLyricShow"
      @click.stop="isLyricShow = !isLyricShow"
    >
      <p
        v-for="item in lyric"
        :key="item"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.next,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg
          class="icon"
          aria-hidden="true"
          @click.stop="doLikeMusic"
          name="xihuan"
        >
          <use xlink:href="#icon-xiai"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="dowloadMusic">
          <use xlink:href="#icon-a-xiazai1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="getMusicComment">
          <use xlink:href="#icon-a-pinglun1"></use>
        </svg>
        <div class="musicCommentList">
          <van-overlay :show="showComment" @click="showComment = false">
            <!-- <van-skeleton title avatar :row="3" /> -->
            <div class="singleItem">
              <div
                class="commentList"
                v-for="(item, i) in musicComments"
                :key="i"
              >
                <div class="commentDetail">
                  <img :src="item.user.avatarUrl" class="userAvatar" />
                  <p class="userName">{{ item.user.nickname }}</p>
                  <p class="userComment">{{ item.content }}</p>
                  <p class="sendedTime">{{ item.timeStr }}</p>
                </div>
              </div>
            </div>
          </van-overlay>
        </div>

        <div class="liebiao" @click.stop="">
          <van-popover
            v-model:show="showPopover"
            placement="top-end"
            class="tanChu"
            style="
              width: 7rem;
              height: 50vh;
              background: rgba(255, 255, 255, 0.7);
              -webkit-backdrop-filter: blur(10px);
              backdrop-filter: blur(8px);
            "
          >
            <div
              class="itemList"
              style="width: 7rem; height: 50vh; overflow-y: auto; display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start;"
            >
              <div
                class="item"
                v-for="(item, i) in playList"
                :key="i"
                style="
                  width: 7rem;
                  height: 0.5rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <div
                  class="itemLeft"
                  @click.stop="playMusic(i)"
                  style="
                    width: 85%;
                    display: flex;
                    justify-content: space-around;
                  "
                >
                  <span class="leftSpan" style="al">{{ i + 1 }}</span>
                  <p style="width: 90%">{{ item.name }}</p>
                </div>
                <div class="itemRight">
                  <svg
                    class="icon bofang"
                    aria-hidden="true"
                    v-if="item.mv != 0"
                  >
                    <use xlink:href="#icon-a-24gl-playSquare"></use>
                  </svg>
                </div>
              </div>
            </div>
            <template #reference>
              <svg class="icon" aria-hidden="true" style="fill: black">
                <use xlink:href="#icon-a-31liebiao"></use>
              </svg>
            </template>
          </van-popover>
        </div>
      </div>
      <div class="footerContent">
        <input
          type="range"
          class="range"
          min="0"
          :max="duration"
          v-model="currentTime"
          step="0.001"
        />
      </div>
      <div class="footerMid"></div>
      <div class="footerFoot">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click.stop="goPlay(-1)">
          <use xlink:href="#icon-a-48shangyishou"></use>
        </svg>
        <svg
          class="bofang"
          aria-hidden="true"
          v-if="isbtnShow"
          @click.stop="play"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="bofang" aria-hidden="true" v-else @click.stop="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click.stop="goPlay(1)" style="fill: black;">
          <use xlink:href="#icon-a-49xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeModel('xunhuan')" v-if="modelChoice == 'xunhuan'">
          <use xlink:href="#icon-danquxunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="changeModel('suiji')" v-if="modelChoice == 'suiji'">
          <use xlink:href="#icon-suijibofang"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {
  likeMusic,
  getMusicDowload,
  getMusicComment,
} from "@/request/api/home.js";
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
import { showFailToast } from "vant";
export default {
  name: "MusicDetail",
  props: [
    "musicList",
    "isbtnShow",
    "changeDetailShow",
    "play",
    "detailShow",
    "lyricList",
    "addDuration",
  ],
  mounted() {
    this.addDuration();
    console.log(this.lyricList);
    // this.actions[0].text = this.playList[0].name;
  },
  components: {
    Vue3Marquee,
  },
  data() {
    return {
      isLyricShow: false,
      showPopover: false,
      loading: true,
      actions: [],
      visible: false,
      showComment: false,
      musicComments: [],
      nowCurrentTime: null,
      modelChoice: "xunhuan",
    };
  },
  methods: {
    open4: function () {
      ElMessage.error("Oops, this is a error message.");
    },
    goPlay: function (num) {
      this.$refs.musicLyric.scrollTop = 0;
      let index = this.playListIndex + num;
      if (index == -1) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    handleClick() {
      this.$emit("update:currentTime", 0);
    },
    doLikeMusic: async function () {
      let result = await likeMusic(
        this.$store.state.playList[this.$store.state.playListIndex].id
      );
      if (result.status == 200) {
        document.getElementsByName("xihuan")[0].style.fill = "red";
      }
    },
    incrementPlayListIndex: function () {
      // let num = playList.length;
      this.updatePlayIndex(this.playList.length - 1);
      // this.updatePlayIndex(num + 1);
    },
    playMusic: function (i) {
      this.updatePlayListIndex(i);
    },
    dowloadMusic: async function (data) {
      let result = await getMusicDowload(
        this.playList[this.playListIndex].al.id
      );
      if (result.data.data.url === null) {
        showFailToast("无下载链接");
      }
      console.log(this.visible);
      console.log(result);
    },
    sleep: function (d) {
      for (var t = Date.now(); Date.now() - t <= d; );
    },
    getMusicComment: async function () {
      this.showComment = true;
      this.musicComments = (
        await getMusicComment(this.musicList.id)
      ).data.comments;

      console.log(this.musicComments);
    },
    goToArtistDetail: function () {
      this.$router.push({
        path: "/artistDetail",
        query: {
          artist: JSON.stringify(this.playList[this.playListIndex].ar[0]),
        },
      });
      this.$emit("close-popup");
    },
    changeModel: function(data){
      if(data == 'xunhuan'){
        this.modelChoice = 'suiji';
      }else{
        this.modelChoice = 'xunhuan';
      }


    },

    ...mapMutations([
      "updateAllPlayList",
      "updatePlayList",
      "updatePlayIndex",
      "updatePlayListIndex",
      "updateCurrentTime",
    ]),
  },
  watch: {
    currentTime: function (newValue) {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 270;
        }
      }
      if (newValue === this.duration) {
        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
    nowCurrentTime: function (newValue) {
      this.updateCurrentTime(newValue);
    },
  },
  computed: {
    ...mapState(["playListIndex", "playList", "duration", "currentTime"]),
    lyric: function () {
      let arr;
      console.log(this.lyricList);
      if (this.lyricList.lrc.lyric) {
        arr = this.lyricList.lrc.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 10000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      return arr;
    },
  },
};
</script>

<style lang="less" scoped>
.van-ellipsis__content {
  line-height: normal !important;
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  font-size: small;
  justify-content: space-between;
  padding: 0.2rem;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 2rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.2rem;
        height: 0.2rem;
        fill: #999;
      }
    }
  }
}
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .img_needle-active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    // .icon {
    //   width: 0.36rem;
    //   height: 0.36rem;
    //   fill: rgb(245, 234, 234);
    // }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
      fill: black;
    }

    .tanChu {
      width: 80vw;
      .liebiao {
        svg {
          fill: black;
        }
        .itemList {
          width: 80vw;
          .item {
            width: 80vw;
            height: 1.4rem;
            // top: 40%;
            display: flex;
            justify-content: space-between;

            // flex-direction: column;
            .itemLeft {
              width: 70%;
              height: 100%;
              p {
                width: 25%;
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
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footerMid {
    width: 100%;
    height: 0.06rem;
  }
  .footerFoot {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      //   fill: rgb(245, 234, 234);
      fill: black;
    }
    .bofang {
      fill: black;
      width: 1rem;
      height: 1rem;
    }
  }
}
.musicLyric {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow: scroll;
  p {
    color: #3c3939;
    margin-bottom: 20px;
  }
  .active {
    font-size: 22px;
    color: white;
  }
}
.van-fade {
  position: absolute;
  top: 30%;
  left: 34%;
  z-index: 1;
  background-color: rgb(93, 93, 232);
  width: 120px;
  height: 120px;
  border-radius: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.musicCommentList {
  position: absolute;
  height: 100vh;
  .singleItem {
    position: absolute;
    width: 80vw;
    height: 75%;
    top: 5%;
    left: 10%;
    overflow-y: auto;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
    .commentList {
      width: 100%;
      height: 20%;
      .commentDetail {
        height: 10%;
        width: 100%;
        position: absolute;
        .userAvatar {
          position: absolute;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
        P {
          color: white;
        }
        .userName {
          position: absolute;
          left: 20%;
          color: rgb(225, 191, 191);
        }
        .userComment {
          color: white;
          position: absolute;
          left: 20%;
          top: 30%;
        }
        .sendedTime {
          position: absolute;
          right: 0%;
          bottom: 0%;
          font-size: x-small;
        }
      }
    }
  }
}

div {
  font-family: "SmileySans"; //使用字体
}
</style>