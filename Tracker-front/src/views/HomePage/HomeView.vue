<template>
  <div>
    <h1>Welcome Home</h1>
    <button @click="fetchData">Fetch Data</button>
    <ul v-if="data.length">
      <li v-for="(item, index) in data" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('')
        this.data = response.data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
}
</script>
