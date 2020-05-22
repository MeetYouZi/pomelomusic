<template>
  <div class="content-view">
    <div v-for="i in 5" :key="i">
      <loading v-if="!musicList.length"></loading>
    </div>
    <transition-group name="fade">
      <div
        v-if="musicList.length"
        class="con-mod fade"
        v-for="musicItem in musicList"
        :key="musicItem.id"
      >
        <div class="con-tit">
          <h2 class="con-tit-text">{{musicItem.tit}}</h2>
          <p>更多<i class="iconfont iconright"></i> </p>
        </div>
        <div class="con-scroll-x">
          <div class="con-scroll-bd">
            <ul class="con-list">
              <li class="list-item fade"
                  v-for="(item, index) in musicItem.list"
                  :key="item.id"
                  @click.stop="handleClick(musicItem, item, index)"
              >
                <div class="list-box">
                  <div class="list-media">
                    <img class="list-img" v-lazy="_getImgUrl(item.picUrl, 300)"/>
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
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import formatSongs from '@/utils/song'
import { getPersonalized, getNewSongs, getPersonalizedMv, getDjprogram } from '@/api'
import { SET_PLAYINGSTATE, SET_PLAYLIST } from '@/store/mutation-types'
import loading from '@/components/loading/loading'
import { getImgUrl } from '@/utils/format'
export default {
  name: 'contentView',
  components: { loading },
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
      return formatSongs(songList)
    }
  },
  methods: {
    _getImgUrl (url, w, h) {
      return getImgUrl(url, w, h)
    },
    handleTomusicList (id, index) {
      // this.setplayList(this.normalizedSongs)
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
    playMV (item) {
      this.$router.push(`/mvDetail/${item.id}`)
    },
    toPlaySong (item, index) {
      this.selectPlay({
        list: this.normalizedSongs,
        index
      })
      this.$router.push(`/playSong/${item.id}`)
    },
    handleToAlbum (item) {
      this.$router.push(`/album/${item.id}`)
    },
    handleClick (musicItem, item, index) {
      const key = musicItem.key
      switch (key) {
        case 'hot':
          this.handleTomusicList(item.id, index)
          break
        case 'music':
          this.toPlaySong(item, index)
          // this.playMusic(item, index)
          break
        case 'mv':
          this.playMV(item)
          break
        case 'program':
          this.handleToAlbum(item)
          // this.playMV()
          break
        default:
          console.log('啥也没有呢～')
      }
    },
    ...mapActions(['selectPlay']),
    ...mapMutations({
      setplayList: SET_PLAYLIST,
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
    setTimeout(() => {
      this._getMusicList()
    }, 1500)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .content-view
    position relative
  .con-mod
    position relative
    transition all 0.3s ease-in
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
        color var(--c_txt2)
        .iconright
          font-size $font-size-small
  .con-scroll-x
    margin-top -10px
  .con-scroll-bd
    margin-bottom -10px
    padding 10px 0
    overflow-x auto
    overflow-y hidden
    margin 0 12px
    .con-list
      font-size 0
      display flex
      .list-item
        vertical-align top
        display inline-block
        margin-bottom 14px
        font-size $font-size-small
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
            margin-top 8px
            line-height 17px
            font-size $font-size-small
            color var(--c_txt1)
            no-wrap-number(2)
</style>
