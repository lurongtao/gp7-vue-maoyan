<template>
  <div class="page-wrap">
		<div class="tab-block">
			<div class="tab-content">
				<div class="page f-hot active" id="movie-scroll">
					<div class="list-wrap" style="margin-top: 0px;">
						<div class="most-expected">
							<p class="title">近期最受期待</p>
							<div class="most-expected-list" id="most-expected-scroll">
                <div class="most-expected-list-wrap">
                  <div v-for="item of mostExpected" :key="item.id" class="expected-item">
                    <div class="poster default-img-bg">
                      <img :src="item.img | replaceWH('170.230')" onerror="this.style.visibility='hidden'">
                      <span class="wish-bg"></span>
                      <span class="wish"><span class="wish-num">{{ item.wish }}</span>人想看</span>
                      <div class="toggle-wish" data-wishst="0" data-movieid="42964">
                        <span></span>
                      </div>
                    </div>
                    <h5 class="name line-ellipsis">{{ item.nm }}</h5>
                    <p class="date">{{ item.comingTitle }}</p>
                  </div>
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
import { scroll } from 'utils/scroll'

export default {
  data () {
    return {
      comingResource: null,
      mostExpected: []
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

    this.comingResource = await http({
      method: 'get',
      url: '/ajax/comingList'
    })

    let mostExpectedResource = (await http({
      method: 'get',
      url: '/ajax/mostExpected'
    }))
    this.mostExpected = mostExpectedResource.coming
    
    // 横向scroll
    scroll({
      el: '#most-expected-scroll',
      data: this.mostExpected,
      horizontal: true,
      paging: mostExpectedResource.paging,
      url: '/ajax/mostExpected',
      vm: this
    })

    // 为了演示Indicator 唯一实例的问题
    Indicator.close()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/libs/movie-list.css'
@import '~styles/ellipsis.styl'
.most-expected-list-wrap
  width max-content
.most-expected
  height 2.24rem
.line-ellipsis
  ellipsis()
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


