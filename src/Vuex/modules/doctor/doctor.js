import api from '../../api'

const actions = {
  getDocDetail(params) {
    return new Promise(function (resolve, reject) {
      api.getDocDetail(params, function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
