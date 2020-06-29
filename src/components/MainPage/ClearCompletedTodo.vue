<template>
  <div>
    <transition name="fade">
      <button
      v-if="showClearCompletedButton"
      @click="clearCompleted"
      >
      Clear Completed
      </button>
      </transition>
  </div>
</template>

<script>
export default {
  name: 'clear-completed-todo',
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted () {
      this.$eventBus.$emit('clearCompleted')
    }
  }
}
</script>
