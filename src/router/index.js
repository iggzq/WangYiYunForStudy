import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      showFooterMusic: true
    },

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    meta: {
      showFooterMusic: true
    },
    component: () => import(/* webpackChunkName: "itemMusic" */ '../views/ItemMusic.vue')
  },
  ,
  {
    path: '/search',
    name: 'Search',
    meta: {
      showFooterMusic: true
    },
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next();
      } else {
        next('/login');
      }
    },
    component: () => import(/* webpackChunkName: "infoUser" */ '../views/InfoUser.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    meta: {
      showFooterMusic: true
    },
    component: () => import(/* webpackChunkName: "ranking" */ '../views/RankingList.vue')
  },
  {
    path: '/dailyRecommend',
    name: 'DailyRecommend',
    component: () => import(/* webpackChunkName: "dailyRecommend" */ '../views/DailyRecommend.vue')
  },
  {
    path: '/myInfomation',
    name: 'MyInfomation',
    component: () => import(/* webpackChunkName: "myInfomation" */ '../views/MyInfomation.vue')
  },
  {
    path: '/likeMusicList',
    name: 'LikeMusicList',
    meta: {
      showFooterMusic: true
    },
    component: () => import(/* webpackChunkName: "likeMusicList" */ '../views/LikeMusicList.vue')
  },
  {
    path: '/playLists',
    name: 'PlayLists',
    component: () => import(/* webpackChunkName: "playLists" */ '../views/PlayLists.vue')
  },
  {
    path: '/mvList',
    name: 'MvList',
    component: () => import(/* webpackChunkName: "mvList" */ '../views/MvList.vue')
  },
  {
    path: '/mvPlay:video',
    name: 'MvPlay',
    component: () => import(/* webpackChunkName: "mvPlay" */ '../views/MvPlay.vue')
  },
  {
    path: '/projectChoice',
    name: 'ProjectChoice',
    component: () => import(/* webpackChunkName: "projectChoice" */ '../views/ProjectChoice.vue')
  },
  {
    path: '/rankChoiceList',
    name: 'RankChoiceList',
    component: () => import(/* webpackChunkName: "rankChoiceList" */ '../views/RankChoiceList.vue')
  },
  {
    path: '/artistRanking',
    name: 'ArtistRanking',
    component: () => import(/* webpackChunkName: "artistRanking" */ '../views/ArtistRanking.vue')
  },
  {
    path: '/hotVideo',
    name: 'HotVideo',
    component: () => import(/* webpackChunkName: "artistRanking" */ '../views/HotVideo.vue')
  },
  {
    path: '/artistDetail',
    name: 'ArtistDetail',
    component: () => import(/* webpackChunkName: "artistDetail" */ '../views/ArtistDetail.vue')
  },
  {
    path: '/videoList',
    name: 'VideoList',
    component: () => import(/* webpackChunkName: "videoList" */ '../views/VideoList.vue')
  },
  {
    path: '/videoPlay',
    name: 'VideoPlay',
    component: () => import(/* webpackChunkName: "videoPlay" */ '../views/VideoPlay.vue')
  },
  {
    path: '/PrivateMessage',
    name: 'privateMessage',
    component: () => import(/* webpackChunkName: "privateMessage" */ '../views/PrivateMessage.vue')
  },
  {
    path: '/PrivateMessageHistory',
    name: 'privateMessageHistory',
    component: () => import(/* webpackChunkName: "privateMessageHistory" */ '../views/PrivateMessageHistory.vue')
  },


]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

export default router
