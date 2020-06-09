import { playMode } from '@/assets/js/playMode'

const state = {
  playing: false,
  fullScreen: false,
  playMode: playMode.loop,
  playList: [
    {
      album: '我们在夏枝繁茂时再见',
      duration: 218.979,
      id: 1371353582,
      image: 'https://p1.music.126.net/mXqmc1nD5mu2S4pEvBVHzw==/109951164141857357.jpg',
      name: '我们在夏枝繁茂时再见',
      Singer: '钱正昊',
      url: 'https://music.163.com/song/media/outer/url?id=1371353582.mp3'
    }, {
      album: '暖暖，请多指教 影视原声带',
      artists: [
        {
          albumSize: 0,
          id: 12618020,
          img1v1: 0,
          img1v1Url: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          name: '李凯馨',
          picId: 0,
          picUrl: null,
          trans: null
        }
      ],
      duration: 235.528,
      id: 1446522140,
      image: 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
      name: '最好的幸运',
      singer: '李凯馨',
      url: 'https://music.163.com/song/media/outer/url?id=1446522140.mp3'
    }, {
      album: '小幸运',
      artists: [{
        albumSize: 0,
        id: 9548,
        img1v1: 0,
        img1v1Url: 'https://p2.music.126.net/bwBsDMYJcFetIc-q_oWjAw==/109951163520335473.jpg',
        name: '田馥甄',
        picId: 0,
        picUrl: null,
        trans: null
      }],
      duration: 265.521,
      id: 33206214,
      img: 'https://p2.music.126.net/bwBsDMYJcFetIc-q_oWjAw==/109951163520335473.jpg',
      name: '小幸运',
      singer: '田馥甄',
      url: 'https://music.163.com/song/media/outer/url?id=33206214.mp3'
    }
  ],
  sequenceList: [],
  playHistory: [],
  currentIndex: 0,
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
