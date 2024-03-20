import { lazy } from 'react'
import css from './HomePage.module.css'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))

const HomePage = () => {
  return (
    <div>HomePage
      <MovieList />
    </div>
  )
}

export default HomePage