import api from '../../api'

const actions = {
  getLogin: function (params) {
    return new Promise((resolve, reject) => {
      api.getLogin(params, function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
