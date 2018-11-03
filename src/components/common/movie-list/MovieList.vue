<template>
  <div class="page-wrap">
		<div class="tab-block">
			<div class="tab-content">
				<div class="page n-hot active" id="movie-scroll">
					<div class="list-wrap" style="margin-top: 0px;"> {{ x }}
            <movie-item :item="item" v-for="item of movies" :key="item.id"></movie-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from 'components/common/movie-list/MovieItem'
import { Indicator } from 'mint-ui'
import BScroll from 'better-scroll'
import axios from 'utils/http'
import _ from 'lodash'
import { setTimeout } from 'timers';

export default {
  props: {
    inTheater: Object
  },

  data () {
    return {
      x: 1
    }
  },

  components: {
    MovieItem
  },

  computed: {
    movies () {
      return this.inTheater && this.inTheater.movieList || []
    }
  },

  mounted () {
    console.log('child-mounted')
    this.count = 0

    setTimeout(() => {
      this.x = 3
    }, 10000)
  },

  updated () {
    console.log('child-updated')
    let that = this

    this.movieIds = _.chunk(this.inTheater.movieIds.slice(12), 10)

    // 为了演示Indicator 唯一实例的问题
    Indicator.close()

    // 声明BScroll
    let bscroll = new BScroll('#movie-scroll', {
      probeType: 1,
      pullUpLoad: {
        threshold: 50
      }
    })

    // 监听 pullingUp
    bscroll.on('pullingUp', async function () {
      // 分页的ajax请求
      let result = await axios({
        url: '/ajax/moreComingList',
        method: 'get',
        params: {
          movieIds: that.movieIds[that.count].join(',')
        }
      })

      // 告诉better-scroll, 可以进行下次滑动了
      bscroll.finishPullUp()
      that.count++
    })
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
