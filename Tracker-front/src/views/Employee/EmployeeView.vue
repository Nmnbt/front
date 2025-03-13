<template>
  <div>
    <h1>Employee List</h1>
    <button @click="fetchData">Fetch Data</button>
    <ul v-if="employees.length">
      <li v-for="employee in employees" :key="employee.id">
        <strong>{{ employee.name }}</strong> (ID: {{ employee.id }}) - Status:
        {{ employee.status }} - Team ID: {{ employee.teamId }}
      </li>
    </ul>
    <p v-else>No employees found.</p>
  </div>
</template>

<script>
import { fetchEmployees } from '@/services/EmployeeService'

export default {
  data() {
    return {
      employees: [],
    }
  },
  methods: {
    async fetchData() {
      console.log('Fetching data...')
      this.employees = await fetchEmployees()
    },
  },
}
</script>
