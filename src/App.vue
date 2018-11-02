<template>
  <Home></Home>
</template>

<script>
import '@/assets/styles/reset.styl'
import Home from './pages/Home'
export default {
  data () {
    return {
      greeting: 'hello'
    }
  },
  methods: {
    handleClick () {
      console.log(0)
    }
  },
  components: {
    Home
  }
}
</script>

<style lang="stylus" scoped>
  div
    background red
</style>
