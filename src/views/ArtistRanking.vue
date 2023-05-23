<template>
  <div class="main" v-if="artistList.length != 0">
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
        >华语歌手排行榜</span
      >
    </div>
    <div class="top">
      <div class="no1" @click="goArtistDetail(artistList[0])">
        <img :src="artistList[0].img1v1Url" />
        <p class="name1">{{ artistList[0].name }}</p>
        <p class="rank">1</p>
      </div>
      <div class="no2" @click="goArtistDetail(artistList[1])">
        <img :src="artistList[1].img1v1Url" />
        <p class="name2">{{ artistList[1].name }}</p>
        <p class="rank">2</p>
      </div>
      <div class="no3" @click="goArtistDetail(artistList[2])">
        <img :src="artistList[2].img1v1Url" />
        <p class="name3">{{ artistList[2].name }}</p>
        <p class="rank">3</p>
      </div>
    </div>
    <div class="left" style="z-index: 0">
      <div
        v-for="(item, i) of artistList"
        :key="i"
        class="itemList"
        @click="goArtistDetail(item)"
      >
        <div class="itemContent">
          <img :src="item.img1v1Url" />
          <p class="name">{{ artistList[i].name }}</p>
          <p class="rank">{{ i + 1 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArtistTopList } from "@/request/api/home.js";
export default {
  name: "ArtistRanking",
  data() {
    return {
      artistList: [],
    };
  },
  created: async function () {
    this.artistList = (await getArtistTopList()).data.list.artists;
    console.log(this.artistList);
  },
  methods: {
    goArtistDetail: function (data) {
      this.$router.push({
        path:'/artistDetail',
        query: {
          artist: JSON.stringify(data)
        }
      })
    },
  },
};
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: end;
    position: relative;
    top: 30px;
    border: 1px solid #999;
    border-radius: 10px;
    background-color: #ead039;

    .no1 {
      position: relative;
      .name1 {
        position: absolute;
        left: 0%;
        top: 0%;
        color: rgb(44, 58, 180);
      }
      img {
        width: 160px;
        height: 160px;
        border-radius: 10px;
      }
      .rank {
        position: absolute;
        font-size: xx-large;
        color: rgb(225, 109, 109);
        right: 3%;
        top: 3%;
      }
    }
    .no2 {
      position: relative;
      .name2 {
        position: absolute;
        left: 2%;
        top: 2%;
        color: rgb(44, 58, 180);
      }
      img {
        width: 120px;
        height: 120px;
        border-radius: 10px;
      }
      .rank {
        position: absolute;
        color: rgb(225, 109, 109);
        font-size: x-large;
        right: 3%;
        top: 3%;
      }
    }
    .no3 {
      position: relative;
      .name3 {
        position: absolute;
        left: 0%;
        top: 0%;
        color: rgb(44, 58, 180);
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
      .rank {
        position: absolute;
        color: rgb(225, 109, 109);
        font-size: large;
        right: 3%;
        top: 3%;
      }
    }
  }
  .left {
    width: 100%;
    border: 1px solid #999;
    border-radius: 25px;
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
    align-content: center;
    flex-wrap: wrap;
    .itemList {
      width: 25%;

      .itemContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .rank {
          position: absolute;
          left: 16%;
          top: 0%;
          color: rgb(225, 109, 109);
        }
        img {
          border-radius: 10px;
          width: 75px;
          height: 75px;
        }
      }
    }
  }
}
</style>
