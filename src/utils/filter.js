import Vue from 'vue'

Vue.filter('replaceWH', (value, wh) => {
  return value.replace('w.h', wh)
})