import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    todos: [
      {
        'id': 1,
        'title': 'Finished Vue Screencase',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Take Overworld',
        'completed': false,
        'editing': false
      }
    ],
    filter: 'all'
  },
  getters: {
    remaining (state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining (state, getters) {
      return getters.remaining !== 0
    },
    todosFiltered (state) {
      if (state.filter === 'active') return state.todos.filter(todo => !todo.completed)
      if (state.filter === 'completed') return state.todos.filter(todo => todo.completed)
      return state.todos
    },
    showClearCompletedButton (state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  }
})