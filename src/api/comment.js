import axios from '@/utils/http'

// 歌曲评论
export const getSongComment = params =>
  axios.request({
    url: '/comment/music',
    method: 'get',
    params
  })
// 歌单评论
export const getPlaylistComment = params =>
  axios.request({
    url: '/comment/playlist',
    method: 'get',
    params
  })
// 热门评论
export const getHotComment = params =>
  axios.request({
    url: '/comment/hot',
    method: 'get',
    params
  })
// mv评论
export const getMvComment = params =>
  axios.request({
    url: '/comment/mvt',
    method: 'get',
    params
  })
