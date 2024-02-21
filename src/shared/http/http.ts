import axios from 'axios'

const BASE_URL_API = 'http://begis.24go.uz/client/v1'

export const http = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    Accept: 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${Cookies.get('token')}`
    config.headers['Accept-Language'] = 'ru'

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (config) => {
    return config
  },
  (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        !error.config.url.includes('get-me')
      ) {
        // Cookies.remove('token')
        return Promise.reject(error.response.data)
      }

      return Promise.reject(error.response.data)
    }
    return Promise.reject({
      message: error.message,
      status: error.status,
    })
  }
)
