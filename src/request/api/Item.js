import service from '../index.js';
//获取歌单详情页的数据
export function getMusicItemList(id){
    return service({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}
//获取歌单的所有歌曲
export function getMusicItemListDetail(id){
    return service({
        method:'GET',
        url:`/playlist/track/all?id=${id}`
    })
}
//获取歌词
export function getMusicLyric(id,time){
    return service({
        method:'GET',
        url:`/lyric?id=${id}&time=${time}`
    })
}