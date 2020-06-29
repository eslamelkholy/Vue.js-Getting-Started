<template>
    <div class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox"
        v-model="completed"
        @change="doneEdit"
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
      <div @click="removeTodo(index)" class="remove-item">
        &times;
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
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeTodo (index) {
      this.$emit('removeTodo', index)
    },
    editTodo () {
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit () {
      if (this.title.trim() === '') return
      this.editing = false
      this.$emit('finishedEdit', {
        index: this.index,
        'todo': {
          id: this.id,
          title: this.title,
          completed: this.completed,
          editing: this.editing
        }
      })
    },
    cancelEdit () {
      this.title = this.beforeEditCache
      this.editing = false
    }
  }
}
</script>
