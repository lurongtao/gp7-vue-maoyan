<template>
  <div class="page-wrap">
		<div class="tab-block">
			<div class="tab-content">
				<div class="page n-hot active" id="movie-scroll">
          <movie-list :resource="inTheaterResource"></movie-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieList from 'components/common/movie-list/MovieList'
import http from 'utils/http'
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      inTheaterResource: null,
    }
  },

  components: {
    MovieList
  },

  async beforeCreate () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })

    let result = await http({
      method: 'get',
      url: '/ajax/movieOnInfoList'
    })

    this.inTheaterResource = result

    // 为了演示Indicator 唯一实例的问题
    Indicator.close()
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


