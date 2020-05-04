<template>
  <div id="app">
    <router-view/>
    <pomelo-play></pomelo-play>
  </div>
</template>

<script>
import pomeloPlay from '@/components/pomeloPlay/pomeloPlay'
export default {
  components: {
    pomeloPlay
  }
}
</script>
<style lang="stylus" scoped>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
</style>
