<template>
  <div class="main">
    <div class="project">
      <div class="rank common" @click="goRankList">
        <svg class="rankImg" aria-hidden="true">
          <use xlink:href="#icon-zhubangdan"></use>
        </svg>
        <p>排行榜</p>
      </div>
    </div>
    <div class="project">
      <div class="artistRank common" @click="goArtistRank">
        <svg class="artistRankImg" aria-hidden="true">
          <use xlink:href="#icon-geshou"></use>
        </svg>
        <p>华语歌手榜</p>
      </div>
    </div>
    <div class="project">
      <div class="hotRadio common" @click="goHotVideo">
        <svg class="hotRadioImg" aria-hidden="true">
          <use xlink:href="#icon-diantai"></use>
        </svg>
        <p>热门电台</p>
      </div>
    </div>
    <div class="project">
      <div class="mvList common" @click="goMvList">
        <svg class="mvListImg" aria-hidden="true">
          <use xlink:href="#icon-mv"></use>
        </svg>
        <p>mv</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "projectChoice",
  methods:{
    goRankList:function(){
        this.$router.push({
            path: '/rankChoiceList',
        })
    },
    goArtistRank:function(){
        this.$router.push({
            path: '/artistRanking',
        })
    },
    goHotVideo:function(){
      this.$router.push({
        path: '/hotVideo',
      })
    },
    goMvList: function(){
      this.$router.push({
        path: '/mvList'
      })
    }
  }
};
</script>
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  .project {
    width: 40%;
    height: 40%;
    margin: 15px;
    .common {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    svg {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
    .rank{

    }
  }
}
</style>

