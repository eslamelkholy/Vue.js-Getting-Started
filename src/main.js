import Vue from 'vue'
// import App from './App'
import Master from './components/layout/Master'
import router from './router'
import { store } from './store/index'
import vuetify from './plugins/vuetify'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { Master },
  vuetify,
  template: '<Master/>'
})
