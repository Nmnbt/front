<template>
  <div>
    <h1>Task Details</h1>
    <div v-if="task">
      <h2>{{ task.taskName }}</h2>
      <p><strong>Description:</strong> {{ task.taskDescription }}</p>
      <p><strong>Status:</strong> {{ task.taskStatus }}</p>
      <p><strong>Due Date:</strong> {{ formattedDate(task.dueDate) }}</p>
      <p><strong>Assigned To:</strong> {{ task.employeeName }}</p>
      <p><strong>Created By:</strong> {{ task.createdBy }} on {{ formattedDate(task.taskCreatedDate) }}</p>
      <p v-if="task.completedDate"><strong>Completed Date:</strong> {{ formattedDate(task.completedDate) }}</p>
      <p v-if="task.lastModifiedBy"><strong>Last Modified By:</strong> {{ task.lastModifiedBy }} on {{ formattedDate(task.lastModifiedDate) }}</p>
    </div>
    <p v-else>Loading task...</p>
  </div>
</template>

<script>
import { fetchTaskById } from '@/services/TaskService';

export default {
  data() {
    return {
      task: null,
    };
  },
  async created() {
    const taskId = this.$route.params.id;
    if (taskId) {
      this.task = await fetchTaskById(taskId);
    }
  },
  methods: {
    formattedDate(dateArray) {
      if (!dateArray) return "N/A";
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toLocaleDateString();
    }
  }
};
</script>
