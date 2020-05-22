import axios from '@/utils/http'

// 电台详情
export const getmvdetail = params =>
  axios.request({
    url: '/mv/detail',
    method: 'get',
    params
  })

// 电台详情
export const getmvUrl = params =>
  axios.request({
    url: '/mv/url',
    method: 'get',
    params
  })

// 相似 mv
export const getSimiMv = params =>
  axios.request({
    url: '/simi/mv',
    method: 'get',
    params
  })

// 全部 mv
export const getAllMvs = params =>
  axios.request({
    url: '/mv/all',
    method: 'get',
    params
  })

// 获取歌手详情
export const getArtists = params =>
  axios.request({
    url: '/artists',
    method: 'get',
    params
  })

// mv评论
export const getMvComment = params =>
  axios.request({
    url: '/comment/mv',
    method: 'get',
    params
  })
