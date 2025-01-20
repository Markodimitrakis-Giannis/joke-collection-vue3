import { Jokes_Api_Base_Url, Jokes_Api_Urls, jokesAxiosInstance } from '../../../config.ts'
import { type BackendJokeType } from '@/types/apicallstypes/JokeTypes.ts'
import { type AxiosRequestConfig } from 'axios'

const API = `${Jokes_Api_Base_Url}`

export const getRandomJokes = async (length: number = 10): Promise<BackendJokeType[]> => {
  const config: AxiosRequestConfig = {
    url: `${API}/${Jokes_Api_Urls.jokes}/random/${length}`,
    method: 'GET',
  }

  const response = await jokesAxiosInstance(config)

  return response.data satisfies BackendJokeType[]
}
