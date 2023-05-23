<template>
  <div class="main" v-if="playVideo != null">
    <div class="mainTop">
      <div class="topItemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
    </div>
    <div class="mainContent">
      <video
        width="390"
        height="240"
        controls
        autoplay="autoplay"
        data-setup="{}"
      >
        <source :src="videoUrl.url" type="video/mp4" />
      </video>
      <div class="videoInfomation">
        <div class="author">
          <img :src="playVideo.data.creator.avatarUrl" class="contentImg" />
          <div class="text">
            <p class="contentName">{{ playVideo.data.creator.nickname }}</p>
            <p class="videoDesc">描述:{{ playVideo.data.description }}</p>
          </div>
        </div>

        <div class="comment">
          <div class="commentList" v-for="(item, i) in videoComments" :key="i">
            <img :src="item.user.avatarUrl" class="userAvatar" />
            <div class="textContent">
              <div class="author">
                <p class="userName">{{ item.user.nickname }}</p>
              </div>
              <p class="userComment">{{ item.content }}</p>
              <p class="sendedTime">{{ item.timeStr }}</p>
            </div>
          </div>
          <van-back-top bottom="10vh" />
        </div>
      </div>
    </div>
  </div>
</template>
  <script>
import { getVideoComment, getVideoUrl } from "@/request/api/home.js";
export default {
  name: "videoPlay",
  data() {
    return {
      playVideo: null,
      videoComments: [],
      videoUrl: null,
    };
  },
  created: async function () {
    this.playVideo = JSON.parse(this.$route.query.video);
    this.videoUrl = (await getVideoUrl(this.playVideo.data.vid)).data.urls[0];
    this.videoComments = (
      await getVideoComment(this.playVideo.data.vid)
    ).data.comments;
    console.log(this.videoComments);
  },
  methods: {},
};
</script>
  
<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;

  .mainContent {
    position: relative;
    width: 100%;
    height: 100%;
    .videoPlay {
      width: 390px;
      height: 240px;
    }
    .author {
      border: 2.5px solid #999;
      border-radius: 25px;
      position: relative;
      display: flex;
      justify-content: left;
      align-items: center;
      .contentImg {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      .text {
        margin: 5px;
        .contentName {
          margin-top: 5px;
          font-size: large;
        }
        .videoDesc {
          font-size: x-small;
          color: #999;
          margin-top: 0px;
        }
      }
    }
    .comment {
      margin-top: 10px;
      border: 2.5px solid #999;
      border-radius: 25px;
      display: flex;
      flex-direction: column;
      width: 100%;

      .commentList {
        display: flex;
        justify-content: left;
        align-items: center;
        position: relative;
        margin-top: 8px;
        width: 100%;
        height: 1.6rem;
        .userAvatar {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: 50%;
        }
        .textContent {
          margin: 5px;
          .author {
            border: 0px;
            .userName {
              font-size: large;
              color: rgb(225, 191, 191);
            }
            .flag {
              padding: 1px;
              border: 1px solid;
              border-radius: 5px;
              font-size: xx-small;
              background-color: aquamarine;
              color: rgb(99, 99, 232);
            }
          }

          .userComment {
            font-size: small;
          }
          .sendedTime {
            position: absolute;
            right: 0%;

            font-size: xx-small;
          }
        }
      }
    }
  }
}
</style>
  