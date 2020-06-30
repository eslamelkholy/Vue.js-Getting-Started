<template>
  <div id="app">
    <ul class="nav">
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'todo' }">Todo</router-link></li>
      <li><router-link :to="{ name: 'login' }">Login</router-link></li>
      <li><router-link :to="{ name: 'register' }">Register</router-link></li>
      <li><router-link :to="{ name: 'about' }">About</router-link> </li>
    </ul>
    <img src="../../assets/logo.png" class="logo">
      <div class="flex-center">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'App-Master'
}
</script>

<style lang="scss">
@import './MasterStyle.scss'
</style>
