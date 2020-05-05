<template>
  <ul class="music-list">
    <li class="music-item"
        v-for="(item, index) in songList"
        :key="item.id"
        @click="handleSelectSong(item, index)"
        :class="{active: item.id == currentSong.id}"
    >
      <div class="item-box">
        <span class="list-num" v-text="index + 1"></span>
        <div class="list-content">
          <h3 class="list-tit"><span class="list-txt">{{item.name}}</span></h3>
          <p class="list-desc"><span class="list-txt">{{item.singer}}</span></p>
        </div>
        <p class="list-time">{{ (item.duration % 3600) | formatTime}}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { formatTime } from '@/utils/utils'

export default {
  name: 'musicList',
  props: {
    songList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    formatTime
  },
  computed: {
    ...mapGetters(['currentSong', 'playing'])
  },
  methods: {
    // 播放暂停事件
    handleSelectSong (item, index) {
      if (this.currentSong.id && item.id === this.currentSong.id) {
        this.setPlaying(!this.playing)
        return
      }
      this.$emit('selectItem', item, index)
    },
    ...mapMutations({
      setPlaying: 'SET_PLAYINGSTATE'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .music-list
    overflow hidden
    .music-item
      position relative
      padding 10px 16px
      overflow hidden
      color var(--color)
      &.active
        color var(--theme_color)
      .item-box
        width 100%
        display flex
        justify-content space-between
        align-items baseline
        overflow hidden
        .list-num
          padding-right 6px
        .list-content
          flex 1
          display flex
          flex-direction column
          justify-content space-around
          align-items flex-start
        .list-tit
          font-size $font-size-large
          color inherit
          line-height 24px
          width 100%
        .list-desc
          max-width 95%
          overflow hidden
          font-size $font-size-small
          line-height 18px
        .list-txt
          text-align left
          display block
          no-wrap()
</style>
