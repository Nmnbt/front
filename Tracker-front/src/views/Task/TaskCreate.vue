<template>
  <div>
    <h2>Create New Task</h2>
    <form @submit.prevent="createTask">
      <div>
        <label for="projectId">Select Project:</label>
        <select v-model="newTask.projectId" required>
          <option v-for="project in projects" :key="project.projectId" :value="project.projectId">
            {{ project.projectName }}
          </option>
        </select>
      </div>
      <div>
        <label for="employeeId">Select Employee:</label>
        <select v-model="newTask.employeeId" required>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="name">Task Name:</label>
        <input type="text" id="name" v-model="newTask.name" required />
      </div>
      <div>
        <label for="task">Task:</label>
        <input type="text" id="task" v-model="newTask.task" required />
      </div>
      <div>
        <label for="startedDate">Started Date:</label>
        <input type="date" id="startedDate" v-model="newTask.startedDate" required />
      </div>
      <div>
        <label for="completedDate">Completed Date (optional):</label>
        <input type="date" id="completedDate" v-model="newTask.completedDate" />
      </div>
      <div>
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="newTask.dueDate" required />
      </div>
      <div>
        <label for="status">Status:</label>
        <select v-model="newTask.status" required>
          <option value="Not_Started">Not Started</option>
          <option value="In_Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Past_Due">Past Due</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>
      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
import { fetchProjects, fetchEmployees, createTask } from '@/services/TaskService'

export default {
  data() {
    return {
      projects: [],
      employees: [],
      newTask: {
        projectId: '',
        employeeId: '',
        task: '',
        name: '',
        startedDate: '',
        completedDate: '',
        dueDate: '',
        status: 'Not_Started',
      },
    }
  },
  methods: {
    async fetchEmployeesAndProjects() {
      this.projects = await fetchProjects()
      this.employees = await fetchEmployees()
    },
    async createTask() {
      const taskCreated = await createTask(this.newTask)
      if (taskCreated) {
        console.log('Task created successfully:', taskCreated)
        this.resetForm()
        this.$emit('task-created') // Notify parent about task creation
      }
    },
    resetForm() {
      this.newTask = {
        projectId: '',
        employeeId: '',
        task: '',
        name: '',
        startedDate: '',
        completedDate: '',
        dueDate: '',
        status: 'Not_Started',
      }
    },
  },
  mounted() {
    this.fetchEmployeesAndProjects()
  },
}
</script>
<style scoped>
.my-form{
  display: flex;
  flex-direction: column;
}
div {
  font-family: Arial, sans-serif;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

form {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  grid-template-rows: repeat(4, auto); /* Four rows */
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
  grid-column: span 4;
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

/* Ensure each field takes up full width in its cell */
div > label,
div > input,
div > select {
  display: block;
}
</style>

