<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" :class="{'activeBar': activeBar}" ref="progress"></div>
      <div class="bar-outer" ref="currentProgress"></div>
      <div class="progress-btn-wrapper"
           ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn" :class="{'activeBar': activeBar}"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from '@/assets/js/dom'

const progressBtnWidth = 16
const transform = prefixStyle('transform')

export default {
  data () {
    return {
      activeBar: false
    }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    },
    currentProgress: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressTouchStart (e) {
      this.activeBar = true
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
      this.$emit('percentChanging', this._getPercent())
    },
    progressTouchEnd () {
      this.activeBar = false
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._triggerPercent()
    },
    setProgressOffset (percent) {
      if (percent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = percent * barWidth
        this._offset(offsetWidth)
      }
    },
    _triggerPercent () {
      this.$emit('percentChange', this._getPercent())
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    _getPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      return this.$refs.progress.clientWidth / barWidth
    }
  },
  watch: {
    percent (newPercent) {
      this.setProgressOffset(newPercent)
    },
    currentProgress (Progress) {
      const barWidth = this.$refs.progressBar.clientWidth
      const offsetWidth = Progress * barWidth
      this.$refs.currentProgress.style.width = `${offsetWidth}px`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .activeBar
    transition box-shadow ease .2s
    box-shadow 0 0 10px $color-theme
  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 2px
      background: #fff
      .bar-outer
        osition: absolute
        height: 100%
        background: #eee
      .progress
        position: absolute
        height: 100%
        background: $color-theme
        &.activeBar
          @extends .activeBar
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 12px
          left: 7px
          box-sizing: border-box
          width: 4px
          height: 4px
          border: 0px solid $color-text
          border-radius: 50%
          background: $color-theme
          &.activeBar
            top: 10px
            width: 8px
            height: 8px
            @extends .activeBar
</style>
