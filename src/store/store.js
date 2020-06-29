/* eslint-disable no-return-assign */
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
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    updateFilter (state, filter) {
      state.filter = filter
    },
    allChecked (state, checkedStatus) {
      state.todos.forEach(todo => todo.completed = checkedStatus)
    },
    removeTodo (state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    editTodo (state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, todo)
    }
  }
})
