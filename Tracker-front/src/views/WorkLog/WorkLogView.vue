<template>
  <div>
    <h2>Existing Work Logs</h2>
    <ul v-if="workLogs.length">
      <li v-for="workLog in workLogs" :key="workLog.id">
        <strong>Task ID: {{ workLog.taskId }}</strong>
        <p>Log Date: {{ workLog.logDate }}, Hours Worked: {{ workLog.hoursWorked }}</p>
        <p>Description: {{ workLog.description }}</p>
      </li>
    </ul>
    <p v-else>No work logs found.</p>
  </div>
</template>

<script>
export default {
  props: {
    workLogs: {
      type: Array,
      required: true,
    },
  },
}
</script>
