/* eslint-disable no-return-assign */
import Axios from '../../service/axiosInstance'
import router from '../../router'
import AuthService from '../../service/Auth'

const state = () => ({
  token: localStorage.getItem('token') || null,
  user: {}
})

const getters = {
  loggedIn: (state) => {
    return state.token !== null
  }
}

const mutations = {
  loginUser: (state, data) => {
    AuthService.setState(state, data)
    router.push('/todo').catch(() => {})
  },
  logoutUser: (state) => {
    state.token = null
    state.user = {}
    router.push('/login').catch(() => {})
  },
  registerUser: (state, data) => {
    AuthService.setState(state, data)
    router.push('/todo').catch(() => {})
  }
}

const actions = {
  loginUser: async (context, credentials) => {
    const res = await Axios.post('/api/user/login', credentials)
    AuthService.setToken(res.data.access_token)
    context.commit('loginUser', res.data)
  },
  logoutUser: async (context) => {
    if (context.getters.loggedIn) {
      await Axios.post('/api/logout')
      AuthService.removeToken(context)
    }
  },
  registerUser: async (context, data) => {
    const res = await Axios.post('/api/user/register', data)
    AuthService.setToken(res.data.access_token)
    context.commit('registerUser', res.data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
