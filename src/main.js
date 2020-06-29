import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
