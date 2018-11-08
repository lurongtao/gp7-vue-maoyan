<template>
  <div class="list-wrap">
    <div v-if="$route.name==='coming'" class="coming-list">
      <div v-for="(value,key) of groupedMovies" :key="key">
        <p class="group-date">{{ key }}</p>
        <movie-item :item="item" v-for="item of value" :key="item.id"></movie-item>
      </div>
    </div>
    <template v-else>
      <movie-item :item="item" v-for="item of movies" :key="item.id"></movie-item>
    </template>
  </div>
</template>

<script>
import MovieItem from './MovieItem'
import { scroll } from 'utils/scroll'
import _ from 'lodash'
import { setTimeout } from 'timers';

export default {
  props: {
    resource: Object
  },

  data () {
    return {
      movies: []
    }
  },

  computed: {
    groupedMovies () {
      return _.groupBy(this.movies, (item) => {
        return item.comingTitle
      })
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

      // 纵向scroll
      // 因为路由有动画，需要播放300毫秒，
      // 因此此处需要加定时器，在300毫秒后创建scroll对象
      setTimeout(() => {
        scroll({
          el: '#movie-scroll',
          data: this.movies,
          horizontal: false,
          inTheater: this.resource,
          url: '/ajax/moreComingList',
          vm: this
        })
      }, 300)
    }
  }
}
</script>


<style lang="stylus" scoped>
</style>
