import Image from 'next/image'
import React from 'react'
import useModal from '../hooks/useModal'
import { Movie } from '../types/types'

const Thumbnail: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { setMovie, setShowModal } = useModal()
  return (
    <div className="relative flex min-h-[25vh] min-w-[180px] cursor-pointer items-center justify-center md:min-h-[30vh] md:min-w-[240px] lg:min-w-[280px]">
      <div
        className="absolute min-h-[90%] min-w-[90%] rounded transition-all duration-200 hover:z-10 hover:scale-110 hover:shadow-md"
        onClick={() => {
          setMovie(movie)
          setShowModal(true)
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500/${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-sm md:rounded"
          layout="fill"
        />
      </div>
    </div>
  )
}

export default Thumbnail
