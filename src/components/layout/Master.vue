<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'todo' }">Todo</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li v-if="!loggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
      <li v-if="loggedIn"><router-link :to="{ name: 'logout' }">Logout</router-link></li>
    </ul>
      <div class="flex-center">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App-Master',
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style lang="scss">
@import './MasterStyle.scss'
</style>
