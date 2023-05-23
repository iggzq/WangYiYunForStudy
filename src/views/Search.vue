<template>
  <div class="main">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <input
        type="text"
        placeholder="张杰"
        v-model="searchKey"
        @keyup.enter="enterKey"
      />
    </div>
    <div class="searchHistory">
      <span class="searchSpan">历史</span>
      <span
        v-for="item in keyWordList"
        :key="item"
        class="spanKey"
        @click="searchByHistory(item)"
      >
        {{ item }}
      </span>
      <svg class="icon" aria-hidden="true" @click="clearSearchHistory">
        <use xlink:href="#icon-duoxuan"></use>
      </svg>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in songList" :key="i">
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
  </div>
</template>

<script>
import { getSearchResult } from "@/request/api/home.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      keyWordList: [],
      searchKey: "",
      songList: [],
    };
  },
  mounted() {
    if (localStorage.getItem("keyWordList") !== null) {
      this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"));
    }
  },
  methods: {
    enterKey: async function () {
      if (this.searchKey !== "") {
        this.keyWordList.unshift(this.searchKey);
        //去重
        this.keyWordList = [...new Set(this.keyWordList)];
        //固定长度
        if (this.keyWordList.length > 10) {
          this.keyWordList.splice(this.keyWordList.length - 1, 1);
        }

        localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
        let res = await getSearchResult(this.searchKey);
        this.songList = res.data.result.songs;
        this.searchKey = "";
      }
    },
    clearSearchHistory: function () {
      this.keyWordList = [];
      localStorage.removeItem("keyWordList");
    },
    searchByHistory: async function (item) {
      let res = await getSearchResult(item);
      this.songList = res.data.result.songs;
    },
    playMusic: function (item) {
      this.updatePlayList(item);
      console.log(item);
      this.updatePlayListIndex(this.$store.state.playList.length - 1);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>

<style lang="less" scoped>
.main {
  animation: fadenum 0.5s;
  @keyframes fadenum {
    0% {
      transform: translateX(250px);
    }
  }
  .searchTop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input {
      margin-left: 10px;
      border: none;
      width: 70%;
      padding: 0.1rem;
      border-color: #999;
      border-bottom: 1px solid;
    }
    svg {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.1rem;
    position: relative;
    .searchSpan {
      font-size: 18px;
      font-weight: 700;
    }
    .spanKey {
      padding: 5px 0.2rem;
      background-color: #c4bfbf;
      border-radius: 20px;
      margin: 5px 11px;
      display: inline-block;
    }
    .icon {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 10px;
    }
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