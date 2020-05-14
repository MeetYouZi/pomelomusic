import axios from '@/utils/http'
// 获取热搜
export const getSearchHot = (params) => {
  return axios.request({
    url: '/search/hot/detail',
    method: 'get',
    params
  })
}
// 获取热搜
export const getSearchSuggest = (data) => {
  return axios.request({
    url: '/search/suggest',
    method: 'get',
    params: data
  })
}
