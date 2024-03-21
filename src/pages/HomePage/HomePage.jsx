import { lazy, useEffect, useState } from 'react'
import { trendReq } from '../../api-service'
import toast from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))
const Loader = lazy(() => import('../../components/Loader/Loader'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))


const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendMovies = async () => {
      setError(null)
      setLoader(true)
      setMovies([])
      try {
        const res = await trendReq()
        setMovies(res)
      } catch (error) {
        setError(error.message)
        toast.error("Oops, something went wrong!")
      } finally {
        setLoader(false)
      }
    }

    fetchTrendMovies()
  }, [])

  return (
    <main>
      <BrowserRouter>
      <div>HomePage
        {loader && <Loader />}
        {error && <ErrorMessage error={error}/>}
        <MovieList movies={movies} />
      </div>
      </BrowserRouter>
    </main>
  )
}

export default HomePage