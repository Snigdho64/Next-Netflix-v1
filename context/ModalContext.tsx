import React, { createContext, useEffect, useState } from 'react'
import { Genre, Movie } from '../types/types'
import { getTrailer } from '../utils/apiRequests'

export const ModalContext = createContext({
  showModal: false as boolean,
  setShowModal: (value: boolean) => {},
  movie: null as Movie | null,
  setMovie: (movie: Movie) => {},
  trailer: null as null | string,
  loading: false as boolean,
  genres: [] as Genre[],
})

const ModalContextProvider: React.FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [movie, setMovie] = useState<Movie | null>(null)
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])
  useEffect(() => {
    if (movie) {
      setLoading(true)
      getTrailer(movie.media_type || 'movie', movie.id)
        .then((data) => {
          data.genres && setGenres(data.genres)
          if (data.videos) {
            if (data.videos.results.length > 0) {
              const trailer = data.videos.results.find(
                (i: any) => i.type === 'Trailer'
              )
              return trailer
                ? setTrailer(trailer.key)
                : setTrailer(data.results[0].key)
            }
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }
  }, [movie, showModal])

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        movie,
        setMovie,
        trailer,
        loading,
        genres,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider
