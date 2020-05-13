<template>
  <div class="content-view">
    <div class="con-mod" v-for="musicItem in musicList" :key="musicItem.id">
      <div class="con-tit">
        <h2 class="con-tit-text">{{musicItem.tit}}</h2>
        <p>更多<i class="iconfont iconright"></i> </p>
      </div>
      <div class="con-scroll-x">
        <div class="con-scroll-bd">
          <ul class="con-list">
            <li class="list-item" v-for="(item, index) in musicItem.list" :key="item.id" @click.stop="handleClick(musicItem, item, index)">
              <div class="list-box">
                <div class="list-media">
                  <img class="list-img" v-lazy="item.picUrl"/>
                  <div class="cover_count" v-show="musicItem.key != 'music'">
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import formatSongs from '@/utils/song'
import { getPersonalized, getNewSongs, getPersonalizedMv, getDjprogram } from '@/api'
import { SET_PLAYINGSTATE } from '@/store/mutation-types'
export default {
  name: 'contentView',
  data () {
    return {
      titList: [{
        key: 'hot',
        name: '热门推荐'
      }, {
        key: 'music',
        name: '最新音乐'
      }, {
        key: 'mv',
        name: '推荐MV'
      }, {
        key: 'program',
        name: '推荐电台'
      }],
      hotMvList: [],
      hotList: [],
      newList: [],
      djprogramList: [],
      musicList: []
    }
  },
  computed: {
    ...mapGetters(['playing', 'currentSong']),
    normalizedSongs () {
      const songList = this.songList.map((songs) => {
        const song = songs.song
        return {
          id: song.id,
          name: song.name,
          ar: song.artists,
          dt: song.duration,
          mv: song.mvId,
          al: {
            name: songs.name,
            picUrl: songs.picUrl
          }
        }
      })
      return this.nomalizeSong(songList)
    }
  },
  methods: {
    nomalizeSong (songList) {
      return formatSongs(songList)
    },
    handleTomusicList (id) {
      this.$router.push(`/musicList/${id}`)
    },
    playMusic (item, index) {
      if (this.playing && this.currentSong.id && item.id && item.id === this.currentSong.id) {
        this.setPlayState(false)
      } else {
        this.selectPlay({
          list: this.normalizedSongs,
          index
        })
      }
    },
    playMV () {

    },
    handleClick (musicItem, item, index) {
      const key = musicItem.key
      switch (key) {
        case 'hot':
          this.handleTomusicList(item.id)
          break
        case 'music':
          this.playMusic(item, index)
          break
        case 'mv':
          this.playMV()
          break
        case 'program':
          this.playMV()
          break
        default:
          console.log('啥也没有呢～')
      }
    },
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setPlayState: SET_PLAYINGSTATE
    }),
    _getMusicList () {
      Promise.all([
        this._getPersonalized(),
        this._getNewSongs(),
        this._getPersonalizedMv(),
        this._getDjprogram()]
      ).then(res => {
        const allList = res
        this.songList = res[1]
        allList.forEach((item, index) => {
          this.musicList.push({
            key: this.titList[index].key,
            tit: this.titList[index].name,
            id: 'music' + index,
            list: item
          })
        })
      })
    },
    // 热门音乐
    _getPersonalized () {
      return new Promise(resolve => {
        getPersonalized({ limit: 15 }).then(res => {
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
    // 最新MV
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
        align-items center
        justify-content space-between
        margin 20px 16px 10px
        .con-tit-text
          color var(--c_txt1)
          font-size $font-size-large
          font-weight bold
        p
          font-size $font-size-small
          color var(--c_tet2)
          .iconright
            font-size $font-size-small
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
                width: 100%
                height: 100%
                object-fit: cover
                border-radius: 8px
              .cover_count
                position absolute
                bottom 0
                right 0
                display flex
                align-items center
                justify-content center
                height 17px
                min-width 14px
                padding 0 7px
                border-radius 8px
                background rgba(0,0,0,.4)
                .cover-count-num
                  display block
                  margin-left 2px
                  line-height normal
                  font-size $font-size-small
                  font-weight 300
                  color #fff
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
