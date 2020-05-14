import axios from '@/utils/http'
// 获取音乐详情
export const getSongDetail = (ids) => {
  return axios.request({
    url: `/song/detail?ids=${ids}`,
    method: 'get'
  })
}

export const getLyricl = (id) => {
  return axios.request({
    url: `/lyric?id=${id}`,
    method: 'get'
  })
}
