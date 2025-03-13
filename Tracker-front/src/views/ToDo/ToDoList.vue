<!-- TodoList.vue -->
<template>
  <div class="task-list">
    <div v-for="statusGroup in groupedTasks" :key="statusGroup.status" class="status-column">
      <h3>{{ statusGroup.status }}</h3>
      <draggable :list="statusGroup.tasks" @end="onDragEnd" group="tasks" item-key="id">
        <template #item="{ element: task }">
          <div class="task-card">
            <h4>{{ task.name }}</h4>
            <p>{{ task.projectName }}</p>
            <p>Due: {{ formatDate(task.dueDate) }}</p>
            <work-log-form :task="task" @log-added="refreshTasks" />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import WorkLogForm from './WorkLogForm.vue'

export default {
  components: { draggable, WorkLogForm },
  data() {
    return {
      tasks: [],
    }
  },
  computed: {
    groupedTasks() {
      const groups = {
        TODO: { status: 'Todo', tasks: [] },
        IN_PROGRESS: { status: 'In Progress', tasks: [] },
        COMPLETED: { status: 'Completed', tasks: [] },
      }

      this.tasks.forEach((task) => {
        const group = groups[task.status] || groups['TODO']
        group.tasks.push(task)
      })

      return Object.values(groups)
    },
  },
  methods: {
    async refreshTasks() {
      const response = await this.$axios.get('/api/tasks')
      this.tasks = response.data
    },
    async onDragEnd(evt) {
      const task = this.groupedTasks[evt.from.attributes['data-status'].value].tasks[evt.oldIndex]
      await this.$axios.post(`/api/tasks/${task.id}/status`, {
        status: this.groupedTasks[evt.to.attributes['data-status'].value].status,
      })
    },
  },
  mounted() {
    this.refreshTasks()
  },
}
</script>
