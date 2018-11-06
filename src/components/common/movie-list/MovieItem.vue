<template>
  <div class="item">
    <div class="main-block">
      <div class="avatar" sort-flag="">
        <div class="default-img-bg">
          <img :src="item.img | replaceWH('128.180')" onerror="this.style.visibility='hidden'">		
        </div>
      </div> 
      <div class="mb-outline-b content-wrapper">
        <div class="column content">
          <div class="box-flex movie-title">
            <div class="title line-ellipsis v3d_title">{{ item.nm }}</div>
            <span class="version" :class="item.version"></span>
            <span :class="{'pre-show': item.preShow}"></span>
          </div>
          <div v-if="$route.name==='intheater'" class="detail column">
            <div class="score line-ellipsis"> 
              <span class="score-suffix">观众评 </span>
              <span class="grade">{{ item.sc }}</span>
            </div>
            <div class="actor line-ellipsis">{{ item.star || '暂无演职人员信息' }}</div>
            <div class="show-info line-ellipsis">{{ item.showInfo }}</div>
          </div>
          <div v-else class="detail column">
            <div class="wantsee line-ellipsis">
              <span class="person">{{item.wish}}</span>
              <span class="p-suffix">人想看</span>
            </div>							
            <div class="actor line-ellipsis">主演: {{item.star || '暂无主演信息'}}</div>
            <div class="actor line-ellipsis">{{ item.rt }} 上映</div>
          </div>
      </div>
        </div>
        <div class="button-block">
          <movie-button v-if="$route.name==='intheater'" :globalReleased="item.globalReleased">
            {{ item.globalReleased | globalReleasedText }}
          </movie-button>
          <movie-button v-else :showst="item.showst">
            {{ item.showst | showStText }}
          </movie-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieButton from 'components/common/movie-list/MovieButton'
export default {
  props: {
    item: Object
  },
  components: {
    MovieButton
  },
  filters: {
    globalReleasedText (value) {
      return !value ? '预售' : '购票'
    },
    showStText (value) {
      return value === 4 ? '预售' : '想看'
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/ellipsis.styl'
@import '~styles/border.styl'
.default-img-bg
  img
    width .64rem
    height .9rem
.line-ellipsis
  ellipsis()
.movie-title
  display flex
.content-wrapper
  height auto !important
  max-height none !important
  border 0 0 1px 0, #ccc
</style>

