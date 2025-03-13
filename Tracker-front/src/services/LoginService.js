import axios from 'axios'

const API_URL = 'http://localhost:8080/auth/login'

export async function loginUser(username, password) {
  try {
    const response = await axios.post(API_URL, { username, password })
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
      console.log(response.data.token)
      return { success: true, token: response.data.token }
    }
  } catch (error) {
    console.error('Login failed:', error)
    return { success: false, message: 'Invalid username or password' }
  }
}
