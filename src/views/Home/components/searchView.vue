<template>
  <transition name="fade">
    {{showSearchView}}
    <div class="searchView" v-show="showSearchView">
      <div class="hot_search">
        <h1 class="hot_search_title color1">历史搜索</h1>
        <div class="hot_search_delete color1"><i class="iconfont iconclose"></i> </div>
        <ul class="hot_search_list">
          <li @click="addQuery(item.k)" class="hot_search_item c_txt1 hot_search_item_bg2" v-for="(item,index) in hotKey" :key="index">
            {{item.k}}
          </li>
        </ul>
      </div>
      <div class="hot_search">
        <h1 class="hot_search_title color1">热门搜索</h1>
        <div class="hot_search_delete color1"><i class="iconfont iconclose"></i> </div>
        <ul class="hot_search_list">
          <li @click="addQuery(item.k)" class="hot_search_item c_txt1 hot_search_item_bg2" v-for="(item,index) in hotKey" :key="index">
            {{item.k}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'searchView',
  props: {
    showSearchView: Boolean
  },
  data () {
    return {
      hotKey: [
        {
          k: '小幸运'
        }, {
          k: '小幸运'
        }
      ]
    }
  },
  methods: {
    addQuery () {

    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .searchView
    position fixed
    top 40px
    right 0
    width 100%
    height 100%
    bottom 0
    z-index 20
    background var(--theme)
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s ease-in-out
  .hot_search
    position relative
    margin-top 16px
    .hot_search_title
      margin 16px 16px 12px
      font-size $font-size-medium
      font-weight 700
    .hot_search_delete
      position absolute
      top 6px
      right 4px
      width 20px
      height 4px
    .hot_search_list
      margin 0 16px
      .hot_search_item
        vertical-align top
        display inline-block
        max-width 212px
        height 24px
        line-height 24px
        margin 0 10px 10px 0
        padding 0 10px
        no-wrap()
        font-size $font-size-small
        border-radius 24px
</style>
