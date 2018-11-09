<template>
  <section class="city-list-container" id="city-list-scroll">
    <div class="city-list-wrap">
      <section class="history-city-list">
        <div ref="visited" class="city-title">
          最近访问城市
        </div>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" @click="pickIt">
            {{ city }}
          </div>
        </div>
      </section>
      <section>
        <div ref="hot" class="city-title">
          热门城市
        </div>
        <div class="city-list city-list-inline clearfix">
          <div class="city-item" @click="pickIt(item.name)" v-for="item of hotCities" :key="item.id">
            {{ item.name }}
          </div>
        </div>
      </section>
      <section>
        <div v-for="(v, k) of allCities" :key="k">
          <div :ref="k" class="city-title city-title-letter">
            {{ k }}
          </div>
          <div class="city-list city-list-block clearfix">
            <div class="city-item" @click="pickIt(item.name)" v-for="item of v" :key="item.id">
              {{ item.name }}
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="nav">
      <div class="nav-item" @click="gotoVisited">
        最近
      </div>
      <div class="nav-item" @click="gotoHotlist">
        热门
      </div>
      <div 
        class="nav-letter nav-item" 
        @click="gotoLetter(key)" 
        v-for="(item, key) of allCities" 
        :key="key"
        @touchstart = "handleTouchStart($event)"
        @touchmove = "handleTouchMove($event)"
        @touchend = "handleTouchEnd($event)"
      >
        {{ key }}
      </div>
    </section>
  </section>
</template>

<style lang="stylus" scoped>
.city-list-container
  display block
</style>

<script>
import http from 'utils/http'
import BScroll from 'better-scroll'
import { clearTimeout, setTimeout } from 'timers'
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      hotCities: [],
      allCities: null
    }
  },

  computed: {
    ...mapState(['city'])
  },

  methods: {

    throttle : function (el) {
      return _.throttle(this.handleTouchMove.bind(this, el), 100)
    },

    pickIt (city) {
      this.$router.push('/home/movies/intheater')
      if (city) {
        this.$store.commit('changeCity', city)
      }
    },

    scrollToElement (el) {
      this.bscroll.scrollToElement(el)
    },

    gotoVisited () {
      this.scrollToElement(this.$refs.visited)
    },

    gotoHotlist () {
      this.scrollToElement(this.$refs.hot)
    },

    gotoLetter (key) {
      this.scrollToElement(this.$refs[key][0])
    },

    handleTouchStart (e) {
      this.touchStatus = true
    },

    handleTouchMove: _.throttle( function(e) {
      if (this.touchStatus) {
        let index = Math.floor((e.touches[0].clientY - 120) / 18.67)
        let letters = Object.keys(this.allCities)
        let Alphabet = letters[index]
        if (index >= 0 && index < letters.length ) {
          this.scrollToElement(this.$refs[Alphabet][0])
        }
      }
    }, 100),

    handleTouchEnd() {
      this.touchStatus = false
    }
  },

  async mounted () {
    let result = await http({
      url: '/cities.json',
      method: 'get'
    })

    this.hotCities = result.hotCities
    this.allCities = result.cities

    this.$nextTick(() => {
      this.bscroll = new BScroll('#city-list-scroll', {
        probeType: 1,
        click: true
      })

      this.timer = null
    })
  }
}
</script>

