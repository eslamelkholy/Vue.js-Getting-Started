<template>
  <v-app id="inspire" class="pageWrapper">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12 loginContainer">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login" id="check-login-form">
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" form="check-login-form" @click="login">Login <div v-if="loading" class="lds-ring"><div></div><div></div><div></div><div></div></div></v-btn>
              </v-card-actions>
            </v-card>
            <v-alert close-icon='$cancel' v-if="serverError" dense type="error">
      <ul>
        <li>{{ serverError }}</li>
      </ul>
    </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      serverError: '',
      loading: false
    }
  },
  methods: {
    async login () {
      this.loading = true
      try {
        await this.$store.dispatch('loginUser', { email: this.email, password: this.password })
        this.$router.push({ name: 'todo' }).catch(() => {})
      } catch (err) {
        this.serverError = err.response.data
        this.password = ''
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss">
#inspire{
  width: 100%;
}
.loginContainer{
  margin-top: -150px;
}
</style>
