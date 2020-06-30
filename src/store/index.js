import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './modules/Todo'
import Auth from './modules/Auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Todo,
    Auth
  }
})
