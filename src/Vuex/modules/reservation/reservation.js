import api from '../../api'

const actions = {
  getReservation() {
    return new Promise(function (resolve, reject) {
      api.getReservation(function (res) {
        resolve(res)
      })
    })
  }
}

export default {
  actions
}
