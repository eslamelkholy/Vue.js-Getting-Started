<template>
  <div class="container">
    <v-text-field
            v-model="newTodo" type="text" class="todo-input"
    placeholder="what wants to be done"
     @keyup.enter="addTodo"
     ></v-text-field>

    <transition-group name="fade" enter-active-class="animated fadeInUp"
    leave-active-class="animated fadeOutDown">

    <todo-item
    v-for="(todo, index) in todosFiltered" :key="todo.id"
    :todo="todo" :index="index"
    :checkAll="!anyRemaining"
    >
    </todo-item>

    </transition-group>

    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filter></todo-filter>
      <clear-completed-todo></clear-completed-todo>
    </div>
    <!-- SnackBar -->
    <div v-if="dataSucessMsg">
      <snack-bar :snackbar="snackbar" :dataSucessMsg="dataSucessMsg"></snack-bar>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import TodoItem from './TodoItem.vue'
import TodoItemsRemaining from './TodoItemsRemaining.vue'
import TodoCheckAll from './TodoCheckAll.vue'
import TodoFilter from './TodoFilter.vue'
import ClearCompletedTodo from './ClearCompletedTodo.vue'
import SnackBar from '../../utils/SnackBar.vue'

export default {
  name: 'todo-list',
  props: {
    dataSucessMsg: {
      type: String
    }
  },
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    ClearCompletedTodo,
    SnackBar
  },
  data () {
    return {
      beforeEditCache: '',
      newTodo: ''
    }
  },
  created () {
    this.$store.dispatch('getTodos')
    if (this.dataSucessMsg) this.snackbar = true
  },
  computed: {
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    addTodo () {
      if (!this.validateEmptyString(this.newTodo)) return
      this.$store.dispatch('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    validateEmptyString (str) {
      return str
    }
  }
}
</script>

<style lang="scss">
@import './TodoStyle.scss'
</style>
