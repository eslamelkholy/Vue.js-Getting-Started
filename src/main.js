import Vue from 'vue'
import App from './App'
import router from './router'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
