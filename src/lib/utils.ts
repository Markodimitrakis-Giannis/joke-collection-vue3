import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { FrontendJokeType, JokeRating } from '@/types/Jokes.ts'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const JOKES_STORAGE_KEY = 'jokes'
const RATINGS_STORAGE_KEY = 'jokes_ratings'

export const getJokesFromLocalStorage = (): FrontendJokeType[] => {
  const jokes = localStorage.getItem(JOKES_STORAGE_KEY)
  return jokes ? JSON.parse(jokes) : []
}

export const addJokeToLocalStorage = (joke: FrontendJokeType) => {
  const jokes = getJokesFromLocalStorage()

  //check if it already has rating in the ratings array

  const foundJoke = getRatingsFromLocalStorage().find((j) => j.id === joke.id)
  if (foundJoke) {
    joke.rating = foundJoke.rating
  }

  if (isJokeSavedInLocalStorage(joke.id)) return
  jokes.push({
    ...joke,
    rating: foundJoke?.rating || undefined,
  })
  localStorage.setItem(JOKES_STORAGE_KEY, JSON.stringify(jokes))
}

export const removeJokeFromLocalStorage = (jokeId: number) => {
  const jokes = getJokesFromLocalStorage()
  const updatedJokes = jokes.filter((joke) => joke.id !== jokeId)
  localStorage.setItem(JOKES_STORAGE_KEY, JSON.stringify(updatedJokes))
}

export const isJokeSavedInLocalStorage = (jokeId: number): boolean => {
  const jokes = getJokesFromLocalStorage()
  return jokes.some((joke) => joke.id === jokeId)
}

export function getRatingsFromLocalStorage(): JokeRating[] {
  const stored = localStorage.getItem(RATINGS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function setRatingsToLocalStorage(ratings: JokeRating[]): void {
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings))

  const jokes = getJokesFromLocalStorage()

  ratings.forEach((ratingObj) => {
    const foundJoke = jokes.find((j) => j.id === ratingObj.id)
    if (foundJoke) {
      foundJoke.rating = ratingObj.rating
    }
  })

  localStorage.setItem(JOKES_STORAGE_KEY, JSON.stringify(jokes))
}
