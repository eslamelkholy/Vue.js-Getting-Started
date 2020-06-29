import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    todos: [
      {
        'id': 1,
        'title': 'Finished Vue Screencase',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Take Overworld',
        'completed': false,
        'editing': false
      }
    ],
    filter: 'all'
  }
})
