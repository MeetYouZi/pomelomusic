import axios from '@/utils/http'

// 热门歌手
export const getTopArtists = params =>
  axios.request({
    url: '/top/artists',
    method: 'get',
    params
  })

// 热门歌手
export const getToplistArtists = params =>
  axios.request({
    url: '/toplist/artist',
    method: 'get',
    params
  })

// 歌手歌曲
export const getArtistsSong = params =>
  axios.request({
    url: '/artists',
    method: 'get',
    params
  })

// 歌手描述
export const getArtistsDesc = params =>
  axios.request({
    url: '/artist/desc',
    method: 'get',
    params
  })
