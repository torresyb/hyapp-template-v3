/**
 * @author yangbin
 * @date 2018/4/18
 * @Description: vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

import Home from './modules/home'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    Home
  },
  strict: false
})

export default store
