import * as types from './mutation-types'
const mutations = {
  [types.SET_PLAYLIST] (state, list) {
    state.playList = list
  },
  [types.SET_PLAYMODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.SET_PLAYINGSTATE] (state, playing) {
    state.playing = playing
  },
  [types.SET_CURRENTINDEX] (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_CURRENTTIME] (state, currentTime) {
    state.currentTime = currentTime
  },
  [types.SET_SEARCHHISTORYS] (state, searchHistorys) {
    state.searchHistorys = searchHistorys
    try {
      localStorage.pomelomusic_SearchHistorys = JSON.stringify(searchHistorys)
    } catch (e) {}
  }
}
export default mutations
