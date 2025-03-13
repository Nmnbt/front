<template>
  <div>
    <h1>Create Work Log</h1>
    <form @submit.prevent="submitWorkLog">
      <div>
        <label for="taskId">Select Task</label>
        <select v-model="workLog.taskId" id="taskId" required>
          <option v-for="task in tasks" :key="task.id" :value="task.id">{{ task.name }}</option>
        </select>
      </div>

      <div>
        <label for="logDate">Log Date</label>
        <input type="date" v-model="workLog.logDate" id="logDate" required />
      </div>

      <div>
        <label for="hoursWorked">Hours Worked</label>
        <input type="number" v-model="workLog.hoursWorked" id="hoursWorked" required />
      </div>

      <div>
        <label for="description">Description</label>
        <textarea v-model="workLog.description" id="description" required></textarea>
      </div>

      <button type="submit">Create Work Log</button>
    </form>
  </div>
</template>

<script>
import { fetchWorkLogs } from '@/services/WorkLogService'

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      workLog: {
        taskId: null,
        logDate: '',
        hoursWorked: '',
        description: '',
      },
    }
  },
  methods: {
    async fetchWorkLogs() {
      try {
        const newLog = await fetchWorkLogs(this.workLog)
        this.$emit('log-created', newLog)
        this.resetForm()
      } catch (error) {
        console.error('Error creating work log:', error)
      }
    },
    resetForm() {
      this.workLog = {
        taskId: null,
        logDate: '',
        hoursWorked: '',
        description: '',
      }
    },
  },
}
</script>
