import * as types from '../../type'
import api from '../../api'

const state = {
  success: false,
  errorMsg: ''
}

const actions = {
  submitInfo({ commit }, params) {
    return new Promise(function (resolve, reject) {
      api.submitInfo(params, function (res) {
        commit(types.SUBMIT_INFO, res)
        resolve(res)
      })
    })
  }
}

const getters = {
  getSuccess: state => state.success,
  getError: state => state.errorMsg
}

const mutations = {
  [types.SUBMIT_INFO](state, res) {
    state.success = res.status === 'success'
    if (!state.success) {
      state.errorMsg = res.error
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
