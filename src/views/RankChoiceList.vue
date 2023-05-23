<template>
  <div class="main">
    <div class="topItemLeft" style="width: 100%; display: flex; align-items: center; height: 20px; background-color: white; position: fixed;">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)" style="z-index: 99999;">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <span style="width: 100%; display: flex; justify-content: space-evenly; font-size:large; position: fixed; ">音乐排行榜</span>
    </div>
    <div class="content">
        <div class="item" v-for="(item,i) of topList" :key="i" @click="goRankingList(item)">
            <img  :src="item.coverImgUrl" class="itemImg" />
            <p class="itemName">{{ item.name }}</p>
        </div>

    </div>

  </div>
</template>
<script>
import { getTopList,getplayListDetail } from '@/request/api/home.js';
export default {
  name: "RankChoiceList",
  data(){
    return{
        topList:[],
    }
  },
  created:async function(){
    this.topList = (await getTopList()).data.list;
  },
  methods:{
    goRankingList:async function(data){
        let result = await getplayListDetail(data.id);
        this.$router.push({
            path:'/ranking',
            query:{
                ranking: JSON.stringify(result),
            }
        })
    }
  }
};
</script>
<style scoped lang="less">
.main{
    width: 100%;
    height: 100%;
    .content{
        width: 100%;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        .item{
            width: 40%;
            height: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 15px;
            .itemImg{
                width: 100%;
                height: 100%;
                border-radius: 20px;

            }
        }
    }
}
</style>
