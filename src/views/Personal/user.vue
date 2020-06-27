<template>
  <transition name="playlist">
    <div class="userWrap" v-if="isShow">
      <div class="close" @click="handleLoginOut"><i class="iconfont iconclose"></i> </div>
      <div class="userInfo">
        <div class="avatar">
          <img class="avatar_img" v-lazy="user.avatarUrl"/>
        </div>
        <p class="nickname">{{user.nickname}}</p>
      </div>
      <div class="userMusicList">
        <ul class="userPlayList">
          <li class="userPlayItem" v-for="item in playList" :key="item.id" @click="handelToUrl(item.id)">
            <img class="cover-img" v-lazy="`${item.coverImgUrl}?param=200y200`"/>
            <div class="content">
              <p class="playName">{{item.name}}</p>
              <p class="trackCount">{{item.trackCount}} 首</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'user',
  props: {
    isShow: Boolean,
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters(['userPlayList']),
    playList () {
      console.log(this.userPlayList, 'this.userPlayList')
      return this.userPlayList.length && this.userPlayList.filter(item => item.trackCount > 0)
    }
  },
  methods: {
    handelToUrl (id) {
      this.$router.push(`/musicList/${id}`)
    },
    handleLoginOut () {
      this.$emit('handleLoginOut')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.userWrap
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background var(--playlistBg)
  transition: all 0.3s ease-in-out
  overflow scroll
  &.playlist-enter-active, &.playlist-leave-active
    transition: all 0.4s ease-in-out
  &.playlist-enter, &.playlist-leave-to
    transform: translate3d(0, 600px, 0)
    opacity 0
  .close
    position absolute
    top 10px
    right 10px
    .iconfont
      font-size 22px
      color var(--c_txt2)
  .userMusicList
    position relative
    .userPlayList
      .userPlayItem
        padding 14px
        box-sizing border-box
        display flex
        .cover-img
          width 45px
          height 45px
          border-radius 6px
        .content
          display flex
          flex-direction column
          align-items flex-start
          margin-left 10px
          .playName
            margin-bottom 8px
            color var(--c_txt1)
          .trackCount
            color var(--c_txt2)
  .userInfo
    display flex
    align-items center
    padding 14px
    box-sizing border-box
    .nickname
      color var(--c_txt1)
      margin-left 10px
      font-size $font-size-medium
    .avatar
      width 50px
      height 50px
      border-radius 50%
      overflow hidden
      .avatar_img
        width 100%
        height 100%
</style>
