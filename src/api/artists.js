import axios from '@/utils/http'

// 热门歌手
export const getTopArtists = params =>
  axios.request({
    url: '/top/artists',
    method: 'get',
    params
  })
