<template>
  <div class="team-list">
    <h1>Teams</h1>

    <button @click="loadTeams">Fetch Teams</button>

    <ul v-if="teams.length">
      <li v-for="team in teams" :key="team.teamId">
        <router-link :to="`/team/${team.teamId}`">
          <strong>{{ team.teamName }}</strong>
        </router-link>
        <p>Project: {{ team.projectName }} (ID: {{ team.projectId }})</p>
        <p>Members: {{ team.memberCount }}</p>
      </li>
    </ul>
    <p v-else>No teams found.</p>

    <div class="pagination" v-if="totalPages > 1">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">Prev</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { fetchPaginatedTeams } from '@/services/TeamService'

export default {
  data() {
    return {
      teams: [],
      currentPage: 0,
      totalPages: 1,
    }
  },
  methods: {
    async loadTeams() {
      const response = await fetchPaginatedTeams(this.currentPage)
      this.teams = response.content
      this.totalPages = response.totalPages
    },
    async changePage(page) {
      if (page < 0 || page >= this.totalPages) return
      this.currentPage = page
      await this.loadTeams()
    },
  },
  created() {
    this.loadTeams()
  },
}
</script>

<style scoped>
.team-list {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
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
