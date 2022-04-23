import React, { useRef, useState } from 'react'
import { Movie } from '../types/types'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Thumbnail from './Thumbnail'

const MoviesRow: React.FC<{
  category: string
  movies: Movie[]
}> = ({ category, movies }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (dir: 'LEFT' | 'RIGHT') => {
    setIsScrolled(true)
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const left =
        dir === 'LEFT' ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left, behavior: 'smooth' })
    }
  }

  return (
    <div className="flex w-full flex-col space-y-0.5 md:space-y-2">
      <h1 className="mx-auto text-lg font-bold capitalize text-[#e3e3e3] text-shadow-md sm:ml-5 sm:text-xl md:ml-10 lg:text-2xl">
        {category.match(/([A-Z]?[^A-Z]*)/g)?.join(' ')}
      </h1>
      <div className="group relative flex w-full flex-1 items-center">
        <div
          className="absolute left-1 z-20 hidden rounded-full bg-gray-500/30 p-2 hover:scale-105 hover:bg-gray-500/70 group-hover:block"
          onClick={handleScroll.bind(null, 'LEFT')}
        >
          <ArrowLeftIcon className="icon" />
        </div>
        <div
          className="flex min-h-[35vh] w-full flex-1 overflow-scroll scrollbar-hide sm:min-h-[35vh]"
          ref={scrollRef}
        >
          {movies.map((movie) => (
            <Thumbnail movie={movie} key={movie.id} />
          ))}
        </div>
        <div
          className="absolute right-1 z-20 hidden rounded-full bg-gray-500/30 p-2 hover:scale-105 hover:bg-gray-500/70 group-hover:block"
          onClick={handleScroll.bind(null, 'RIGHT')}
        >
          <ArrowRightIcon className="icon" />
        </div>
      </div>
    </div>
  )
}

export default MoviesRow
