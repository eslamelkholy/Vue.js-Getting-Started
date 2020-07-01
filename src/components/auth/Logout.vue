<template>
  <span></span>
</template>
<script>
export default {
  created () {
    this.$store.dispatch('logoutUser')
  }
}
</script>
