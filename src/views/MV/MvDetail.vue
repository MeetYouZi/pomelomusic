<template>
  <div class="mv_detail">
    <div class="mvplayer">
      <video :src="mvUrl" controls="controls"></video>
    </div>
    <div class="mv_tab">
      <div class="tab_item"
           v-for="(item ,index) in tabList"
           :key="index"
           @click="currentIndex = index"
      >
        <span class="tab_text" :class="{active: currentIndex == index}">{{item}}</span>
      </div>
    </div>
    <transition>
      <div class="slide-mv" v-if="currentIndex == 0">
        <mvinfo
          :mvInfo="mvInfo"
          :mvList="mvList"
          :artistInfo="artistInfo"
        ></mvinfo>
      </div>
    </transition>
<!--    <component v-for="item in con" :is="item" ></component>-->
    <transition name="slide-left">
      <div class="mv_comment slide-mv" v-if="currentIndex == 1">
        <comment :hotCommentList="hotCommentList"></comment>
      </div>
    </transition>
  </div>
</template>

<script>
import { getmvdetail, getmvUrl, getArtists, getSimiMv, getMvComment } from '@/api'
import mvinfo from '@/views/MV/components/mvinfo'
import comment from '@/components/comment/comment'
export default {
  name: 'MvDetail',
  components: {
    mvinfo,
    comment
  },
  data () {
    return {
      con: [
        mvinfo
      ],
      tabList: [
        '详情', '评论'
      ],
      currentIndex: 0,
      artistInfo: {},
      mvInfo: {},
      mvUrl: '',
      mvList: [],
      hotCommentList: []
    }
  },
  methods: {
    _getmvdetail () {
      const data = {
        mvid: this.$route.params.mvid
      }
      getmvdetail(data).then(res => {
        this.mvInfo = res.data
        this._getArtists(this.mvInfo.artistId)
        this._getMvComment(data.mvid)
      })
    },
    _getMvComment (id) {
      const data = {
        id,
        pageSize: 20
      }
      getMvComment(data).then(res => {
        this.hotCommentList = res.hotComments.concat(res.comments)
      })
    },
    _getSimiMv () {
      const data = {
        mvid: this.$route.params.mvid
      }
      getSimiMv(data).then(res => {
        this.mvList = res.mvs
      })
    },
    _getArtists (id) {
      const data = { id }
      getArtists(data).then(res => {
        this.artistInfo = res.artist
      })
    },
    _getmvUrl () {
      const data = {
        id: this.$route.params.mvid
      }
      getmvUrl(data).then(res => {
        this.mvUrl = res.data.url
      })
    }
  },
  created () {
    this._getmvdetail()
    this._getmvUrl()
    this._getSimiMv()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .mv_detail
    background var(--bg)
  .mvplayer
    position relative
    width 100%
    height 200px
    video
      width 100%
      height 100%
  .mv_tab
    display flex
    align-items center
    justify-content space-between
    height 40px
    line-height 40px
    border-bottom 3px
    .tab_item
      flex 1
      text-align center
      overflow hidden
    .tab_text
      text-align center
      height 40px
      padding 4px 4px
      color var(--c_txt1)
      &.active
        position relative
        &:after
          content ""
          position absolute
          bottom 0
          left 50%
          width 20px
          height 3px
          border-radius 3px
          margin-left -10px
          background #22d59c
  .mv_comment
    margin 0 16px
</style>
