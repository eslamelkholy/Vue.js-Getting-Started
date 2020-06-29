import Vue from 'vue'
import Vuex from 'vuex'
import Todo from './modules/Todo'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    Todo
  }
})
