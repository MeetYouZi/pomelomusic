import * as types from './mutation-types'
// 选择播放（会更新整个播放列表）
export const selectPlay = function ({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYINGSTATE, true)
}
