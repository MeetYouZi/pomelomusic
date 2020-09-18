<template>
  <div class="simiSongsList">
    <ul>
      <li class="simiSong"
          v-for="item in simiSongList"
          :key="item.id"
          @click="handleToDetail(item.id)"
      >
        <img class="list_img" :src="`${item.image}?param=100y100`"/>
        <div class="content">
          <div class="simiSong_info">
            <h3 class="name">{{item.name}}</h3>
            <p class="singer">{{item.singer}}</p>
          </div>
          <i class="right_arrow"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  name: 'simiSongsList',
  props: {
    simiSongList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleToDetail (singId) {
      this.$router.push(`/playSong/${singId}`)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.simiSong
  display flex
  align-items center
  justify-content space-between
  margin-bottom 10px
  .list_img
    width 65px
    height 65px
    border-radius 8px
    margin-right 12px
  .content
    flex 1
    display flex
    position relative
    justify-content space-between
    align-items center
    overflow hidden
    .simiSong_info
      overflow hidden
      line-height 1.5
      .name
        font-size $font-size-medium
        font-weight 400
        color var(--color)
        no-wrap()
      .singer
        font-size $font-size-small
        color: var(--c_txt2)
  .right_arrow
    flex: 0 0 8px
    display: block
    width: 8px
    height: 8px
    border-style: solid
    border-width: 0 1px 1px 0
    border-color: var(--c_txt2)
    transform: rotate(-45deg)
    margin-right 2px
</style>
