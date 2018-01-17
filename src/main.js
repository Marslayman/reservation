import Vue from 'vue'
import App from './App'
import router from './router'
// import MuseUI from 'muse-ui'
import store from './Vuex/store'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'
import './common/sass/reset.scss'
import './common/font/iconfont.css'
import login from './common/js/mock/login/index'
import sigin from './common/js/mock/sigin/index'
import homepage from './common/js/mock/homepage/index'
import validation from './common/js/mock/validation/index'
import reserve from './common/js/mock/reserve/index'
import reservation from './common/js/mock/reservation/index'
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
const FastClick = require('fastclick')
FastClick.attach(document.body)

// Vue.use(MuseUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
