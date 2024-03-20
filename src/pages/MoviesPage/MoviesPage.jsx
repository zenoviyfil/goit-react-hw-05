import { lazy } from 'react'
import css from './MoviesPage.module.css'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))


const MoviesPage = () => {
  return (
    <div>MoviesPage
      <MovieList />
    </div>
  )
}

export default MoviesPage