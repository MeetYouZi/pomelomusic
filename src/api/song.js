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

export const getCommentList = (id) => {
  return axios.request({
    url: `/comment/music?id=${id}`,
    method: 'get'
  })
}

// 相似
export const getSimiSong = (id) => {
  return axios.request({
    url: `/simi/song?id=${id}`,
    method: 'get'
  })
}
