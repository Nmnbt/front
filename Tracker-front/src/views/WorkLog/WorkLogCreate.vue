<template>
  <div>
    <h1>Create Work Log</h1>
    <form @submit.prevent="submitWorkLog" class="my-form">
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
<style scoped>
.my-form {
  display: flex;
  flex-direction: column;
}
div {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
}

h2 {
  text-align: center;
  color: #333;
}

form {
  display: grid;
  gap: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #555;
}

input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

/* Full-width button */
button {
  grid-column: span 2;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #0056b3;
}
textarea {
  width: 100%;
}

/* Ensure each field takes up full width in its cell */
div > label,
div > input,
div > select {
  display: block;
}
</style>
