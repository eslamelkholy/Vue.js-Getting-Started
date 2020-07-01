<script>
export default {
  created () {
    this.$store.dispatch('logoutUser')
  }
}
</script>
