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
      newTodo: '',
      idForTodo: 3
    }
  },
  computed: {
    remaining () {
      return this.$store.getters.remaining
    },
    anyRemaining () {
      return this.$store.getters.anyRemaining
    },
    todosFiltered () {
      return this.$store.getters.todosFiltered
    },
    showClearCompletedButton () {
      return this.$store.getters.showClearCompletedButton
    }
  },
  methods: {
    addTodo () {
      if (!this.validateEmptyString(this.newTodo)) return
      this.$store.state.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    validateEmptyString (str) {
      if (!str) return false
      return true
    }
  }
}
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.0.0/animate.min.css");

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 20px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Arial, Helvetica, sans-serif;

    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: lightgreen;
  }
  // Css Transition
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
