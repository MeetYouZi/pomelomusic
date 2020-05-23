import axios from '@/utils/http'
// 手机号登录
export const longinCellPhone = (params) => {
  return axios.request({
    url: '/login/cellphone',
    method: 'get',
    params
  })
}
// 获取用户播放列表
export const getUserPlaylist = (params) => {
  return axios.request({
    url: '/user/playlist',
    method: 'get',
    params
  })
}
