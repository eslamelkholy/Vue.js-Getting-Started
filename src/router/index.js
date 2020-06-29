import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/MainPage/TodoList'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoApp',
      component: TodoList
    }
  ]
})
