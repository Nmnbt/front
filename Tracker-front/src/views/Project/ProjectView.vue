<template>
  <div>
    <h1>Projects</h1>
    <button @click="fetchProjectsList">Fetch Projects</button>

    <!-- Projects List -->
    <ul v-if="projects.length">
      <li v-for="project in projects" :key="project.projectId">
        <strong>{{ project.projectName }}</strong> - {{ project.description }}
        <p>
          Created: {{ project.createdDate }}, Due: {{ project.dueDate }}, Completed:
          {{ project.completedDate || 'N/A' }}
        </p>
      </li>
    </ul>

    <!-- No Projects Found -->
    <p v-else>No projects found.</p>
  </div>
</template>

<script>
import { fetchPaginatedProjects } from '@/services/ProjectService'

export default {
  data() {
    return {
      projects: [], // Holds the project data
    }
  },
  methods: {
    async fetchProjectsList() {
      try {
        // Fetch paginated projects from the service
        const response = await fetchPaginatedProjects()
        // Set the fetched data to projects list
        this.projects = response.content
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    },
  },
  created() {
    // Fetch projects when the component is created
    this.fetchProjectsList()
  },
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
