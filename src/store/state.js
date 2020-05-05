import { playMode } from '@/assets/js/playMode'

const state = {
  playing: false,
  fullScreen: false,
  playMode: playMode.loop,
  playList: [],
  currentIndex: -1,
  currentSong: {},
  currentTime: 0
}

export default state
