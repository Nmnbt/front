import axios from 'axios'

const API_URL = 'http://localhost:8080/team'
const token = localStorage.getItem('token')

export async function createTeam(teamData) {
  try {
    await axios.post(`${API_URL}`, teamData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { success: true, message: 'Team created successfully!' }
  } catch (error) {
    console.error('Error creating team:', error)
    return { success: false, message: error.response?.data?.message || 'Failed to create team' }
  }
}

export async function fetchPaginatedTeams(page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching paginated team data:', error)
    return { content: [], totalPages: 0, totalElements: 0 }
  }
}

export async function fetchTeamById(teamId) {
  try {
    const response = await axios.get(`${API_URL}/${teamId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching team details:', error)
    return null
  }
}

export async function fetchTeamMembers(teamId) {
  try {
    const response = await axios.get(`${API_URL}/${teamId}/members`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export async function fetchPaginatedTeamProjects(teamId, page = 0, size = 10) {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/${teamId}/projects`, {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching paginated team projects:', error)
    return { content: [], totalPages: 0, totalElements: 0 }
  }
}
