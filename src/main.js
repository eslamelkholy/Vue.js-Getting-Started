/* eslint-disable no-new */
import Vue from 'vue'
import Master from './components/layout/Master'
import router from './router/index'
import routeGuard from './router/routeGuard'
import { store } from './store/index'
import vuetify from './plugins/vuetify'

Vue.prototype.$eventBus = new Vue()
Vue.config.productionTip = false

router.beforeEach(routeGuard)

new Vue({
  el: '#app',
  store,
  router,
  components: { Master },
  vuetify,
  template: '<Master/>'
})
