import api from '../../api'

const actions = {
  getHomepageInfo({ commit }) {
    return new Promise(function (resolve, reject) {
      api.getHomeInfo(function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
