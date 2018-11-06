<template>
  <div class="page-wrap">
		<div class="tab-block">
			<div class="tab-content">
				<div class="page f-hot active" id="movie-scroll">
					<div class="list-wrap" style="margin-top: 0px;">
						<div class="most-expected">
							<p class="title">近期最受期待</p>
							<div class="most-expected-list">
                <div class="expected-item" data-id="42964">
                  <div class="poster default-img-bg">
                    <img src="https://p0.meituan.net/170.230/movie/363e3a7e614d29b2847ff4e62afcd3f42168651.jpg" onerror="this.style.visibility='hidden'">
                    <span class="wish-bg"></span>
                    <span class="wish"><span class="wish-num">364683</span>人想看</span>
                    <div class="toggle-wish" data-wishst="0" data-movieid="42964">
                      <span></span>
                    </div>
                  </div>
                  <h5 class="name line-ellipsis">毒液：致命守护者</h5>
                  <p class="date">11月9日</p>
                </div>
              </div>
						</div>
            <movie-list :resource="comingResource"></movie-list>
          </div>
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
      comingResource: null
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
      url: '/ajax/comingList'
    })

    this.comingResource = result

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


