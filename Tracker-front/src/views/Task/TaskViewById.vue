<template>
  <div>
    <h1>Task Details</h1>

    <div v-if="tasks.length">
      <div v-for="task in tasks" :key="task.id" class="task-card">
        <h2>{{ task.taskName }}</h2>
        <p><strong>Description:</strong> {{ task.taskDescription }}</p>
        <p><strong>Status:</strong> {{ task.taskStatus }}</p>
        <p><strong>Due Date:</strong> {{ formattedDate(task.dueDate) }}</p>
        <p><strong>Assigned To:</strong> {{ task.employeeName }}</p>
        <p><strong>Created By:</strong> {{ task.createdBy }} on {{ formattedDate(task.taskCreatedDate) }}</p>
        <p v-if="task.completedDate"><strong>Completed Date:</strong> {{ formattedDate(task.completedDate) }}</p>
        <p v-if="task.lastModifiedBy"><strong>Last Modified By:</strong> {{ task.lastModifiedBy }} on {{ formattedDate(task.lastModifiedDate) }}</p>
      </div>
    </div>

    <p v-else>Loading tasks...</p>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script>
import { fetchPaginatedProjects } from '@/services/TaskService';

export default {
  data() {
    return {
      tasks: [],
      currentPage: 0,
      totalPages: 0,
      pageSize: 5,
    };
  },
  async created() {
    await this.loadTasks();
  },
  methods: {
    async loadTasks() {
      const response = await fetchPaginatedProjects(this.currentPage, this.pageSize);
      this.tasks = response || [];
      this.totalPages = response.totalPages || 0;
    },
    formattedDate(dateArray) {
      if (!dateArray) return "N/A";
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).toLocaleDateString();
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.loadTasks();
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.loadTasks();
      }
    }
  }
};
</script>

<style scoped>
.task-card {
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>

