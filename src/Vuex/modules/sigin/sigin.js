import * as types from '../../type'
import api from '../../api'

const state = {
  siginStatus: false,
  errorMessage: ''
}

const actions = {
  sendMessage(params) {
    return new Promise(function (resolve, reject) {
      api.sendMessage(params, function (res) {
        resolve(res)
      })
    })
  },
  getSigin({ commit }, params) {
    return new Promise(function (resolve, reject) {
      api.getSigin(params, function (res) {
        commit(types.SIGIN_SUCCESS, res)
        resolve(res)
      })
    })
  }
}

const getters = {
  getSigninSuccess: state => state.siginStatus,
  getSigninMessage: state => state.errorMessage
}

const mutations = {
  [types.SIGIN_SUCCESS](state, res) {
    state.siginStatus = res.status === 'yes'
    if (!state.siginStatus) {
      state.errorMessage = res.error
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
