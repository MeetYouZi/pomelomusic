// 播放器
export const audioELE = state => state.audioELE
// 播放状态
export const playing = state => state.playing
// 播放列表
export const playList = state => state.playList
// 顺序列表
export const sequenceList = state => state.sequenceList
// 历史播放列表
export const playHistory = state => state.playHistory
// 历史搜索记录
export const searchHistorys = state => state.searchHistorys
// 播放模式
export const playMode = state => state.playMode
// 当前播放index
export const currentIndex = state => state.currentIndex
// 当前播放进度
export const currentTime = state => state.currentTime
// 当前播放
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}
// 用户信息
export const userInfo = (state) => state.userInfo
// 用户信息
export const userPlayList = (state) => state.userPlayList
// 用户信息
export const currentProgress = (state) => state.currentProgress
