<template>
  <div>
    <TeamCreate @team-created="refreshTeams" />
    <TeamList ref="teamList" />
  </div>
</template>

<script>
import TeamCreate from './TeamCreate.vue'
import TeamList from './TeamList.vue'

export default {
  components: {
    TeamCreate,
    TeamList,
  },
  methods: {
    refreshTeams() {
      this.$refs.teamList.loadTeams()
    },
  },
}
</script>
