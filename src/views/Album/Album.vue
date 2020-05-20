<template>
  <div>
    电台详情
  </div>
</template>

<script>
import { getdjdetail, getdjprogram } from '@/api'

export default {
  name: 'album',
  methods: {
    _getdjdetail () {
      const data = {
        id: this.$route.params.rid
      }
      getdjdetail(data).then(res => {
        console.log(res)
      })
    },
    _getdjprogram () {
      const data = {
        rid: this.$route.params.rid,
        limit: 30
      }
      getdjprogram(data).then(res => {
        console.log(res)
      })
    }
  },
  created () {
    this._getdjdetail()
    this._getdjprogram()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
