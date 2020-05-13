<template>
  <div class="tab border-top">
    <router-link
      tag="div"
      class="tab-item"
      v-for="(item,index) in iconList"
      :key="index"
      :to="item.url"
    >
      <i class="tab-icon" :class="`iconfont ${item.icon}`"></i>
      <span :class="`tab-link tab-link${index}`">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tabNav',
  data () {
    return {
      iconList: [
        {
          id: '001',
          url: '/home',
          icon: 'iconmusic1',
          name: '音乐馆'
        }, {
          id: '002',
          url: '/recommend',
          icon: 'iconpaihang',
          name: '排行'
        }, {
          id: '002',
          url: '/personal',
          icon: 'iconMy',
          name: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tab
    background var(--playBg)
    width 100%
    position fixed
    bottom 0
    display flex
    height 50px
    box-shadow 0px 2px 6px 0px rgba(255,54,42,0.1)
    font-size $font-size-small
    z-index 11
    .tab-item
      flex: 1
      text-align: center
      display flex
      flex-direction column
      align-items center
      justify-content center
      .tab-link
        font-size $font-size-small
        color var(--theme_color)
      .tab-icon
        width 23px
        height 23px
        font-size $font-size-large-x
        color var(--theme_color)
        text-align center
        padding-bottom 2px
      &.router-link-active
        .tab-link, .iconfont
          color: $color-theme
</style>
