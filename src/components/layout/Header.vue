<template>
  <div>
    猫眼电影 <mt-button>click</mt-button>
  </div>
</template>

<script>
import { Button } from 'mint-ui'

export default {
  components: {
    [Button.name]: Button
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/variables.styl'
div
  height .5rem
  font-weight 100
  background $base-color
  color #fff
  font-size .18rem
  line-height .5rem
  text-align center
</style>

