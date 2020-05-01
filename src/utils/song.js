function filterSinger (singers) {
  const arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

export class Song {
  constructor ({ id, name, singer, album, image, duration, url }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
  }
}

export function createSongList (music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    image: music.al.picUrl || null,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`
  })
}

// 歌曲数据格式化
const formatSongs = function formatPlayList (list) {
  const Songs = []
  list.forEach(item => {
    const musicData = item
    if (musicData.id) {
      Songs.push(createSongList(musicData))
    }
  })
  return Songs
}

export default formatSongs
