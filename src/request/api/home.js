import service from '../index.js';
import Cookies from 'js-cookie';
//获取首页轮播图
export function getBanner() {
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}

//获取发现好歌单
export function getMusicList() {
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}

export function getSearchResult(data) {
    return service({
        method: 'GET',
        url: `/cloudsearch?keywords=${data}`
    })
}

export function getCode(data) {
    return service({
        method: 'GET',
        url: `/login/qr/key?timeStamp=${data}`
    })
}

export function getQRCode(data) {
    return service({
        method: 'GET',
        url: `/login/qr/create?key=${data.data.data.unikey}&qrimg=${data.data.data.unikey}`
    })
}

export function getQRresult(data,time) {
    return service({
        method: 'GET',
        url: `/login/qr/check?key=${data}&time=${time}`
    })
}

export function likeMusic(data) {
    return service({
        method: 'GET',
        url: `/like?id=${data}`,
        withCredentials: true,
        headers:{
            'Cookie': Cookies.get('user')
        }
    })
}

export function getTopList() {
    return service({
        method: 'GET',
        url: `/toplist`
    })
}

export function getDailyRecommend() {
    return service({
        method: 'GET',
        url: `/recommend/songs`
    })
}

export function getPersonalFM(value) {
    return service({
        method: 'GET',
        url: `/personal_fm?time=${value}`
    })
}

export function getCheck(value) {
    return service({
        method: 'GET',
        url: `/check/music?id=${value}`
    })
}

export function getUserInfo(){
    return service({
        method: 'GET',
        url: `/user/account`,
    })
}

export function getMusicComment(data){
    return service({
        method: 'GET',
        url: `/comment/music?id=${data}&limit=30`
    })
}


export function getRecentMusic(){
    return service({
        method: 'GET',
        url: `/record/recent/song?limit=80`
    })
}

export function getLikeList(data){
    return service({
        method: 'GET',
        url: `/likelist?uid=${data}`
    })
}

export function getMusicUrl(data){
    return service({
        method: 'GET',
        url: `/song/detail?ids=${data}`
    })
}

export function getMusicDowload(data){
    return service({
        method: 'GET',
        url: `/song/download/url?id=${data}`
    })
}

export function getMusicListComment(data){
    return service({
        method: 'GET',
        url: `/comment/playlist?id=${data}&limit=40`
    })
}

export function getPlayLists(data){
    return service({
        method: 'GET',
        url: `/top/playlist`
    })
}

export function getTopMV(){
    return service({
        method: 'GET',
        url: `/top/mv?limit=40`
    })
}

export function getMVComment(data){
    return service({
        method: 'GET',
        url: `/comment/mv?id=${data}&limit=40`
    })
}

export function getPrivateMessage() {
    return service({
        method: 'GET',
        url: `/msg/private?limit=20`
    })
}

export function getMVDetail(data){
    return service({
        method: 'GET',
        url: `/mv/url?id=${data}`
    })
}

export function getArtistDetail(data){
    return service({
        method: 'GET',
        url: `/artist/detail?id=${data}`
    })
}

export function getArtistTopList(){
    return service({
        method: 'GET',
        url: `/toplist/artist?type=1`
    })
}

export function getplayListDetail(data){
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}

export function getArtistTopMusic(data){
    return service({
        method: 'GET',
        url: `/artist/top/song?id=${data}`
    })
}

export function getHotDj(){
    return service({
        method: 'GET',
        url: `/dj/hot`
    })
}

export function getSongUrl(data){
    return service({
        method: 'GET',
        url: `/song/url?$id=${data}`
    })
}

export function getDjProgram(data){
    return service({
        method: 'GET',
        url: `/dj/program?rid=${data}&limit=40`
    })
}

export function getDjDetail(data){
    return service({
        method: 'GET',
        url: `/dj/program/detail?rid=${data}`
    })
}

export function getRadioList(data){
    return service({
        method: 'GET',
        url: `/video/timeline/recommend?offset=20&time=${data}`
    })
}


export function getRadioCategoryList(){
    return service({
        method: 'GET',
        url: `/video/category/list`
    })
}

export function getRadioCategoryGroup(data,time){
    return service({
        method: 'GET',
        url: `/video/group?id=${data}&offset=30&time=${time}`
    })
}

export function getVideoComment(data){
    return service({
        method: 'GET',
        url: `/comment/video?id=${data}`
    })
}

export function getVideoUrl (data){
    return service({
        method: 'GET',
        url: `/video/url?id=${data}`
    })
}

export function getHeartLoveModel (id,pid){
    return service({
        method: 'GET',
        url: `/playmode/intelligence/list?id=${id}&pid=${pid}`
    })
}

export function getUserDetail (){
    return service({
        method: 'GET',
        url: `/user/subcount`
    })
}

export function getPrivateMessageHistory (uid,time){
    return service({
        method: 'GET',
        url: `/msg/private/history?uid=${uid}&time=${time}`
    })
}

export function sendMessage (uid,msg){
    return service({
        method: 'GET',
        url: `/send/text?user_ids=${uid}&msg=${msg}`
    })
}


export function getRanking(data) {
    return getTopList().then(result => {
        return service({
            method: 'GET',
            url: `/playlist/detail?id=${result.data.list[3].id}`
        })
    })
}

