import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para respuestas
apiClient.interceptors.response.use(
  (response) => response.data, // Retornar solo la data
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request cancelado:', error.message)
      return Promise.reject({ cancelled: true })
    }
    return Promise.reject(error)
  }
)

export default apiClient
