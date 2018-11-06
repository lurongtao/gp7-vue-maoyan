<template>
  <div class="list-wrap" style="margin-top: 0px;">
    <movie-item :item="item" v-for="item of movies" :key="item.id"></movie-item>
  </div>
</template>

<script>
import MovieItem from './MovieItem'
import { scroll } from 'utils/scroll'

export default {
  props: {
    resource: Object
  },

  data () {
    return {
      movies: []
    }
  },

  components: {
    MovieItem
  },

  watch: {
    // 1、监听父组件二次传过来的新值
    // 2、下一步准备更新moives, 因此必须让movies可以重新赋值
    resource () {
      this.movies = this.resource 
        && (this.$route.name === 'intheater' 
          ? this.resource.movieList
          : this.resource.coming) 
        || []

      scroll({
        el: '#movie-scroll',
        data: this.movies,
        inTheater: this.resource,
        url: '/ajax/moreComingList',
        vm: this
      })
    }
  }
}
</script>


<style lang="stylus" scoped>
</style>
