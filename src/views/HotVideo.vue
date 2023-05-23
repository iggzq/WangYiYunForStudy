<template>
  <div class="main" v-if="djRadios != null" >
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
        >热门电台</span
      >
    </div>
    <div class="content">
      <div class="contentDj" v-for="(item, i) of djRadios" :key="i" @click="getPlayUrl(item)">
        <img :src="item.picUrl" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotDj,getSongUrl,getDjProgram,getDjDetail } from "@/request/api/home.js";
export default {
  name: "HotVideo",
  data() {
    return {
      djRadios: null,
    };
  },
  created: async function () {
    this.djRadios = (await getHotDj()).data.djRadios;
    console.log(this.djRadios);
  },
  methods:{
    getPlayUrl:async function(data){
      let result = (await getDjProgram(data.id)).data.programs[0];
      let result1 = await getDjDetail(data.id);
      console.log(result);
      console.log(finalResult);
      console.log(result1);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: calc(100% - 20px);
  overflow: hidden;
  position: relative;
  .content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    height: 80%;
    .contentDj {
      width: 40%;
      height: 40%;
      padding-top: 25px;
      padding-bottom: 53px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
      }
    }
  }
}
</style>
