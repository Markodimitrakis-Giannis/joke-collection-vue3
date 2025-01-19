import { type BackendJokeType, BackendJokeTypeEnum } from '@/types/apicallstypes/JokeTypes.ts'
export interface FrontendJokeType {
  id: number
  type: FrontendJokeTypeEnum
  setup: string
  punchline: string
  isFavourite?: boolean
}

export enum FrontendJokeTypeEnum {
  GENERAL = 'general',
  PROGRAMMING = 'programming',
  KNOCK_KNOCK = 'knock-knock',
  DAD = 'dad',
}
const frontendJokeTypeToBackendJokeType = new Map<FrontendJokeTypeEnum, BackendJokeTypeEnum>([
  [FrontendJokeTypeEnum.GENERAL, BackendJokeTypeEnum.GENERAL],
  [FrontendJokeTypeEnum.PROGRAMMING, BackendJokeTypeEnum.PROGRAMMING],
  [FrontendJokeTypeEnum.KNOCK_KNOCK, BackendJokeTypeEnum.KNOCK_KNOCK],
  [FrontendJokeTypeEnum.DAD, BackendJokeTypeEnum.DAD],
])

const backendJokeTypeToFrontendJokeType = new Map<BackendJokeTypeEnum, FrontendJokeTypeEnum>([
  [BackendJokeTypeEnum.GENERAL, FrontendJokeTypeEnum.GENERAL],
  [BackendJokeTypeEnum.PROGRAMMING, FrontendJokeTypeEnum.PROGRAMMING],
  [BackendJokeTypeEnum.KNOCK_KNOCK, FrontendJokeTypeEnum.KNOCK_KNOCK],
  [BackendJokeTypeEnum.DAD, FrontendJokeTypeEnum.DAD],
])

export const convertFrontendJokeTypeToBackendJokeType = (
  frontendJokeType: FrontendJokeTypeEnum,
): BackendJokeTypeEnum => {
  return frontendJokeTypeToBackendJokeType.get(frontendJokeType)!
}

export const convertBackendJokeTypeToFrontendJokeType = (
  backendJokeType: BackendJokeTypeEnum,
): FrontendJokeTypeEnum => {
  return backendJokeTypeToFrontendJokeType.get(backendJokeType)!
}

export const convertSingleJokeData = (jokeData: BackendJokeType): FrontendJokeType => {
  return {
    id: jokeData.id,
    type: convertBackendJokeTypeToFrontendJokeType(jokeData.type),
    setup: jokeData.setup,
    punchline: jokeData.punchline,
    isFavourite: false,
  }
}

export const convertJokesData = (jokesData: BackendJokeType[]): FrontendJokeType[] => {
  return jokesData.map((jokeData) => convertSingleJokeData(jokeData))
}
