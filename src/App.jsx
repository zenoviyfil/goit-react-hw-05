import { lazy } from 'react'
import './App.css'

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"))
const MovieDetailsPage = lazy(() => import("../src/pages/MovieDetailsPage/MovieDetailsPage"))
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"))
const NotFoundPage = lazy(() => import("../src/pages/NotFoundPage/NotFoundPage"))

function App() {

  return (
    <>
      <HomePage />
      <MovieDetailsPage />
      <MoviesPage />
      <NotFoundPage />
    </>
  )
}

export default App
