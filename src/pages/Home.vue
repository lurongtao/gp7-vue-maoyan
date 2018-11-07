<template>
  <div class="home-wrap">
    <Header></Header>
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <vue-progress-bar></vue-progress-bar>
    </main>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from 'components/layout/Header'
import TabBar from 'components/layout/TabBar'

export default {
  components: {
    Header,
    TabBar
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  }
}
</script>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.home-wrap
  height 100%
  display flex
  flex-direction column
  background #fff
  main
    flex 1
    overflow hidden
</style>


