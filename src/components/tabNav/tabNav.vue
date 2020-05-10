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
          url: '/',
          icon: 'iconmusic',
          name: '音乐馆'
        }, {
          id: '002',
          url: '/recommend',
          icon: 'iconmusic',
          name: '推荐'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tab
    background #fff
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
        color: $color-text
      .tab-icon
        width 23px
        height 23px
        font-size $font-size-large-x
        text-align center
        padding-bottom 2px
      &.router-link-active
        .tab-link, .iconfont
          color: $color-theme
</style>
