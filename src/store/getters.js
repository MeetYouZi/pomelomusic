// 播放状态
export const playing = state => state.playing
// 播放列表
export const playList = state => state.playList
// 播放模式
export const playMode = state => state.playMode
// 当前播放index
export const currentIndex = state => state.currentIndex
// 当前播放
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
