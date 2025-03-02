import axios from 'axios'

const BASE_URL_API = 'https://deliver-shop.uz/api/client/v1'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
const tg = window.Telegram.WebApp

export const http = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    Accept: 'application/json',
    // ['user-id']: tg.initDataUnsafe?.user.id,
    ['user-id']: 985012637,
  },
})

http.interceptors.request.use(
  (config) => {
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
