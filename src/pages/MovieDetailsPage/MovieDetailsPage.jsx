import { lazy } from "react"
import css from './MovieDetailsPage.module.css'

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'))

const MovieDetailsPage = () => {
  return (
    <div>
        <MovieCast />
        <MovieReviews />
    </div>
  )
}

export default MovieDetailsPage