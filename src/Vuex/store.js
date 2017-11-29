import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/login'
import common from './modules/common/common'
import sigin from './modules/sigin/sigin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    common,
    sigin
  }
})
