import { CategoryMovies, Movie } from './../types/types.d'
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  actionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  comedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  horrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  romanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

type ResponseObj = {
  page: number
  results: Movie[]
  total_results: number
  total_pages: number
}

export const getCategoryMovies = async () => {
  const urls: string[] = Object.values(requests)
  const results = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((response) => response.json())
        .then((result) => result as ResponseObj)
    )
  )

  const category_movies: any = {}

  Object.keys(requests).forEach(
    (category, idx) => (category_movies[category] = results[idx].results)
  )
  return category_movies
}

export default getCategoryMovies

export const getTrailer = async (type: 'tv' | 'movie', id: number) => {
  let res
  res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  )
  if (!res.ok) {
    res = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    )
  }
  const data = await res.json()
  return data ? data : null
}
