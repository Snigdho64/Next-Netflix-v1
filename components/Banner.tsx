import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/constants'
import { Movie } from '../types/types'
import {
  InformationCircleIcon as InfoIcon,
  PlayIcon,
} from '@heroicons/react/solid'
import useModal from '../hooks/useModal'

const Banner: React.FC<{ netflixOriginals: [Movie] }> = ({
  netflixOriginals,
}) => {
  const [movie, setMovie] = useState<Movie>()

  const { setMovie: setModalMovie, setShowModal } = useModal()

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="flex w-full flex-col space-y-2 px-5 md:px-10 lg:h-[50vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-full">
        <Image
          src={`${BASE_URL}/${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
        />
      </div>
      <h1 className="text-2xl font-bold text-shadow-md md:text-4xl xl:text-6xl">
        {movie?.title || movie?.name}
      </h1>
      <p className="mg:text-lg max-w-xs text-xs text-shadow-md sm:text-base md:max-w-lg">
        {movie?.overview}
      </p>
      <div className="mt-10 flex max-w-md flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
        <button
          className="bannerIcon bg-[red]/70 text-white"
          onClick={() => {
            movie && setModalMovie(movie)
            setShowModal(true)
          }}
        >
          <PlayIcon className="icon" />
          Play
        </button>
        <button
          className="bannerIcon bg-[gray]/70"
          onClick={() => {
            movie && setModalMovie(movie)
            setShowModal(true)
          }}
        >
          <InfoIcon className="icon" />
          More Info
        </button>
      </div>
    </div>
  )
}

export default Banner
