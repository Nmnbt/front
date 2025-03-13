<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account?
      <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import { registerUser } from '@/services/RegisterService'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    async handleRegister() {
      const result = await registerUser(this.username, this.email, this.password)
      alert(result.message)
      if (result.success) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style scoped>
.register-container {
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
