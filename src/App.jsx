import './App.css'
import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"))
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"))
const MovieDetailsPage = lazy(() => import("../src/pages/MovieDetailsPage/MovieDetailsPage"))
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"))
const MovieReviews = lazy(() => import("./components/MovieReviews/MovieReviews"))
const NotFoundPage = lazy(() => import("../src/pages/NotFoundPage/NotFoundPage"))
const Navigation = lazy(() => import("./components/Navigation/Navigation"))

function App() {

  return (
    <>
    <Navigation />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/movies' element={<MoviesPage />} />
      <Route path='/movies/:movieId' element={<MovieDetailsPage />} >
        <Route path='movies/:movieId/cast' element={<MovieCast />} />
        <Route path='movies/:movieId/reviews' element={<MovieReviews />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
    </>
  )
}

export default App