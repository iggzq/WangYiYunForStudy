<template>
  <div id="swiperTop">
    <img v-for="(v,i) in bannerList" :key="i" :src="v.pic" alt="" v-show="n==i" class="image">
  </div>
</template>

<script>
import axios from 'axios'
import HouTai from "@/components/HouTai.jpg"
import IMG0978 from "@/components/IMG0978.jpg"
import {getBanner} from '@/request/api/home.js'
export default {
  name: "SwipeTop",
  data(){
    return{
      n: 0,
      bannerList:[
        HouTai,
        IMG0978
      ]
    }
  },
  async mounted() {
    // axios.get('/banner?type=2').then((resp)=>{
    //   this.bannerList = resp.data.banners
    //   console.log(resp)
    // })
    let res = await getBanner();
    this.bannerList = res.data.banners;
    this.play()
  },
  methods:{
    autoPlay(){
      this.n++;
      if(this.n==this.bannerList.length){
        this.n = 0;
      }
    },
    play(){
      setInterval(this.autoPlay,2000);
    },
  }
};
</script>

<style lang="less" scoped>

#swiperTop{
  .image{
    width: 100%;
    height: 150px;
    border-radius: 0.2rem;
  }
}
</style>