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
  }
}
export default mutations
