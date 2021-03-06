import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/login'
import common from './modules/common/common'
import sigin from './modules/sigin/sigin'
import homepage from './modules/homepage/homepage'
import reserve from './modules/reserve/reserve'
import reservation from './modules/reservation/reservation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    common,
    sigin,
    homepage,
    reserve,
    reservation
  }
})
