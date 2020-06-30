/* eslint-disable no-return-assign */
import Axios from '../../service/axiosInstance'

const state = () => ({
  todos: [],
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
  },
  toggleChecked: (state, id) => {
    const index = state.todos.findIndex(item => item.id === id)
    state.todos[index].completed = !state.todos[index].completed
  },
  getTodos: (state, todos) => {
    state.todos = todos
  }
}

const actions = {
  addTodo: ({ commit }, todo) => {
    Axios.post('/api/todos', todo).then(res => commit('addTodo', res.data))
  },
  clearCompleted: ({commit, state}) => {
    const completed = state.todos.filter(todo => todo.completed).map(item => item.id)
    Axios.delete('/api/todos/deleteCompleted', {data: {todos: completed}}).then(res => commit('clearCompleted'))
  },
  updateFilter: ({ commit }, filter) => {
    commit('updateFilter', filter)
  },
  allChecked: ({ commit }, checkedStatus) => {
    Axios.put(`/api/todos/checkAll`, { completed: checkedStatus }).then(res => commit('allChecked', checkedStatus)).catch(err => console.log(err))
  },
  removeTodo: ({ commit }, id) => {
    Axios.delete(`/api/todos/${id}`).then(res => commit('removeTodo', id))
  },
  editTodo: ({ commit }, todo) => {
    Axios.put(`/api/todos/${todo.id}`, todo).then(res => commit('editTodo', res.data))
  },
  getTodos: ({ commit }) => {
    Axios.get('/api/todos').then(res => commit('getTodos', res.data))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
