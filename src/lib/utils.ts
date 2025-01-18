import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { FrontendJokeType } from '@/types/Jokes.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getJokesFromLocalStorage = (): FrontendJokeType[] => {
  const jokes = localStorage.getItem('jokes')
  return jokes ? JSON.parse(jokes) : []
}

export const addJokeToLocalStorage = (joke: FrontendJokeType) => {
  const jokes = getJokesFromLocalStorage()
  if (isJokeSavedInLocalStorage(joke.id)) return
  jokes.push(joke)
  localStorage.setItem('jokes', JSON.stringify(jokes))
}

export const removeJokeFromLocalStorage = (jokeId: number) => {
  const jokes = getJokesFromLocalStorage()
  const updatedJokes = jokes.filter((joke) => joke.id !== jokeId)
  localStorage.setItem('jokes', JSON.stringify(updatedJokes))
}

export const isJokeSavedInLocalStorage = (jokeId: number): boolean => {
  const jokes = getJokesFromLocalStorage()
  return jokes.some((joke) => joke.id === jokeId)
}
