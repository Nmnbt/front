<template>
  <div>
    <h1>Tasks</h1>
    <button @click="fetchData">Fetch Tasks</button>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id">
        <strong>{{ task.name }}</strong> (Task: {{ task.task }})
        <p>Status: {{ task.status }}, Due: {{ task.dueDate }}</p>
      </li>
    </ul>
    <p v-else>No tasks found.</p>
  </div>
</template>

<script>
import { fetchTasks } from '@/services/TaskService'

export default {
  data() {
    return {
      tasks: [],
    }
  },
  methods: {
    async fetchData() {
      this.tasks = await fetchTasks()
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
