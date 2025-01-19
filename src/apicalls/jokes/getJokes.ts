import { Jokes_Api_Base_Url, Jokes_Api_Urls, jokesAxiosInstance } from '../../../config.ts'
import { type BackendJokeType, BackendJokeTypeEnum } from '@/types/apicallstypes/JokeTypes.ts'
import { type AxiosRequestConfig } from 'axios'

const API = `${Jokes_Api_Base_Url}`

export const getJokes = async (type: BackendJokeTypeEnum): Promise<BackendJokeType[]> => {
  const config: AxiosRequestConfig = {
    url: `${API}/${Jokes_Api_Urls.jokes}/${type}/ten`,
    method: 'GET',
  }

  const response = await jokesAxiosInstance(config)

  return response.data satisfies BackendJokeType[]
}
