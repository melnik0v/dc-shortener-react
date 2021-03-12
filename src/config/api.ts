import axios from "axios"
import qs from "qs"

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: "brackets" }),
  withCredentials: true
})

export default api