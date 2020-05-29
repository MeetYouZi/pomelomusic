import { playMode } from '@/assets/js/playMode'

const state = {
  playing: false,
  fullScreen: false,
  playMode: playMode.loop,
  playList: [],
  sequenceList: [],
  playHistory: [],
  currentIndex: -1,
  currentSong: {
    album: '我们在夏枝繁茂时再见',
    duration: 218.979,
    id: 1371353582,
    image: 'https://p1.music.126.net/mXqmc1nD5mu2S4pEvBVHzw==/109951164141857357.jpg',
    name: '我们在夏枝繁茂时再见',
    singer: '钱正昊',
    url: 'https://music.163.com/song/media/outer/url?id=1371353582.mp3'
  },
  currentTime: 0,
  audioELE: null,
  searchHistorys: JSON.parse(localStorage.getItem('pomelomusic_SearchHistorys')) || [],
  userInfo: JSON.parse(localStorage.getItem('pomelomusic_userInfo')) || {}
}

export default state
