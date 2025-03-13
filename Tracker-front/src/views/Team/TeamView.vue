<template>
  <div class="team-view">
    <h1>{{ team.name }}</h1>

    <h2>Team Members</h2>
    <ul v-if="members.length">
      <li v-for="member in members" :key="member.id">
        <router-link :to="'/emp/' + member.empId">{{ member.empName }}</router-link> (Role:
        {{ member.empRole }})
      </li>
    </ul>
    <p v-else>No members found.</p>

    <h2>Projects</h2>
    <ul v-if="projects.length">
      <li v-for="project in projects" :key="project.projectId">
        <router-link :to="'/project/' + project.projectId">{{ project.projectName }}</router-link>
      </li>
    </ul>
    <p v-else>No projects found.</p>
  </div>
</template>

<script>
import { fetchTeamById, fetchTeamMembers, fetchPaginatedTeamProjects } from '@/services/TeamService'

export default {
  data() {
    return {
      team: {},
      members: [],
      projects: [],
    }
  },
  async created() {
    const teamId = this.$route.params.id
    await this.loadTeamData(teamId)
  },
  methods: {
    async loadTeamData(teamId) {
      this.team = (await fetchTeamById(teamId)) || {}
      this.members = await fetchTeamMembers(teamId)
      const projectData = await fetchPaginatedTeamProjects(teamId, this.currentPage, 10)
      this.projects = projectData.content || []
    },
  },
}
</script>

<style scoped>
.team-view {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
