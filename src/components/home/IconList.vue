<template>
  <div class="iconList">
    <div class="iconItem" @click.stop="goDailyRecommend">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiaoxi1"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem" @click.stop="goPersonalFM">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem" @click="goPlayLists()">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlegedan-01"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true" @click="goRanking">
        <use xlink:href="#icon-shujupaihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <FooterMusic ref="FooterMusic"/>
  </div>
</template>

<script>
import {
  getRanking,
  getDailyRecommend,
  getPersonalFM,
  getCheck,
} from "@/request/api/home.js";
import { mapMutations, mapState } from "vuex";
import {FooterMusic} from "../item/FooterMusic.vue";
export default {
  name: "IconList",
  data() {
    return {
      rankingList: [],
      ranking: null,
      dailyList: [],
      dailyRec: null,
      personalMusicList: [],
      personalMusic: null,
      personalMusicInterval: null,
    };
  },
  methods: {
    goPlayLists:function(){
      this.$router.push({
        path:'/playLists',
      })
    },
    goRanking: async function () {
      let result = await getRanking();
      this.ranking = result;
      this.rankingList = result.data.playlist.tracks;
      this.$router.push({
        path: "/ranking",
        query: {
          ranking: JSON.stringify(this.ranking),
        },
      });
    },
    goDailyRecommend: async function () {
      let result = await getDailyRecommend();
      this.dailyRec = result;
      this.dailyList = result.data.data.dailySongs;
      this.$router.push({
        path: "/dailyRecommend",
        query: {
          dailyRec: JSON.stringify(this.dailyRec),
          dailyList: JSON.stringify(this.dailyList),
        },
      });
    },
    goPersonalFM: async function () {
      let result = await getPersonalFM();
      let musicArray = result.data.data;
      var num = 0;
      for (let i = 0; i < result.data.data.length; i++) {
        let check = await getCheck(result.data.data[i].id);
        // console.log(check);
        if(!check.data.success){
          // console.log(check.data.success);
          // console.log(result.data.data[i]);
          continue;
        }
        musicArray[num].al = { picUrl: "" };
        musicArray[num].al.picUrl = musicArray[num].album.picUrl;
        num++;
      }
      this.updateAllPlayList(musicArray);
      // this.$refs.FooterMusic.play();
      this.personalMusicInterval = setInterval(async () => {
        if (this.playListIndex === this.playList.length - 1) {
          var time = new Date().getTime();
          console.log(time);
          let result = await getPersonalFM(time);
          let music = result.data.data;
          for (let i = 0; i < music.length; i++) {
            music[i].al = { picUrl: "" };
            music[i].al.picUrl = music[i].album.picUrl;
            this.playList.push(music[i]);
          }
          console.log(this.playList);
        }
        console.log(this.playListIndex);
      }, 10000);
      console.log(result);
    },
    ...mapMutations(["updateAllPlayList"]),
  },
  computed: {
    ...mapState(["playListIndex", "playList"]),
  },
};
</script>

<style lang="less" scoped>
.iconList {
  width: 100%;
  height: 2rem;
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>