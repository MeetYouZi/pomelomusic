import * as types from './mutation-types'
const mutations = {
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_SEQUENCELIST] (state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAYMODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.SET_PLAYINGSTATE] (state, playing) {
    state.playing = playing
  },
  [types.SET_PLAYHISTORY] (state, playHistory) {
    state.playHistory = playHistory
  },
  [types.SET_CURRENTINDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_CURRENTTIME] (state, currentTime) {
    state.currentTime = currentTime
  },
  [types.SET_CURRENTPROGRESS] (state, currentProgress) {
    state.currentProgress = currentProgress
  },
  [types.SET_AUDIOELE] (state, audioELE) {
    state.audioELE = audioELE
  },
  [types.SET_SEARCHHISTORYS] (state, searchHistorys) {
    state.searchHistorys = searchHistorys
    try {
      localStorage.pomelomusic_SearchHistorys = JSON.stringify(searchHistorys)
    } catch (e) {}
  },
  [types.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
    try {
      localStorage.pomelomusic_userInfo = JSON.stringify(userInfo)
    } catch (e) {}
  },
  [types.SET_USERPLAYLIST] (state, userPlayList) {
    state.userPlayList = userPlayList
    try {
      localStorage.pomelomusic_playlist = JSON.stringify(userPlayList)
    } catch (e) {}
  }
}
export default mutations
