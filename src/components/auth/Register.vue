<template>
  <v-app id="inspire" class="pageWrapper">
    <v-main>
      <v-container
        class="fill-height mainWrapper"
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
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="register" v-model="valid" ref="form" :lazy-validation="lazy" id="check-login-form">
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                    :rules="nameRules"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"

                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="primary" form="check-login-form" @click.prevent="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          <v-alert close-icon='$cancel' v-if="serverErrors.length !== 0" dense type="error">
      <ul>
        <li v-for="(value, key) in serverErrors" :key="key">{{ value[0] }}</li>
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
      username: '',
      name: '',
      password: '',
      serverErrors: [],
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      dataSucessMsg: 'Congratulations! Registered Successfully..',
      lazy: false
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    async register () {
      this.$refs.form.validate()
      if (!this.valid) return
      try {
        await this.$store.dispatch('registerUser', { email: this.email, password: this.password, username: this.username, name: this.name })
        this.$router.push({ name: 'todo', params: { dataSucessMsg: this.dataSucessMsg } }).catch(() => {})
      } catch (err) {
        this.serverErrors = Object.values(err.response.data.errors)
      }
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
