import axios from '@/utils/http'
// 获取歌单
export const getPlaylists = (params) => {
  return axios.request({
    url: '/top/playlist',
    method: 'get',
    params
  })
}

// 获取歌单
export const getToplist = (params) => {
  return axios.request({
    url: '/toplist/detail',
    method: 'get',
    params
  })
}
