<template>
  <div class="contact-form">
    <h1>Employee Form</h1>

    <form @submit.prevent="submitForm">
      <div>
        <label for="id">ID:</label>
        <input
          type="number"
          id="id"
          v-model="employee.id"
          required
        />
      </div>

      <div>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          v-model="employee.name"
          required
        />
      </div>

      <div>
        <label for="teamId">Team ID:</label>
        <input
          type="number"
          id="teamId"
          v-model="employee.teamId"
        />
      </div>

      <div>
        <label for="role">Role:</label>
        <input
          type="text"
          id="role"
          v-model="employee.role"
          required
        />
      </div>

      <div>
        <label for="status">Status:</label>
        <input
          type="text"
          id="status"
          v-model="employee.status"
        />
      </div>

      <div>
        <button type="submit" :disabled="!employee.id || !employee.name || !employee.role">Submit</button>
      </div>
    </form>

    <p v-if="employee.id || employee.name || employee.role">
      <strong>Preview:</strong> {{ employee.name }} (Role: {{ employee.role }}) - Status: {{ employee.status }}
    </p>
  </div>
</template>

<script>
import { submitEmployee } from '@/services/EmployeeService'

export default {
  data() {
    return {
      employee: {
        id: '',
        name: '',
        teamId: '',
        role: '',
        status: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const newEmployee = await submitEmployee(this.employee)
        if (newEmployee) {
          console.log('Employee Registered:', newEmployee)
          this.resetForm()
        } else {
          console.error('Failed to register employee.')
        }
      } catch (error) {
        console.error('Error submitting employee form:', error)
      }
    },
    resetForm() {
      this.employee = {
        id: '',
        name: '',
        teamId: '',
        role: '',
        status: '',
      };
    },
  },
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

div {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
  font-size: 14px;
  color: #555;
}
</style>
