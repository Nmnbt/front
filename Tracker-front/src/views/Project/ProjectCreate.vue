<template>
  <div>
    <h2>Create New Project</h2>
    <form @submit.prevent="createProject">
      <div>
        <label for="name">Project Name:</label>
        <input type="text" id="name" v-model="newProject.name" required />
      </div>
      <div>
        <label for="detail">Project Detail:</label>
        <input type="text" id="detail" v-model="newProject.detail" required />
      </div>
      <div>
        <label for="dueDate">Due Date:</label>
        <input type="date" id="dueDate" v-model="newProject.dueDate" required />
      </div>
      <div>
        <label for="teamIds">Teams:</label>
        <select v-model="newProject.teamIds" multiple required>
          <option v-for="team in teams" :key="team.id" :value="team.teamId">
            {{ team.teamName }}
          </option>
        </select>
      </div>
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
</script>

<style scoped>
/* Add any custom styling here */
</style>
