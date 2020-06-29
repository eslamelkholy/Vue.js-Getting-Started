/* eslint-disable no-return-assign */

const state = () => ({
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
})

const getters = {
  remaining: (state) => {
    return state.todos.filter(todo => !todo.completed).length
  },
  anyRemaining: (state, getters) => {
    return getters.remaining !== 0
  },
  todosFiltered: (state) => {
    if (state.filter === 'active') return state.todos.filter(todo => !todo.completed)
    if (state.filter === 'completed') return state.todos.filter(todo => todo.completed)
    return state.todos
  },
  showClearCompletedButton: (state) => {
    return state.todos.filter(todo => todo.completed).length > 0
  }
}

const mutations = {
  addTodo: (state, todo) => {
    state.todos.push(todo)
  },
  clearCompleted: (state) => {
    state.todos = state.todos.filter(todo => !todo.completed)
  },
  updateFilter: (state, filter) => {
    state.filter = filter
  },
  allChecked: (state, checkedStatus) => {
    state.todos.forEach(todo => todo.completed = checkedStatus)
  },
  removeTodo: (state, id) => {
    const index = state.todos.findIndex(item => item.id === id)
    state.todos.splice(index, 1)
  },
  editTodo: (state, todo) => {
    const index = state.todos.findIndex(item => item.id === todo.id)
    state.todos.splice(index, 1, todo)
  }
}

const actions = {
  addTodo: ({ commit }, todo) => {
    commit('addTodo', todo)
  },
  clearCompleted: ({commit}) => {
    commit('clearCompleted')
  },
  updateFilter: ({ commit }, filter) => {
    commit('updateFilter', filter)
  },
  allChecked: ({ commit }, checkedStatus) => {
    commit('allChecked', checkedStatus)
  },
  removeTodo: ({ commit }, id) => {
    commit('removeTodo', id)
  },
  editTodo: ({ commit }, todo) => {
    commit('editTodo', todo)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
