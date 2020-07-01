import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '@/components/Todo/TodoList'
import Home from '@/components/HomePage/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Logout from '@/components/auth/Logout'
// import About from '@/components/HomePage/About'

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
      name: 'todo',
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: '/login',
      component: Login,
      name: 'login',
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/register',
      component: Register,
      name: 'register',
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      component: Logout,
      name: 'logout'
    }
  ]
})
