import { Auth, User, UserCredential } from 'firebase/auth'

export interface Genre {
  id: number
  name: string
}

export interface Movie {
  title: string
  adult: boolean
  video: boolean
  backdrop_path: string
  media_type?: 'tv' | 'movie'
  release_date?: string
  first_air_date?: string
  genre_ids?: number[]
  id: number
  name: string
  origin_country: string
  original_language: string
  overview: string
  popularity: integer
  poster_path: string
  vote_average: number
  vote_count: number
  revenue: integer
  budget: integer
}

export interface Element {
  type:
    | 'Bloppers'
    | 'Features'
    | 'Behind The Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}

export type CategoryMovies = {
  netflixOriginals: [Movie]
  trendingNow: [Movie]
  topRated: [Movie]
  actionMovies: [Movie]
  comedyMovies: [Movie]
  horrorMovies: [Movie]
  romanceMovies: [Movie]
  documentaries: [Movie]
}

export type FormInput = {
  email: string
  password: string
}

export type ContextType = {
  user: User | null
  signin: (email: string, password: string) => Promise
  signup: (email: string, password: string) => Promise
  logout: () => Promise
  error: null | string
  loading: boolean
}
