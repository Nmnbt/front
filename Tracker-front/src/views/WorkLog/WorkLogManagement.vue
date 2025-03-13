<template>
  <div>
    <WorkLogCreate :tasks="tasks" @log-created="addWorkLog" />
    <WorkLogView :workLogs="workLogs" />
  </div>
</template>

<script>
import WorkLogCreate from './WorkLogCreate.vue'
import WorkLogView from './WorkLogView.vue'
import { fetchTasks, fetchWorkLogs } from '@/services/WorkLogService'

export default {
  components: {
    WorkLogCreate,
    WorkLogView,
  },
  data() {
    return {
      tasks: [],
      workLogs: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        this.tasks = await fetchTasks()
        this.workLogs = await fetchWorkLogs()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    addWorkLog(newWorkLog) {
      this.workLogs.push(newWorkLog)
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
