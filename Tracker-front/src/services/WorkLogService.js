import axios from 'axios'

const API_URL = 'http://localhost:8080'

export async function fetchTasks() {
  try {
    const response = await axios.get(`${API_URL}/task`)
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export async function fetchWorkLogs() {
  try {
    const response = await axios.get(`${API_URL}/log`)
    return response.data
  } catch (error) {
    console.error('Error fetching work logs:', error)
    throw error
  }
}
