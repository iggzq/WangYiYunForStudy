<template>
  <div class="main">
    <van-pull-refresh v-model="loading" @refresh="refreshContent">
      <div class="mainContent">
        <div
          class="contentItem"
          v-for="(item, i) of videoList"
          :key="i"
          @click="videoPlay(item)"
        >
          <img :src="item.data.coverUrl" />
          <p>{{ item.data.title }}</p>
          <div class="dianZan">
            <div class="rank">
              <p>{{ i + 1 }}</p>
            </div>
            <div class="playCount">
              <svg aria-hidden="true" class="dianZanImg">
                <use xlink:href="#icon-a-bofang1"></use>
              </svg>
              <p class="dianZanCount">{{ item.data.praisedCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
  <script>
import { getRadioCategoryList,getRadioCategoryGroup } from "@/request/api/home.js";
export default {
  name: "mvList",
  data() {
    return {
      videoList: [],
      loading: false,
      category: null,
    };
  },
  created: async function () {
    var time = new Date().getTime();
    this.category = await getRadioCategoryList();
    this.videoList = (await getRadioCategoryGroup( this.category.data.data[0].id ,time)).data.datas;
    console.log(this.videoList);
  },
  methods: {
    videoPlay: function (data) {
      this.$router.push({
        path: "/videoPlay",
        query: {
          video: JSON.stringify(data),
        },
      });
    },
    refreshContent: async function () {
      var time = new Date().getTime();
      this.videoList = (await getRadioCategoryGroup( this.category.data.data[0].id ,time)).data.datas;
      this.loading = false;
    },
    
  },
};
</script>
  <style scoped lang="less">
.main {
  width: 100vw;
  height: 90%;
  // overflow-y: auto;
  .mainContent {
    display: flex;
    justify-content: space-around;
    width: 100%;
    flex-wrap: wrap;
    // overflow-y: auto;
    .contentItem {
      width: 40%;
      height: 100%;
      position: relative;
      margin-top: 0.36rem;
      margin-top: 40px;
      padding-bottom: 50px;
      img {
        width: 3rem;
        height: 2.2rem;
        border-radius: 0.2rem;
      }
      .dianZan {
        position: absolute;
        margin: 0px;
        top: 0%;
        right: 2%;
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        .dianZanImg {
          width: 0.5rem;
          height: 0.5rem;
          fill: #999;
        }
        .dianZanCount {
          color: #999;
        }
        .rank {
          width: 0.5rem;
          display: flex;
          justify-content: space-evenly;
          color: aqua;
        }
        .playCount {
          display: flex;
          justify-content: right;
          align-items: center;
        }
      }
    }
  }
}
</style>
  