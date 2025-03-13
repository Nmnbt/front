import axios from 'axios'

const API_URL = 'http://localhost:8080/emp'

export async function fetchEmployees() {
  try {
    const response = await axios.get(API_URL)
    return response.data // Ensure data is returned
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}

export async function submitEmployee(employee) {
  try {
    const response = await axios.post(API_URL, employee)
    return response.data // Return new employee object
  } catch (error) {
    console.error('Error registering employee:', error)
    return null
  }
}

export async function fetchEmployeeById(employeeId) {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching employee details:', error)
    return null
  }
}

export async function fetchEmployeeTasks(employeeId) {
  try {
    const response = await axios.get(`${API_URL}/${employeeId}/tasks`)
    return response.data
  } catch (error) {
    console.error('Error fetching employee tasks:', error)
    return []
  }
}

export async function createEmployee(employee) {
  try {
    const response = await axios.post(API_URL, employee)
    return response.data
  } catch (error) {
    console.error('Error registering employee:', error)
    return null
  }
}
