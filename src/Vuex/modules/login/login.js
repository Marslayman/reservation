import * as types from '../../type'
import api from '../../api'

const state = {
  loginStatus: false,
  errorMessage: ''
}

const actions = {
  getLogin: function ({commit}, params) {
    return new Promise((resolve, reject) => {
      api.getLogin(params, function (res) {
        commit(types.LOGIN_SUCCESS, res)
        resolve(res)
      })
    })
  }
}

const getters = {
  getLoginSuccess: state => state.loginStatus,
  getErrorMessage: state => state.getErrorMessage

}

const mutations = {
  [types.LOGIN_SUCCESS](state, res) {
    state.loginStatus = res.status === 'in';
    state.errorMessage = res.error;
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
