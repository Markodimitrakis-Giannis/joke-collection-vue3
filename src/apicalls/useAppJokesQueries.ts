import {
  convertFrontendJokeTypeToBackendJokeType,
  convertJokesData,
  type FrontendJokeType,
  FrontendJokeTypeEnum,
} from '@/types/Jokes.ts'
import { getJokes } from '@/apicalls/jokes/getJokes.ts'

interface ApiData {
  getJokes: (type: FrontendJokeTypeEnum) => Promise<FrontendJokeType[]>
}

export const useAppJokesQueries = (): ApiData => {
  const getJokesConverted = async (type: FrontendJokeTypeEnum): Promise<FrontendJokeType[]> => {
    const jokesData = await getJokes(convertFrontendJokeTypeToBackendJokeType(type))
    return convertJokesData(jokesData)
  }

  return {
    getJokes: getJokesConverted,
  }
}
