import {
  convertFrontendJokeTypeToBackendJokeType,
  convertJokesData,
  type FrontendJokeType,
  FrontendJokeTypeEnum,
} from '@/types/Jokes.ts'
import { getJokes } from '@/apicalls/jokes/getJokes.ts'
import { getRandomJokes } from '@/apicalls/jokes/getRandomJokes.ts'

interface ApiData {
  getJokes: (type: FrontendJokeTypeEnum) => Promise<FrontendJokeType[]>
  getRandomJokes: (length?: number) => Promise<FrontendJokeType[]>
}

export const useAppJokesQueries = (): ApiData => {
  const getJokesConverted = async (type: FrontendJokeTypeEnum): Promise<FrontendJokeType[]> => {
    const jokesData = await getJokes(convertFrontendJokeTypeToBackendJokeType(type))
    return convertJokesData(jokesData)
  }

  const getRandomJokesConverted = async (length?: number): Promise<FrontendJokeType[]> => {
    const jokesData = await getRandomJokes(length)
    return convertJokesData(jokesData)
  }
  return {
    getJokes: getJokesConverted,
    getRandomJokes: getRandomJokesConverted,
  }
}
