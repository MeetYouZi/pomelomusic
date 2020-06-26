<template>
  <div class="personal">
    <div class="headerbg" :style="headerbg"></div>
    <div class="headerBox" :class="{'fixLeft': isUser}">
      <div class="avatar">
        <img class="avatar_img" v-lazy="user.avatarUrl || avatarUrl">
      </div>
      <div class="animation">
        <div class="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <template>
      <user :isShow="isUser" :user="user" @handleLoginOut="handleLoginOut"></user>
    </template>
    <div class="userInfo">
      <div class="user_name">{{user.nickname || nickname}} | {{ gender}} |
        <a
          target="_blank"
          href="https://github.com/MeetYouZi/pomelomusic"
        >
        <i class="iconfont icon-github"></i>
          柚子姑娘
      </a>
      </div>
    </div>
    <div class="login_btn" v-show="!isLogin">
      <button class="btn" @click="handleLoginPopup">登录</button>
    </div>
    <login-popup ref="loginPopup" @toast="_getUserPlaylist"></login-popup>
    <div class="changeView" v-show="isLogin">
      <p @click="isShow = true">去我的音乐看看吧</p>
    </div>
    <div class="fixBottom">
      <p @click="handleToggleTheme">不好看？换一个颜色试试？</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { longinCellPhone, getUserPlaylist, getUserDetail } from '@/api'
import loginPopup from '@/views/Personal/components/loginByUid'
import User from './user'

export default {
  name: 'Personal',
  components: {
    loginPopup,
    User
  },
  computed: {
    isUser () {
      return this.isLogin && this.isShow
    },
    headerbg () {
      const backgroundUrl = this.isBlack ? this.myBackgroundUrl : this.backgroundUrl
      const url = this.isLogin ? this.user.backgroundUrl : backgroundUrl
      return `background: url(${url}) center no-repeat`
    },
    gender () {
      if (this.isLogin) {
        return this.user.gender === 2 ? 'girl' : 'boy'
      } else {
        return '我是柚子姑娘呀'
      }
    },
    isLogin () {
      return this.userInfo.createTime
    },
    user () {
      return this.isLogin ? this.userInfo.profile : {}
    },
    ...mapGetters(['userInfo'])
  },
  data () {
    return {
      defaultImg: require('../../assets/img/loading.jpeg'),
      nickname: '你是谁呀？',
      avatarUrl: 'https://p4.music.126.net/KHMZU_0fBdqggOzRH6xx8g==/19198572532647757.jpg',
      myBackgroundUrl: 'https://p3.music.126.net/hz-kOwghDqrIsyQD5gE8_w==/109951163380875324.jpg',
      backgroundUrl: 'https://p4.music.126.net/zgFcCXmNN9fS9ah5pyqpLw==/109951165012953301.jpg',
      login: {
        phone: '',
        password: ''
      },
      isBlack: false,
      isShow: true
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      this.isBlack = !this.isBlack
      document.querySelector('html').className = this.isBlack ? 'black' : 'white'
    },
    handleLoginOut () {
      this.isShow = false
    },
    handleLoginPopup () {
      this.$refs.loginPopup.show()
    },
    _longinCellPhone (loginform) {
      const data = loginform
      longinCellPhone(data).then(res => {
        this.set_userInfo(res)
        this.$refs.loginPopup.hide()
      })
    },
    _getUserPlaylist (loginform) {
      if (!loginform.uid) return
      const data = loginform
      Promise.all([getUserDetail(data), getUserPlaylist(data)])
        .then(res => {
          this.set_userInfo(res[0])
          this.userPlayList(res[1])
          // localStorage.setItem('pomelo_userInfo', JSON.stringify(res[0]))
          localStorage.setItem('pomelo_playlist', JSON.stringify(res[1].playlist))
          console.log(res)
        })
    },
    ...mapMutations({
      set_userInfo: 'SET_USERINFO',
      userPlayList: 'SET_USERPLAYLIST'
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.personal
  position relative
  height 100%
  width 100%
  overflow hidden
  .headerbg
    position fixed
    width 100%
    height 100%
    top 0
    bottom 0
    filter blur(4px)
    transform scale(1.1)
    z-index -1
    &:after
      content ""
      z-index 1
      position fixed
      width 100%
      height 100%
      top 0
      bottom 0
      background var(--bg_mask)
      backdrop-filter saturate(180%) blur(10px)
  .headerBox
    position relative
    height 300px
    display flex
    align-items center
    justify-content center
    mask-image linear-gradient(180deg,hsla(0,0%,100%,0) 0,
    hsla(0,0%,100%,1) 15%,#fff 25%,#fff 65%,hsla(0,0%,100%,1) 100%)
    z-index -1
    transition transform .5s
    .avatar
      width 80px
      height 80px
      border-radius 50%
      overflow hidden
      z-index 1
      transition opacity .5s
      .avatar_img
        width 100%
        height 100%
        transition-timing-function cubic-bezier(.55,0,.85,.36)
        transition transform .5s
    &.fixLeft
      transform: translate(-120px, -80px)
      .avatar
        width 60px
        height 60px
        //opacity 0
        transition-timing-function linear
      .animation
        //opacity 0
  .animation
    width 80px
    height 80px
    position absolute
    left 50%
    top 50%
    transition opacity .3s
    transform translate(-50%, -50%)
  .ball-scale-multiple
    position: relative
    z-index 0
    & div:nth-child(2)
      animation-delay -3s
    & div:nth-child(3)
      animation-delay -2s
    div
      background-color #fff
      border-radius 100%
      animation-fill-mode: both
      position absolute
      left -40px
      top -40px
      opacity 0
      margin 0
      width 160px
      height 160px
      animation ball-scale-multiple 6s 0s linear infinite
  .userInfo
    display flex
    align-items center
    justify-content center
    margin-top -60px
    margin-bottom 30px
    .user_name
      color var(--color)
      font-size $font-size-large
      font-weight 500
  .changeView
    display flex
    align-items center
    justify-content center
    color var(--color)
  .login_btn
    display flex
    align-items center
    justify-content center
    z-index 1
    .btn
      width 200px
      height 40px
      background rgba(0, 0, 0, 0.5)
      border-radius 20px
      font-size $font-size-medium
      color #fff
      border none
  .fixBottom
    position fixed
    bottom 110px
    width 100%
    p
      text-align center
      font-size $font-size-small
      color var(--c_txt2)
@keyframes ball-scale-multiple {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0; }
  5% {
    opacity: 1; }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0; } }
</style>
