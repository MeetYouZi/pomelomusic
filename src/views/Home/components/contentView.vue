<template>
  <div class="content-view">
    <div class="con-mod" v-for="musicItem in musicList" :key="musicItem.id">
      <div class="con-tit">
        <h2 class="con-tit-text">{{musicItem.tit}}</h2>
        <p>更多</p>
      </div>
      <div class="con-scroll-x">
        <div class="con-scroll-bd">
          <ul class="con-list">
            <li class="list-item" v-for="item in musicItem.list" :key="item.id" @click="handleClickUrl(item.id)">
              <div class="list-box">
                <div class="list-media">
                  <img class="list-img" :src="item.picUrl"/>
                  <div class="cover_count">
                    <span class="cover-count-num">{{item.playCount}}</span>
                  </div>
                </div>
                <div class="list-bd">
                  {{item.name}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalized, getNewSongs, getPersonalizedMv, getDjprogram } from '@/api'
export default {
  name: 'contentView',
  data () {
    return {
      titList: ['热门推荐', '最新音乐', '推荐MV', '推荐电台'],
      hotMvList: [],
      hotList: [],
      newList: [],
      djprogramList: [],
      musicList: []
    }
  },
  methods: {
    handleClickUrl (id) {
      this.$router.push(`/musicList/${id}`)
    },
    _getMusicList () {
      Promise.all([
        this._getPersonalized(),
        this._getNewSongs(),
        this._getPersonalizedMv(),
        this._getDjprogram()]
      ).then(res => {
        const allList = res
        allList.forEach((item, index) => {
          this.musicList.push({
            tit: this.titList[index],
            id: 'music' + index,
            list: item
          })
        })
      })
    },
    // 热门音乐
    _getPersonalized () {
      return new Promise(resolve => {
        getPersonalized({ limit: 10 }).then(res => {
          resolve(res.result)
        })
      })
    },
    // 最新音乐
    _getNewSongs () {
      return new Promise(resolve => {
        getNewSongs().then(res => {
          resolve(res.result)
          // this.newList = res.result
        })
      })
    },
    // 最新音乐
    _getPersonalizedMv () {
      return new Promise(resolve => {
        getPersonalizedMv().then(res => {
          resolve(res.result)
          // this.hotMvList = res.result
        })
      })
    },
    // 推荐电台
    _getDjprogram () {
      return new Promise(resolve => {
        getDjprogram().then(res => {
          resolve(res.result)
          // this.djprogramList = res.result
        })
      })
    }
  },
  created () {
    this._getMusicList()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content-view
    position relative
    .con-mod
      position relative
      .con-tit
        height 30px
        display flex
        color var(--c_txt1)
        align-items center
        justify-content space-between
        margin 20px 16px 10px
    .con-scroll-x
      margin-top -10px
    .con-scroll-bd
      margin-bottom -10px
      padding 10px 0
      overflow-x auto
      overflow-y hidden
      .con-list
        margin 0 12px
        font-size 0
        display flex
        .list-item
          vertical-align top
          display inline-block
          margin-bottom 14px
          font-size 12px
          .list-box
            width 110px
            margin 0 4px
            .list-media
              height 110px
              position relative
              .list-img
                position: absolute
                top: 0
                left: 0
                z-index: 1
                width: 100%
                height: 100%
                object-fit: cover
                border-radius: 8px
              .cover_count
                position: absolute;
                bottom: 0;
                right: 0;
                z-index: 5;
                display flex
                align-items center
                justify-content center
                height: 17px;
                min-width: 14px;
                padding: 0 7px;
                border-radius: 8px;
                background: rgba(0,0,0,.4);
                .cover-count-num
                  display: block
                  margin-left: 2px
                  line-height: normal
                  font-size: 11px
                  font-weight: 300
                  color: #fff
            .list-bd
              margin-top: 8px
              line-height: 17px
              font-size: 12px
              color var(--c_txt1)
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              white-space: normal
              word-wrap: break-word
              word-break: normal
              overflow hidden
</style>
