import axios from 'axios'
export const jokesAxiosInstance = axios.create()
export const Jokes_Api_Base_Url = import.meta.env.VITE_JOKES_API_URL

export const Jokes_Api_Urls = {
  jokes: `jokes`,
  types: `types`,
}
