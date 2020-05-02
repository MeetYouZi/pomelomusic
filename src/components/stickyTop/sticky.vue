<template>
  <div class="sticky" :style="getPosition">
    <div class="sticky-warp">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data () {
    return {}
  },
  computed: {
    getPosition () {
      var position = this.cssSupport('position', 'sticky') ? 'sticky' : 'relative'
      return 'position:' + position
    }
  },
  props: {},
  beforeMount () {
  },
  mounted () {
    this.init()
  },
  deactivated () {
    if (this.cssSupport('position', 'sticky')) {
      return
    }
    /* 复位 */
    var elWarp = this.$el.querySelector('.sticky-warp')
    elWarp.position = 'absolute'
  },
  methods: {
    init () {
      if (this.cssSupport('position', 'sticky')) {
        return
      }
      var el = this.$el; var target = this.$el.parentNode
      var elWarp = this.$el.querySelector('.sticky-warp')
      var top = this.getNumberValue(document.defaultView.getComputedStyle(el).top)
      this.addScrollListen(target, (event) => {
        if (el.getBoundingClientRect().top <= top) {
          elWarp.style.position = 'fixed'
        }
        if (el.getBoundingClientRect().top >= 0 && elWarp.style.position != 'absolute') {
          elWarp.style.position = 'absolute'
        }
      })
    },
    cssSupport: function (attr, value) {
      var element = document.createElement('div')
      if (attr in element.style) {
        element.style[attr] = value
        return element.style[attr] === value
      } else {
        return false
      }
    },
    getNumberValue (pxValue) {
      var value = String(pxValue).match(/^\-?\+?[0-9]+/g)
      return value ? Number(value) : undefined
    },
    addScrollListen (target, cb) {
      target.addEventListener('y-scroll', (event) => {
        cb && cb(event)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .sticky
    width: 100%
  .sticky .sticky-warp
    width: 100%;
    background: inherit;
    will-change: change;
    height: inherit;
    top: inherit
</style>
