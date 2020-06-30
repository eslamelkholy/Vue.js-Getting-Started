import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/Todo/TodoList'
import Home from '@/components/HomePage/Home'
import About from '@/components/HomePage/About'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/todo',
      component: TodoList,
      name: 'todo'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/register',
      component: Register,
      name: 'register'
    },
    {
      path: '/about/:id',
      component: About,
      name: 'about'
    }
  ]
})
