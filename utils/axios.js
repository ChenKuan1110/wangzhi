import axios from "axios"

const instance = axios.create({
  baseURL: 'background_base_url',
  timeout: 5000
})

export default instance
