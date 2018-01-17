import axios from 'axios'
import Vue from 'vue'
import { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)

axios.interceptors.request.use(
  config => {
    Vue.$vux.loading.show({
      text: '正在提交请求'
    })
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
    Vue.$vux.loading.hide()
    return response;
  },
  err => {
    return Promise.reject(err);
  }
)

export default {
  sendMessage: function (params, cb) {
    axios.get('/api/validation').then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getReservation: function (cb) {
    axios.get('/api/reservation').then(function (res) {
      if (res.status >= 200 & res.status < 300) {
        cb(res.data)
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  submitInfo: function (params, cb) {
    axios.get('/api/reserve').then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    })
  },
  getLogin: function (params, cb) {
    axios.get('/api/login').then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getSigin: function (params, cb) {
    axios.get('/api/sigin').then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  },
  getHomeInfo: function (cb) {
    axios.get('/api/homepage').then(function (res) {
      if (res.status >= 200 && res.status < 300) {
        cb(res.data)
      }
    }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
