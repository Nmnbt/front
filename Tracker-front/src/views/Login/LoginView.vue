<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>
  </div>
</template>

<script>
import { loginUser } from '@/services/LoginService'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async handleLogin() {
      const result = await loginUser(this.username, this.password)
      if (result.success) {
        alert('Login successful!')
        const redirectTo = this.$route.query.redirect || '/'
        this.$router.push(redirectTo)
      } else {
        alert(result.message)
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
  margin-top: 15px;
}

a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
