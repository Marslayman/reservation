import api from '../../api'

const actions = {
  submitInfo(params) {
    return new Promise(function (resolve, reject) {
      api.submitInfo(params, function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
