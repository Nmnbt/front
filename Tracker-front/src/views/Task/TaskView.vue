<template>
  <div>
    <h1>Tasks</h1>
    <button @click="fetchData">Fetch Tasks</button>

    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.task">
        <strong>{{ task.name }}</strong> (Task: {{ task.task }})
        <p>Status: {{ task.status }}, Due: {{ formatDate(task.dueDate) }}</p>
      </li>
    </ul>
    <p v-else>No tasks found.</p>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
    </div>
  </div>
</template>

<script>
import { fetchPaginatedTasks } from '@/services/TaskService'

export default {
  data() {
    return {
      tasks: [],
      currentPage: 0,
      totalPages: 0,
      pageSize: 2,  }
  },
  methods: {
  // Function to fetch paginated tasks
  async fetchData() {
    try {
      const response = await fetchPaginatedTasks(this.currentPage, this.pageSize)
      console.log("API Response:", response);  // Log the full response to see its structure

      // Access tasks data correctly based on response structure
      this.tasks = response.data.content || []  // Assuming 'data' contains 'content'
      this.totalPages = response.data.totalPages || 0  // Access the total pages for pagination

      console.log("Tasks:", this.tasks);  // Log the tasks array to ensure it's populated
      console.log("Total Pages:", this.totalPages);  // Log the total pages for pagination
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  },
  // Format the date from [YYYY, MM, DD] to a readable format
  formatDate(dateArray) {
    if (!dateArray || dateArray.length < 3) return "N/A"
    const [year, month, day] = dateArray
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString()
    return formattedDate
  },
  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++
      this.fetchData()
    }
  },
  // Move to the previous page
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--
      this.fetchData()
    }
  }
},

  created() {
    this.fetchData()
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
