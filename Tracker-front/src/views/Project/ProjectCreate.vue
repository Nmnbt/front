<template>
  <div class = "project-create">
    <h2>Create New Project</h2>
    <form @submit.prevent="createProject">
        <label for="name">Project Name:</label>
        <input type="text" id="name" v-model="newProject.name" required />
        <label for="detail">Project Detail:</label>
        <input type="text" id="detail" v-model="newProject.detail" required />
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="newProject.dueDate" required />
        <label for="teamIds">Teams:</label>
        <select v-model="newProject.teamIds" multiple required>
          <option v-for="team in teams" :key="team.id" :value="team.teamId">
            {{ team.teamName }}
          </option>
        </select>
      <button type="submit">Create Project</button>
    </form>
  </div>
</template>

<script>
import { createProject, fetchTeams } from '@/services/ProjectService'

export default {
  data() {
    return {
      newProject: {
        name: '',
        detail: '',
        dueDate: '',
        teamIds: [], // Array of selected team IDs
        status: 'Not Started',
      },
      teams: [], // This will hold the list of available teams
    }
  },
  async created() {
    try {
      await this.loadTeams() // Load available teams when the component is created
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async loadTeams() {
      try {
        const teamData = await fetchTeams()
        this.teams = teamData.content || []
      } catch (error) {
        console.error('Error loading teams:', error)
      }
    },
    async createProject() {
      try {
        const response = await createProject(this.newProject)
        console.log('Project created successfully:', response)
        this.resetForm()
        this.$emit('project-created')
      } catch (error) {
        console.error('Error creating project:', error)
      }
    },
    resetForm() {
      this.newProject = {
        name: '',
        detail: '',
        dueDate: '',
        teamIds: [],
      }
    },
  },
}
</script><style scoped>
.project-create {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
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
  display: flex;
  align-items: center;
  flex-direction: column;
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
