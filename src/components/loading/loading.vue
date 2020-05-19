<template>
  <div class="loading">
    <div class="loading-row">
      <ul class="con-list">
        <li class="list-item" v-for="item in 5">
          <div class="list-box">
            <div class="list-media">
            </div>
            <div class="list-bd"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loading-row
  margin-bottom -10px
  padding 10px 0
  overflow-x auto
  overflow-y hidden
  margin 0 12px
  .con-list
    font-size 0
    display flex
    .list-item
      display inline-block
      margin-bottom 14px
    .list-box
      width 110px
      margin 0 4px
      .list-media
        height 110px
        background #f2f2f2
        position relative
        border-radius 8px
      .list-bd
        margin-top 8px
        border-radius 8px
        height 14px
        background #f2f2f2
</style>
