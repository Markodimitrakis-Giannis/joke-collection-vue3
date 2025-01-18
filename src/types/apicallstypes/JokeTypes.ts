export interface BackendJokeType {
  id: number
  type: BackendJokeTypeEnum
  setup: string
  punchline: string
}
export enum BackendJokeTypeEnum {
  GENERAL = 'general',
  PROGRAMMING = 'programming',
  KNOCK_KNOCK = 'knock-knock',
  DAD = 'dad',
}
