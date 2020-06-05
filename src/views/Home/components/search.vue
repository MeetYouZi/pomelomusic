<template>
  <div class="search_bar" :class="{'focus': isIconsearch}">
    <i class="iconfont iconsearch"></i>
    <input
      type="search"
      v-model="query"
      @input="onInput"
      @focus="handelFocus"
      @blur="handleBlue"
      class="search_bar_input c_input"
      placeholder="搜索"
    />
  </div>
</template>

<script>
// import storage from 'good-storage'
import { mapMutations } from 'vuex'
import { debounce } from '@/utils/utils'
import { SET_SEARCHHISTORYS } from '@/store/mutation-types'
export default {
  name: 'search',
  data () {
    return {
      query: '',
      isIconsearch: false
    }
  },
  methods: {
    onInput: debounce((newQuery) => {
      // console.log(this.query, '2222')
    }, 500),
    handelFocus () {
      this.isIconsearch = true
      window.scroll(0, 0)
      this.$emit('handelFocus', true)
    },
    handleBlue () {
      if (!this.query) this.isIconsearch = false
      // this.$emit('handelFocus', false)
    },
    ...mapMutations({
      set_searchHistory: SET_SEARCHHISTORYS
    })
  },
  created () {
    this.$watch('query', debounce((newQuery) => {
      // if (newQuery.trim()) {
      //   this.set_searchHistory(newQuery)
      // }
      this.$emit('keyWordChange', newQuery)
    }, 500))
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.search_bar
  height 30px
  display flex
  position relative
  margin 8px 16px 8px 16px
  overflow hidden
  border-radius (@height / 2)
  background var(--searchBg)
  transition width all .3s
  .iconsearch
    position absolute
    left 50%
    top 50%
    transform translate(-0, -50%)
    margin-left -26px
    color  var(--searchcolor)
    vertical-align top
  .search_bar_input
    position: absolute
    top: 0
    left: 0
    width: 100%
    padding-top: 6px
    padding-bottom: 4px
    padding-left: 24px
    font-size: $font-size-medium
    text-align: center
    border: none
    border-radius: 0
    background: 0 0
    -webkit-appearance: none
    &.c_input
       color var(--searchcolor)
  &.focus
    .iconsearch
      left 30px
    .search_bar_input
      text-align left
</style>
