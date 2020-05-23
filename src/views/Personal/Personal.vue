<template>
  <div class="personal">
    <div class="headerbg">
    </div>
    <div class="headerBox">
      <div class="avater">
        <img class="avater_img" src="../../assets/img/loading.jpeg">
      </div>
      <div class="animation">
        <div class="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="login_btn">
      <button class="btn">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personal'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.personal
  position relative
  height 100%
  width 100%
  overflow hidden
  .headerbg
    position absolute
    width 100%
    height 300px
    background url("../../assets/img/loading.jpeg") no-repeat center
    filter blur(10px)
    transform scale(1.2)
    z-index -1
  .headerBox
    position relative
    height 300px
    display flex
    align-items center
    justify-content center
    mask-image linear-gradient(180deg,hsla(0,0%,100%,0) 0,
    hsla(0,0%,100%,1) 15%,#fff 25%,#fff 65%,hsla(0,0%,100%,1) 100%)
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
