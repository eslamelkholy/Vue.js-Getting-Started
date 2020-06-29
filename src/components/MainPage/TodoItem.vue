<template>
    <div class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox"
        v-model="completed"
        @change="doneEdit"
        @click="toggleChecked(id)"
        />
        <div
        v-if="!editing"
        class="todo-item-label"
        :class="{ completed: completed}"
        @dblclick="editTodo"
        >{{ title }}</div>
        <input class="todo-item-edit" type="text"
        v-else
        v-model="title"
        @blur="doneEdit"
        @keyup.enter="doneEdit" v-focus
        @keyup.esc="cancelEdit"
        />

      </div>
      <div>
        <button @click="pluralize">Plural</button>
        <span @click="removeTodo(id)" class="remove-item">
          &times;
        </span>
      </div>
    </div>
</template>

<script>

export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      ...this.todo
    }
  },
  watch: {
    checkAll () {
      this.completed = this.todo.completed
    }
  },
  created () {
    this.$eventBus.$on('pluralize', this.handlePluralize)
  },
  beforeDestroy () {
    this.$eventBus.$off('pluralize', this.handlePluralize)
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    toggleChecked (id) {
      const index = this.$store.state.todos.findIndex(item => item.id === id)
      this.$store.state.todos[index].completed = !this.completed
    },
    removeTodo (id) {
      this.$store.dispatch('removeTodo', id)
    },
    editTodo () {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim() === '') return
      this.editing = false
      this.$store.dispatch('editTodo', {...this.todo})
    },
    cancelEdit () {
      this.title = this.beforeEditCache
      this.editing = false
    },
    pluralize () {
      this.$eventBus.$emit('pluralize')
    },
    handlePluralize () {
      this.title = this.title + 's'
      const index = this.$store.state.todos.findIndex(item => item.id === this.id)
      this.$store.state.todos.splice(index, 1, this.todo)
    }
  }
}
</script>
