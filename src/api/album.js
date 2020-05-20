import axios from '@/utils/http'

// 电台详情
export const getdjdetail = params =>
  axios.request({
    url: '/dj/program/detail',
    method: 'get',
    params
  })

// 电台详情
export const getdjprogram = params =>
  axios.request({
    url: '/dj/program',
    method: 'get',
    params
  })
