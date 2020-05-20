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
