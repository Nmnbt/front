<template>
  <div>
    <TaskCreate @task-created="fetchTasks" />
    <TaskView ref="taskView" />
  </div>
</template>

<script>
import TaskView from './TaskView.vue'
import TaskCreate from './TaskCreate.vue'

export default {
  components: {
    TaskView,
    TaskCreate,
  },
  methods: {
    fetchTasks() {
      // Refresh tasks when a new task is created
      this.$refs.taskView.fetchData()
    },
  },
}
</script>
