import axios from '@/utils/http'
// 获取轮播图
export const getBanner = (params) => {
  return axios.request({
    url: '/banner?type=0',
    method: 'get',
    params
  })
}
// 最新歌曲
export const getNewSongs = () => {
  return axios.request({
    url: '/personalized/newsong',
    method: 'get'
  })
}
// 推荐歌单
export const getPersonalized = (params) => {
  return axios.request({
    url: '/personalized',
    method: 'get',
    params
  })
}
// 推荐mv
export const getPersonalizedMv = (params) => {
  return axios.request({
    url: '/personalized/mv',
    method: 'get',
    params
  })
}

// 推荐mv
export const getDjprogram = (params) => {
  return axios.request({
    url: '/personalized/djprogram',
    method: 'get',
    params
  })
}
