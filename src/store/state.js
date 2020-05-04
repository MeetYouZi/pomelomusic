import { playMode } from '@/assets/js/playMode'

const state = {
  playing: false,
  fullScreen: false,
  playMode: playMode.loop,
  playlist: [],
  currentIndex: -1,
  currentSong: {}
}

export default state
