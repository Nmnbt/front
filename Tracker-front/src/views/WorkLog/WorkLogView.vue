<template>
  <div>
    <h2>Existing Work Logs</h2>
    <ul v-if="taskLogs.length">
      <li v-for="log in taskLogs" :key="log.logId">
        <strong>{{ log.taskName }}</strong> (Log ID: {{ log.logId }})
        <p>Status: {{ log.logStatus }}, Hours: {{ log.logHours }}, Employee: {{ log.employeeName }}</p>
        <p>Created By: {{ log.createdBy || "N/A" }}</p>
        <p v-if="log.createdDate">Created Date: {{ formatDate(log.createdDate) }}</p>
        <p v-if="log.lastModifiedDate">Last Modified Date: {{ formatDate(log.lastModifiedDate) }}</p>
      </li>
    </ul>
    <p v-else>No work logs found.</p>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script>
import { fetchWorkLogs } from '@/services/WorkLogService'

export default {
  data() {
    return {
      taskLogs: [],       // Rename tasks to taskLogs to match the template
      currentPage: 0,
      totalPages: 0,
      pageSize: 2,
    }
  },
  methods: {
    // Fetch task logs
    async fetchData() {
      try {
        const response = await fetchWorkLogs(this.currentPage, this.pageSize)
        console.log("API Response:", response);

        // Ensure taskLogs is correctly populated
        this.taskLogs = response.content || [];
        this.totalPages = response.totalPages || 0;
      } catch (error) {
        console.error("Error fetching task logs:", error);
      }
    },
    // Format the date from [YYYY, MM, DD] to a readable format
    formatDate(dateArray) {
      if (!dateArray || dateArray.length < 3) return "N/A";
      const [year, month, day] = dateArray;
      return new Date(year, month - 1, day).toLocaleDateString();
    },
    // Move to the next page
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.fetchData();
      }
    },
    // Move to the previous page
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();  // Fetch data when the component is created
  },
}
</script>

<style scoped>
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
