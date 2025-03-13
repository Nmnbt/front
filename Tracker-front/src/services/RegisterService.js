import axios from 'axios'

const API_URL = 'http://localhost:8080/auth/signup'

export async function registerUser(username, email, password) {
  try {
    await axios.post(API_URL, { username, email, password })
    return { success: true, message: 'Registration successful!' }
  } catch (error) {
    console.error('Registration failed:', error)
    return { success: false, message: error.response?.data?.message || 'Registration failed!' }
  }
}
