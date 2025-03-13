<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/NavBar/NavBar.vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style>
/* Add your global styles here */
</style>
