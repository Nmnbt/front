<!-- WorkLogForm.vue -->
<template>
  <div class="work-log-form">
    <input v-model.number="hours" type="number" step="0.5" placeholder="Hours" />
    <textarea v-model="description" placeholder="Work description"></textarea>
    <button @click="submitLog">Log Work</button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      hours: null,
      description: '',
    }
  },
  methods: {
    async submitLog() {
      await this.$axios.post('/api/work-logs', {
        taskId: this.task.id,
        hoursWorked: this.hours,
        description: this.description,
        logDate: new Date().toISOString(),
      })
      this.$emit('log-added')
    },
  },
}
</script>
