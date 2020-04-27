import axios from '@/utils/http'
// 获取歌单
export const getListDetail = (params) => {
  return axios.request({
    url: '/playlist/detail',
    method: 'get',
    params
  })
}
