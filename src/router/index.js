import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/Todo/TodoList'
import Home from '@/components/HomePage/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/todo',
      component: TodoList
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    }
  ]
})
