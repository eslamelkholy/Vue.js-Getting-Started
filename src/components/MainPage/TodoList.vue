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
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-items-remaining :remaining="remaining"></todo-items-remaining>
    </div>

    <div class="extra-container">
      <todo-filter></todo-filter>
      <clear-completed-todo :showClearCompletedButton="showClearCompletedButton"></clear-completed-todo>
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
  created () {
    this.$eventBus.$on('removeTodo', (index) => this.removeTodo(index))
    this.$eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
    this.$eventBus.$on('allCheckedChanged', (checked) => this.checkAllTodos(checked))
    this.$eventBus.$on('filterChanged', (filter) => this.$store.state.filter = filter)
    this.$eventBus.$on('clearCompleted', () => this.clearCompleted())
  },
  beforeDestroy () {
    this.$eventBus.$off('removeTodo', (index) => this.removeTodo(index))
    this.$eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
    this.$eventBus.$off('allCheckedChanged', (checked) => this.checkAllTodos(checked))
    this.$eventBus.$off('filterChanged', (filter) => this.$store.state.filter = filter)
    this.$eventBus.$off('clearCompleted', () => this.clearCompleted())
  },
  computed: {
    remaining () {
      return this.$store.state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    todosFiltered () {
      if (this.$store.state.filter === 'active') return this.$store.state.todos.filter(todo => !todo.completed)
      if (this.$store.state.filter === 'completed') return this.$store.state.todos.filter(todo => todo.completed)
      return this.$store.state.todos
    },
    showClearCompletedButton () {
      return this.$store.state.todos.filter(todo => todo.completed).length > 0
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
      console.log(this.$store.state.todos)
    },
    removeTodo (index) {
      this.$store.state.todos.splice(index, 1)
    },
    validateEmptyString (str) {
      if (!str) return false
      return true
    },
    checkAllTodos (checked) {
      // eslint-disable-next-line no-return-assign
      this.$store.state.todos.forEach(todo => todo.completed = checked)
    },
    clearCompleted () {
      this.$store.state.todos = this.$store.state.todos.filter(ele => ele.completed === false)
    },
    finishedEdit (data) {
      this.$store.state.todos.splice(data.index, 1, data.todo)
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
