const _storage = window.localStorage
const storage = {
  get (key, data = []) {
    if (_storage) {
      return _storage.getItem(key)
        ? Array.isArray(data)
          ? JSON.parse(_storage.getItem(key))
          : _storage.getItem(key)
        : data
    }
  },
  set (key, val) {
    if (_storage) {
      _storage.setItem(key, val)
    }
  },
  clear (key) {
    if (_storage) {
      _storage.removeItem(key)
    }
  }
}

const HISTORYLIST_KEY = 'pomelomusic_playHistory_'
const HistoryListMAX = 200

// 更新播放历史
export function setHistoryList (music) {
  const list = storage.get(HISTORYLIST_KEY)
  const index = list.findIndex(item => {
    return item.id === music.id
  })
  if (index === 0) {
    return list
  }
  if (index > 0) {
    list.splice(index, 1)
  }
  list.unshift(music)
  if (HistoryListMAX && list.length > HistoryListMAX) {
    list.pop()
  }
  storage.set(HISTORYLIST_KEY, JSON.stringify(list))
  return list
}

// 清空播放历史
export function clearHistoryList () {
  storage.clear(HISTORYLIST_KEY)
  return []
}
