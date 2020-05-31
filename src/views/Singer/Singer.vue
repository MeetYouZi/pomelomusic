<template>
  <div class="singer_list_wrap">
    <ul class="singer_list">
      <li
        class="singer_item"
        v-for="singer in artistsList"
        :key="singer.id"
        @click="handleToSinger(singer.id)"
      >
        <img class="singer_avatar" v-lazy="`${singer.picUrl}?param=50y50`">
        <p class="singer_name">{{singer.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToplistArtists } from '@/api'

export default {
  name: 'singer',
  data () {
    return {
      artistsList: []
    }
  },
  methods: {
    handleToSinger (singerId) {
      this.$router.push(`/artists/${singerId}`)
    },
    _getToplistArtists () {
      getToplistArtists().then(res => {
        this.artistsList = res.list.artists
      })
    }
  },
  created () {
    this._getToplistArtists()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.singer_list
  position relative
  margin 16px
  background var(--bg)
  z-index 11
  .singer_item
    display flex
    align-items center
    padding 12px 0
    .singer_avatar
      width 44px
      height 44px
      border-radius 50%
    .singer_name
      padding-left 12px
      font-size $font-size-large
      color var(--c_txt1)
</style>
