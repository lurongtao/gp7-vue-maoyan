<template>
  <div class="m-movie">
    <div class="white-bg topbar-bg">
      <div class="city-entry">
        <router-link tag="span" to="/cities" class="city-name">{{ city }}</router-link>
        <svg t="1541208993260" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2028" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15"><path d="M750.331 457.203l-238.576 238.087-238.087-238.576z" p-id="2029"></path></svg>
      </div>
      
      <div class="switch-hot">
        <router-link tag="div" to="/home/movies/intheater" active-class="active" class="hot-item">正在热映</router-link>
        <router-link tag="div" to="/home/movies/coming" active-class="active" class="hot-item">即将上映</router-link>
      </div>

      <div class="search-entry">
        <svg t="1541209876271" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2872" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25"><path d="M466 146c41.6 0 82.1 7.9 120.4 23.4 39.7 16.1 75.3 39.7 105.8 70.3 58.2 58.3 91.5 135.7 93.6 218 2.1 82-26.8 160.7-81.4 221.6l-11.9 13.3-13.3 11.9C620.7 757 544.9 786 465.9 786c-41.6 0-82.1-7.9-120.4-23.4-39.7-16.1-75.3-39.7-105.8-70.3-30.6-30.6-54.2-66.2-70.3-105.8-15.6-38.4-23.4-79-23.4-120.5 0-41.6 7.9-82.1 23.4-120.4 16.1-39.7 39.7-75.3 70.3-105.8 30.6-30.6 66.2-54.2 105.8-70.3C383.9 153.8 424.4 146 466 146m0-40c-92.1 0-184.3 35.1-254.6 105.4-140.6 140.6-140.6 368.5 0 509.1C281.7 790.8 373.8 826 465.9 826c85.9 0 171.8-30.6 240-91.7L889.8 918l28.3-28.3L734.3 706C861 564.7 856.4 347.3 720.5 211.4 650.2 141.1 558.1 106 466 106z" fill="" p-id="2873"></path></svg>
      </div>
    </div>
    <transition :name="transitionName">
      <router-view class="movies-outlet"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      transitionName: ''
    }
  },
  computed: {
    ...mapState(['city'])
  },
  watch: {
    $route (to, from) {
      if ( to.meta > from.meta ) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/border.styl'
@import '~styles/variables.styl'

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 300ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.movies-outlet
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  padding-top .44rem

.m-movie
  height 100%
  display flex
  flex-direction column
  position relative
  .topbar-bg
    height .44rem
    display flex
    border 0 0 1px 0, #ccc
    background #fff
    padding 0 .15rem
    z-index 999
    .city-entry
      flex 85
      display flex
      align-items center
      justify-content flex-start
      color #666
      font-size .15rem
    svg
      fill #999
      margin-top -.03rem
    .switch-hot
      flex 210
      display flex
      color #666
      font-size .15rem
      font-weight 700
      &:after
        background transparent
      .hot-item
        line-height .44rem
        text-align center
        margin 0 .12rem
        flex 1
        &.active
          color $base-color
          border-bottom solid .02rem $base-color
    .search-entry
      flex 80
      display flex
      justify-content flex-end
      align-items center
      svg
        fill $base-color
</style>

