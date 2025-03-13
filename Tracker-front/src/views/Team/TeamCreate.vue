<template>
  <div class="team-create">
    <h1>Create Team</h1>
    <form @submit.prevent="handleCreateTeam">
      <div>
        <label for="name">Team Name:</label>
        <input type="text" v-model="newTeam.name" id="name" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="newTeam.description" id="description" required />
      </div>
      <div>
        <label for="leaderId">Leader ID:</label>
        <input type="number" v-model="newTeam.leaderId" id="leaderId" required />
      </div>
      <button type="submit">Create Team</button>
    </form>
  </div>
</template>

<script>
import { createTeam } from '@/services/TeamService'

export default {
  data() {
    return {
      newTeam: {
        name: '',
        description: '',
        leaderId: null,
      },
    }
  },
  methods: {
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
