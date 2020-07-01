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
  loginUser (context, credentials) {
    Axios.post('/api/user/login', credentials).then(res => {
      AuthService.setToken(res.data.access_token)
      context.commit('loginUser', res.data)
    }).catch(err => console.log(err))
  },
  logoutUser: (context) => {
    if (context.getters.loggedIn) {
      Axios.post('/api/logout').then(res => {
        AuthService.removeToken(context)
      }).catch(err => {
        AuthService.removeToken(context)
        console.log(err)
      })
    }
  },
  registerUser: (context, data) => {
    Axios.post('/api/user/register', data).then(res => {
      AuthService.setToken(res.data.access_token)
      context.commit('registerUser', res.data)
    }).catch(err => console.log(err))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
