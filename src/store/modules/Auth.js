/* eslint-disable no-return-assign */
import Axios from '../../service/axiosInstance'
import router from '../../router'

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
    state.token = data.access_token
    state.user = data.user
    router.push('/todo').catch(() => {})
  },
  logoutUser: (state) => {
    state.token = null
    state.user = {}
    router.push('/login').catch(() => {})
  }
}

const actions = {
  loginUser (context, credentials) {
    Axios.post('/api/user/login', credentials).then(res => {
      setToken(context, res.data)
    }).catch(err => console.log(err))
  },
  logoutUser: (context) => {
    if (context.getters.loggedIn) {
      Axios.post('/api/user/logout').then(res => {
        removeToken(context)
      }).catch(err => {
        removeToken(context)
        console.log(err)
      })
    }
  }
}

const removeToken = (context) => {
  localStorage.removeItem('token')
  context.commit('logoutUser')
}

const setToken = (context, data) => {
  localStorage.setItem('token', `Bearer ${data.access_token}`)
  context.commit('loginUser', data)
}

export default {
  state,
  getters,
  actions,
  mutations
}
