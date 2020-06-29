import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/MainPage/HelloWorld'
import TodoList from '@/components/MainPage/TodoList'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: TodoList
    }
  ]
})
