<template>
  <div class="cube-slide" ref="slide">
    <div class="cube-slide-group" ref="slideGroup">
      <slot>
        <silde-item
          v-for="(item, index) in data"
          :key="index"
          @click.native="clickItem(item, index)"
          :item="item">
        </silde-item>
      </slot>
    </div>
    <div class="cube-slide-dots" v-if="showDots">
      <slot name="dots" :current="currentPageIndex" :dots="dots">
        <span :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
      </slot>
    </div>
  </div>
</template>

<script>
import sildeItem from 'slideItem'

const DIRECTION_H = 'horizontal'

export default {
  name: 'silde',
  components: {
    sildeItem
  },
  props: {
    data: {
      type: Array,
      default () {
        /* istanbul ignore next */
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDots: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: DIRECTION_H
    },
    // The props allowVertical, stopPropagation could be removed in next minor version.
    allowVertical: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'options'
      }
    },
    stopPropagation: {
      type: Boolean,
      default: undefined,
      deprecated: {
        replacedBy: 'options'
      }
    },
    refreshResetCurrent: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickItem () {

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
