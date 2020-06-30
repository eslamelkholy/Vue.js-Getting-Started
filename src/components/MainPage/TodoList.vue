<template>
  <div>
    <input v-model="newTodo" type="text" class="todo-input"
    placeholder="what wants to be done"
     @keyup.enter="addTodo"
    />

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
  </div>
</template>

<script>
/* eslint-disable no-return-assign */
import TodoItem from './TodoItem.vue'
import TodoItemsRemaining from './TodoItemsRemaining.vue'
import TodoCheckAll from './TodoCheckAll.vue'
import TodoFilter from './TodoFilter.vue'
import ClearCompletedTodo from './ClearCompletedTodo.vue'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFilter,
    ClearCompletedTodo
  },
  data () {
    return {
      beforeEditCache: '',
      newTodo: ''
    }
  },
  created () {
    this.$store.dispatch('getTodos')
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
@import url('./TodoStyle.scss');
</style>
