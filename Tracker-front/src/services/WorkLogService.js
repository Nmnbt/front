import axios from 'axios'

const API_URL = 'http://localhost:8080'

export async function fetchTasks() {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_URL}/task`, {
      params: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}
export async function fetchWorkLogs(page, size) {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${API_URL}/log`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching work logs:', error)
    throw error
  }
}
