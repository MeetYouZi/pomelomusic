<template>
  <ul class="play-list">
    <transition-group name="move-fade">
      <li class="play-music-item"
          v-for="(item, index) in songList"
          :key="item.id"
          @click.stop="handleSelectSong(item, index)"
          :class="{active: item.id === currentSong.id}"
      >
        <div class="play-item-box">
          <!--        <span class="play-list-num" v-text="index + 1"></span>-->
          <div class="play-list-content">
            <h3 class="play-list-tit"><span class="play-list-txt">{{item.name}}</span></h3>
            <p class="play-list-desc"><span class="play-list-txt"> - {{item.singer}}</span></p>
            <p
              class="icon_dynamic"
              v-show="item.id === currentSong.id"
            >
              <dynamic></dynamic>
            </p>
          </div>
          <p
            class="play-list-close"
            @click.stop="handelDelMusic(item, index)"
          >
            <i class="iconfont iconclose1"></i>
          </p>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatTime } from '@/utils/utils'
import dynamic from '@/components/dynamic/miniDynamic'

export default {
  name: 'playList',
  components: {
    dynamic
  },
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
    ...mapGetters(['currentSong', 'playing', 'playList'])
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
    // 删除播放列表歌曲
    handelDelMusic (item, index) {
      if (item.deleting) {
        return
      }
      item.deleting = true
      const list = [...this.playList]
      list.splice(index, 1)
      this.removerPlayListItem({ list, index })
      if (!this.playList.length) {
        this.$emit('empty')
      }
      setTimeout(() => {
        item.deleting = false
      }, 300)
    },
    ...mapActions({
      removerPlayListItem: 'removerPlayListItem'
    }),
    ...mapMutations({
      setPlaying: 'SET_PLAYINGSTATE'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .play-list
    overflow hidden
    padding-left 16px
    box-sizing border-box
    .play-music-item
      position relative
      padding 10px 16px 10px 0
      box-sizing border-box
      overflow hidden
      color var(--color)
      border-bottom-1px(var(--bg_play_border))
      &.move-fade-enter-active, &.move-fade-leave-active
        transition all 0.3s
      &.move-fade-enter, &.move-fade-leave-to
        padding 0
        height 0
      .play-item-box
        width 100%
        display flex
        justify-content space-between
        align-items baseline
        overflow hidden
        .play-list-num
          min-width 10px
          text-align right
          padding-right 6px
        .play-list-content
          display flex
          align-items center
          overflow hidden
          no-wrap()
          .play-list-tit
            font-size $font-size-large
            color inherit
            line-height 24px
            padding-right 4px
            overflow hidden
          .play-list-desc
            max-width 95%
            overflow hidden
            line-height 24px
            font-size $font-size-small
            color var(--c_txt2)
          .play-list-txt
            text-align left
            display block
            no-wrap()
          .icon_dynamic
            position relative
            padding-left 10px
            width 20px
            height 8px
            display flex
            align-items flex-end
        .iconfont
          color var(--c_txt4)
      &.active
        color var(--theme_color)
        .play-list-txt
          color var(--theme_color)
</style>
