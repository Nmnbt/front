import axios from 'axios'

const PROJECT_API_URL = 'http://localhost:8080/project'
const TEAM_API_URL = 'http://localhost:8080/team'

export async function createProject(projectData) {
  try {

const token = localStorage.getItem('token')
    const response = await axios.post(`${PROJECT_API_URL}`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error creating project:', error)
    throw new Error('Failed to create project')
  }
}

export async function fetchTeams() {
  try {

const token = localStorage.getItem('token')
    const response = await axios.get(`${TEAM_API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw new Error('Failed to fetch teams')
  }
}

export async function fetchPaginatedProjects(page , size ) {
  try {

const token = localStorage.getItem('token')
    const response = await axios.get(`${PROJECT_API_URL}`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching paginated projects:', error)
    return { content: [], totalPages: 0, totalElements: 0 }
  }
}
