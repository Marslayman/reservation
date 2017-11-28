import axios from 'axios'
import * as types from './type'
import store from './store'

axios.interceptors.request.use(
  config => {
    store.commit(types.GLOBAL_LOADING_STATUS, true)
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
    store.commit(types.GLOBAL_LOADING_STATUS, false)
    return response;
  },
  err => {
    return Promise.reject(err);
  }
)

export default {
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
    })
  }
}
