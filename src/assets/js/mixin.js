import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '@/assets/js/playMode'
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
  computed: {
    ...mapGetters(['playMode'])
  },
  methods: {
    changeMode () {
      const mode = (this.playMode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.random) {
        // list = shuffle(this.sequenceList)
      } else {
        // list = this.sequenceList
      }
      // this.resetCurrentIndex(list)
      this.setPlaylist(list)
    },
    ...mapMutations({
      setPlayMode: 'SET_PLAYMODE'
    })
  }
}
