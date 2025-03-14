<template>
  <div>

    <ProjectCreate @project-created="fetchProjects" />

    <ProjectView ref="projectView" />
  </div>
</template>

<script>
import ProjectCreate from './ProjectCreate.vue'
import ProjectView from './ProjectView.vue'

export default {
  components: {
    ProjectCreate,
    ProjectView,
  },
  methods: {
    // Calls the fetchData method from ProjectView to refresh the projects list
    fetchProjects() {
      this.$refs.projectView.fetchData()
    },
  },
}
</script>

<style scoped>
/* Styling for the management page */
</style>
