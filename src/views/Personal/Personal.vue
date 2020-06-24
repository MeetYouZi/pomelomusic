<template>
  <div class="personal">
    <div class="headerbg" :style="headerbg"></div>
    <div class="headerBox">
      <div class="avater">
        <img class="avater_img" v-lazy="profile.avatarUrl || avatarUrl">
      </div>
      <div class="animation">
        <div class="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="userInfo">
      <div class="user_name">{{profile.nickname || nickname}} | {{ gender}} |
        <a
          target="_blank"
          href="https://github.com/MeetYouZi/pomelomusic"
        >
        <i class="iconfont icon-github"></i>
          柚子姑娘
      </a>
      </div>
    </div>
<!--    <div class="loginBox">-->
<!--      <div class="from">-->
<!--        <input class="login_input" v-model="login.phone">-->
<!--      </div>-->
<!--      <div>-->
<!--        <input class="login_input" v-model="login.password">-->
<!--      </div>-->
<!--    </div>-->
    <div class="login_btn" v-show="!isLogin">
      <button class="btn" @click="handleLoginPopup">登录</button>
    </div>
    <login-popup ref="loginPopup" @toast="_longinCellPhone"></login-popup>
    <div class="fixBottom">
      <p @click="handleToggleTheme">不好看？换一个颜色试试？</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { longinCellPhone } from '@/api'
import loginPopup from '@/views/Personal/components/loginByUid'

export default {
  name: 'Personal',
  components: {
    loginPopup
  },
  computed: {
    headerbg () {
      const backgroundUrl = this.isBlack ? this.myBackgroundUrl : this.backgroundUrl
      const url = this.isLogin ? this.profile.backgroundUrl : backgroundUrl
      return `background: url(${url}) center no-repeat`
    },
    gender () {
      if (this.isLogin) {
        return this.profile.gender === 2 ? 'girl' : 'boy'
      } else {
        return '我是柚子姑娘呀'
      }
    },
    isLogin () {
      return this.userInfo.token
    },
    profile () {
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
      isBlack: false
    }
  },
  methods: {
    // 切换主题
    handleToggleTheme () {
      this.isBlack = !this.isBlack
      document.querySelector('html').className = this.isBlack ? 'black' : 'white'
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
    ...mapMutations({
      set_userInfo: 'SET_USERINFO'
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
    .avater
      width 80px
      height 80px
      border-radius 50%
      overflow hidden
      z-index 1
      .avater_img
        width 100%
        height 100%
  .animation
    width 80px
    height 80px
    position absolute
    left 50%
    top 50%
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
      color var(--c_tex1)
      font-size $font-size-large
      font-weight 500
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
