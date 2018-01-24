import api from '../../api'

const actions = {
  sendMessage(params) {
    return new Promise(function (resolve, reject) {
      api.sendMessage(params, function (res) {
        resolve(res)
      })
    })
  },
  getSigin(params) {
    return new Promise(function (resolve, reject) {
      api.getSigin(params, function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
