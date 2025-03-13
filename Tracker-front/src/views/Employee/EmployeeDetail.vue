<template>
  <div>
    <h1>Employee Details</h1>

    <p><strong>Employee ID:</strong> {{ employee.id }}</p>
    <p><strong>Name:</strong> {{ employee.name }}</p>
    <p><strong>Role:</strong> {{ employee.role }}</p>

    <p><strong>Team ID:</strong> {{ employee.teamId }}</p>
    <p>
      <strong>Team Name:</strong>
      <router-link :to="'/team/' + employee.teamId">{{ employee.teamName }}</router-link>
    </p>

    <h2>Tasks</h2>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <router-link :to="'/task/' + task.id">{{ task.name }}</router-link>
        <p><strong>Task:</strong> {{ task.task }}</p>
        <p><strong>Status:</strong> {{ task.status }}</p>
        <p><strong>Project:</strong> {{ task.projectName }}</p>
      </li>
    </ul>
    <p v-else>No tasks assigned.</p>
  </div>
</template>

<script>
import { fetchEmployeeById, fetchEmployeeTasks } from '@/services/EmployeeService'

export default {
  data() {
    return {
      employee: {},
      tasks: [],
    }
  },
  async created() {
    const employeeId = this.$route.params.id
    await this.loadEmployeeDetails(employeeId)
  },
  methods: {
    async loadEmployeeDetails(employeeId) {
      this.employee = (await fetchEmployeeById(employeeId)) || {}
      this.tasks = await fetchEmployeeTasks(employeeId)
    },
  },
}
</script>
