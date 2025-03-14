<template>
  <div class="team-create">
    <h1>Create Team</h1>
    <form @submit.prevent="handleCreateTeam" class = "my-form">
      <div>
        <label for="name">Team Name:</label>
        <input type="text" v-model="newTeam.name" id="name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="newTeam.description" id="description" required />
      </div>
      <div>
        <label for="leaderId">Leader Name:</label>
        <select v-model="newTeam.leaderId" required>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
      </div>
      <button type="submit">Create Team</button>
    </form>
  </div>
</template>
<style scoped>
.my-form {
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
  grid-column: span 3;
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
<script>
import { createTeam } from '@/services/TeamService'
import { fetchEmployees } from '@/services/TaskService'

export default {
  data() {
    return {
      employees: [],
      newTeam: {
        name: '',
        description: '',
        leaderId: null,
      },
    }
  },
  methods: {
    async fetchEmployee(){
      this.employees = await fetchEmployees()
    },
    async handleCreateTeam() {

      try {
        const result = await createTeam({
          name: this.newTeam.name,
          description: this.newTeam.description,
          leaderId: this.newTeam.leaderId,
        })
        alert(result.message)
        if (result.success) {
          this.newTeam = { name: '', description: '', leaderId: null }
          this.$emit('team-created')
        }
      } catch (error) {
        alert('Failed to create team: ' + error.message)
      }
    },
  },
  mounted() {
    this.fetchEmployee()
  },
}
</script>

<style scoped>
.team-create {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}
</style>
