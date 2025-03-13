

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
          <li class="nav-item"><router-link to="/emp" class="nav-link">Employee</router-link></li>
          <li class="nav-item"><router-link to="/log" class="nav-link">Worklog</router-link></li>
          <li class="nav-item"><router-link to="/team" class="nav-link">Teams</router-link></li>
          <li class="nav-item"><router-link to="/task" class="nav-link">Tasks</router-link></li>
          <li class="nav-item"><router-link to="/project" class="nav-link">Projects</router-link></li>

          <li v-if="isLoggedIn" class="nav-item">
            <button @click="logOut" class="btn btn-outline-success">Log Out</button>
          </li>

          <li v-else class="nav-item">
            <router-link to="/login" class="btn btn-outline-success">Log In</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'NavBar',
  data() {
    return {
      isLoggedIn: false,
    }
  },
  created() {
    this.isLoggedIn = false
  },
  methods: {
    async logOut() {
      try {
        const token = localStorage.getItem('token')
        const API_URL = "http://localhost:8080"

        if (token) {
          const response = await axios.get(`${API_URL}/auth/logout`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.status === 200) {
            console.log('Successfully logged out')
            localStorage.removeItem('token')
            this.isLoggedIn = false
            this.$router.push('/login')
          }
        } else {
          console.log('No token found, user might already be logged out.')
        }
      } catch (error) {
        console.error('Log out failed:', error)
      }
    },
  },
  watch: {
    $route: {
      handler() {
        this.isLoggedIn = false
      },
      immediate: false,
    },
  },
}
</script>
