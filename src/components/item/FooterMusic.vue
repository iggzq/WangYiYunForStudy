<template>
  <div class="FooterMusic">
    <div class="footLeft" @click="changeDetailShow()">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <van-popup
        v-model:show="detailShow"
        position="bottom"
        :style="{ height: '100%', width: '100%' }"
      >
        <MusicDetail
          :musicList="playList[playListIndex]"
          :play="play"
          :isbtnShow="isbtnShow"
          :changeDetailShow="changeDetailShow"
          :detailShow="detailShow"
          :lyricList="lyricList"
          :addDuration="addDuration"
          style="z-index: 2"
          @close-popup="closePopup"
        />

      </van-popup>
      <div>
        <p>{{ playList[playListIndex].name }}</p>
        <span>横划可以切换上下首</span>
      </div>
    </div>
    <div class="footRight">
      <svg class="icon" aria-hidden="true" v-if="isbtnShow" @click="play()">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play()">
        <use xlink:href="#icon-zanting"></use>
      </svg>
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
            style="width: 7rem; height: 50vh; overflow-y: auto"
          >
            <div
              class="item"
              v-for="(item, i) in playList"
              :key="i"
              style="
                width: 7rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div
                class="itemLeft"
                @click.stop="playMusic(i)"
                style="width: 85%; display: flex; justify-content: space-around"
              >
                <span class="leftSpan" style="al">{{ i + 1 }}</span>
                <p style="width: 90%">{{ item.name }}</p>
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
          <template #reference>
            <svg class="icon" aria-hidden="true" style="fill: black">
              <use xlink:href="#icon-a-31liebiao"></use>
            </svg>
          </template>
        </van-popover>
      </div>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
      @timeupdate="this.currentTime = this.$refs.audio.currentTime"
    ></audio>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from "@/components/item/MusicDetail.vue";
import { getMusicLyric } from "@/request/api/Item";
export default {
  name: "FooterMusic",
  computed: {
    ...mapState(["playList", "playListIndex", "isbtnShow"]),
  },
  updated() {
    this.getLyric();
    this.addDuration();
  },
  created: async function () {
    var time = new Date();
    let res = await getMusicLyric(this.playList[this.playListIndex].id, time);
    this.lyricList = res.data;
  },
  methods: {
    play: function () {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
        this.$refs.audio.play();
        console.log("播放");
    
      } else {
        this.updateIsbtnShow(true);
        this.$refs.audio.pause();
        console.log("暂停");

      }
    },
    addDuration: function () {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateCurrentTime: function () {
      this.currentTime = this.$refs.audio.currentTime;
    },
    // updateTime:function(){
    //   setInterval(() => {
    //     this.updateCurrentTime();
    //   }, 1000);
    // },
    changeDetailShow: function () {
      // this.getLyric();
      this.detailShow = !this.detailShow;
    },
    getLyric: async function () {
      let res = await getMusicLyric(this.playList[this.playListIndex].id);
      this.lyricList = res.data;
    },
    closePopup: function(){
      this.detailShow = false;
    },
    ...mapMutations(["updateIsbtnShow", "updateDuration", "updateCurrentTime"]),
  },
  watch: {
    playListIndex: function () {
      //监听如果下标发生了改变,就自动播放音乐
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false);
      }
    },
    currentTime: function () {
      this.updateCurrentTime(this.currentTime);
    },
  },
  data() {
    return {
      detailShow: false,
      lyricList: [],
      currentTime: 0,
      interVal: 0,
    };
  },
  components: {
    MusicDetail,
  },
};
</script>

<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1rem;
  background-color: #0093e9;
  background-image: linear-gradient(139deg, #0093e9 0%, #80d0c7 100%);
  position: fixed;
  z-index: 999;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .footLeft {
    width: 70%;
    height: 100%;
    display: flex;
    padding-right: 0.5rem;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footRight {
    width: 20%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: last baseline;
    // align-items: center;
    .icon {
      height: 30px;
      width: 30px;
    }
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
          align-items: center;
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

div {
  font-family: "SmileySans"; //使用字体
}
</style>