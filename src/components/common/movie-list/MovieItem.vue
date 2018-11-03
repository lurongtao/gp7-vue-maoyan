<template>
  <div class="item" data-id="346015" data-bid="dp_wx_home_movie_list">
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
          </div>
          <div class="detail column">
            <div class="score line-ellipsis"> 
              <span class="score-suffix">观众评 </span>
              <span class="grade">{{ item.sc }}</span>
            </div>
            <div class="actor line-ellipsis">{{ item.star }}</div>
            <div class="show-info line-ellipsis">{{ item.showInfo }}</div>
          </div>
        </div>
        <div class="button-block" data-id="346015">
          <movie-button :preShow="item.preShow">
            {{ item.preShow | preShowText }}
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
    preShowText (value) {
      return value ? '预售' : '购票'
    }
  }
}
</script>


<style lang="stylus" scoped>
@import '~styles/ellipsis.styl'
@import '~styles/border.styl'
.line-ellipsis
  ellipsis()
.movie-title
  display flex
.content-wrapper
  height auto !important
  max-height none !important
  border 0 0 1px 0, #ccc
</style>

