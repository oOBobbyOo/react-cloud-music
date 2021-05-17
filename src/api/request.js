import axios from 'axios'

export const baseUrl = 'http://localhost:3300'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, '网络错误')
    Promise.reject(err)
  }
)

export default axiosInstance
