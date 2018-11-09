import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  city: '北京'
}

const mutations = {
  changeCity (state, pickedCity) {
    state.city = pickedCity
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

export default store