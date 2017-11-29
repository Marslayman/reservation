import * as types from '../../type'

const state = {
  loadingStatus: false
}

const mutations = {
  [types.GLOBAL_LOADING_STATUS](state, flag) {
    state.loadingStatus = flag;
  }
}

const getters = {
  getLoadingStatus: state => state.loadingStatus
}

export default {
  state,
  mutations,
  getters
}
