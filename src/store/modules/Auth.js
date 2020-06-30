/* eslint-disable no-return-assign */
import Axios from '../../service/axiosInstance'

const state = () => ({
  token: localStorage.getItem('token') || null,
  user: {}
})

const getters = {
}

const mutations = {
  loginUser: (state, data) => {
    state.token = data.access_token
    state.user = data.user
  }
}

const actions = {
  loginUser ({ commit }, credentials) {
    Axios.post('/api/user/login', credentials).then(res => {
      const token = res.data.access_token
      localStorage.setItem('token', `Bearer ${token}`)
      commit('loginUser', res.data)
    }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
