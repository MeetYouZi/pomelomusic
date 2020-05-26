import { mapGetters, mapMutations, mapActions } from 'vuex'

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
