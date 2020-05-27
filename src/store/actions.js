import * as types from './mutation-types'
// 选择播放（会更新整个播放列表）
export const selectPlay = ({ commit }, { list, index }) => {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_PLAYINGSTATE, true)
}

// 设置播放列表
export const setPlaylist = ({ commit }, { list }) => {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
}

// 删除播放列表的歌曲
export const removerPlayListItem = function ({ commit, state }, { list, index }) {
  let currentIndex = state.currentIndex
  if (index < state.currentIndex || list.length === state.currentIndex) {
    currentIndex--
    commit(types.SET_CURRENTINDEX, currentIndex)
  }
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCELIST, list)
  if (!list.length) {
    commit(types.SET_PLAYINGSTATE, false)
  } else {
    commit(types.SET_PLAYINGSTATE, true)
  }
}
