import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode, playModeWord } from '@/assets/js/playMode'
import { shuffle } from '@/utils/utils'

export const SET_PLAYING_TIME = {
  computed: {
    ...mapGetters(['audioELE'])
  },
  methods: {
    setPlayingTime (currentTime) {
      this.audioELE.currentTime = currentTime
    }
  }
}

export const SET_PLAY_MODE = {
  data () {
    return {}
  },
  computed: {
    modeWord () {
      return playModeWord[this.playMode]
    },
    iconMode () {
      return this.playMode === playMode.sequence ? 'icon_sequence' : this.playMode === playMode.loop ? 'icon_loop' : 'icon_random'
    },
    ...mapGetters(['playMode', 'currentSong', 'sequenceList'])
  },
  methods: {
    changeMode () {
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    // 修改当前歌曲索引
    resetCurrentIndex (list) {
      const index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapActions({
      setPlaylist: 'setPlaylist'
    }),
    ...mapMutations({
      setPlayMode: 'SET_PLAYMODE',
      setCurrentIndex: 'SET_CURRENTINDEX'
    })
  }
}
