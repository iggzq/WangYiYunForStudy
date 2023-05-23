import { createStore } from 'vuex'

export default createStore({
  state: {
    playList: [{
      al: {
        "id": 85571,
        "name": "我们俩",
        "picUrl": "http://p4.music.126.net/WpUDvtRGZc-WE3nuw-PgsA==/85761906967212.jpg",
        "tns": [],
        "pic_str": "85761906967212",
        "pic": 85761906967212,

      },
      ar: [{ name: '郭顶' }],
      id: 85571,
      name: '我们俩',
    }],

    playListIndex: 0,//默认下标
    isbtnShow: true,//播放按钮的显示
    currentTime: 0,
    duration: 0,
    isLogin: false,//判断是否登录
    lastPage: 1,
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value;
    },
    updateAllPlayList: function (state, value) {
      state.playList = value;
      console.log(state.playList)
    },
    updatePlayList: function (state, value) {
      state.playList.push(value);
    },
    updatePlayListIndex: function (state, value) {
      state.playListIndex = value;
    },
    updatePlayIndex: function (state, value) {
      console.log(value);
      state.playListIndex = value;
    },
    updateDuration: function (state, value) {
      state.duration = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    },
    updateLastPage: function (state, value) {
      state.lastPage = value;
    },
    updateCurrentTime: function (state, value) {
      state.currentTime = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
