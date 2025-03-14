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
div {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
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

ul {
  list-style: none;
  padding: 0;
}

li {
  background: white;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

strong {
  color: #007bff;
}

p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>

