import React from 'react'
import useModal from '../hooks/useModal'
import { CategoryMovies } from '../types/types'
import MoviesRow from './MoviesRow'

const CategoryMovies: React.FC<{ categoryMovies: CategoryMovies }> = ({
  categoryMovies,
}) => {
  return (
    <section
      className={`w-full space-y-4 bg-opacity-50 bg-gradient-to-b backdrop-blur-sm backdrop-opacity-50 sm:space-y-10 md:space-y-24`}
    >
      {Object.entries(categoryMovies).map(([k, v], i) => (
        <MoviesRow key={i + k} category={k} movies={v} />
      ))}
    </section>
  )
}

export default CategoryMovies
