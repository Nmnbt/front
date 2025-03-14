import axios from 'axios'

const API_URL = 'http://localhost:8080'
const token = localStorage.getItem('token')

export async function fetchProjects() {
  try {
    const response = await axios.get(`${API_URL}/project`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.content || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
export async function fetchTasks() {
  try {
    const response = await axios.get(`${API_URL}/task`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

export async function fetchEmployees() {
  try {
    const response = await axios.get(`${API_URL}/emp`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data || []
  } catch (error) {
    console.error('Error fetching employees:', error)
    return []
  }
}

export async function createTask(taskData) {
  try {
    const response = await axios.post(`${API_URL}/task`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating task:', error)
    return null
  }
}

export async function fetchTaskById(taskId){
  try {
    const response = await axios.get(`${API_URL}/task/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching task:', error)
    return null
  }
}
export async function fetchPaginatedTasks(page , size ) {
  try {

const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/project`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error('Error fetching paginated projects:', error)
    return { content: [], totalPages: 0, totalElements: 0 }
  }
}
