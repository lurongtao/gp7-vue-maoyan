<template>
  <div class="page-wrap">
		<div class="tab-block">
			<div class="tab-content">
				<div class="page n-hot active" id="movie-scroll">
					<div class="list-wrap" style="margin-top: 0px;">
            <movie-item :item="item" v-for="item of movies" :key="item.id"></movie-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem'
import { scroll } from 'utils/scroll'

export default {
  props: {
    inTheater: Object
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
    inTheater () {
      this.movies = this.inTheater && this.inTheater.movieList || []

      scroll({
        el: '#movie-scroll',
        data: this.movies,
        inTheater: this.inTheater,
        url: '/ajax/moreComingList',
        vm: this
      })
    }
  },

  mounted () {
    
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/libs/movie-list.css'
.page-wrap
  flex 1
  .tab-block
    height 100%
    .tab-content
      height 100%
      position relative
      .page
        height 100%
        padding-right .15rem
</style>
