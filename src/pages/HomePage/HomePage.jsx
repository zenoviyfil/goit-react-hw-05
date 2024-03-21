import { lazy, useEffect, useState } from 'react'
import { trendReq } from '../../api-service'
import toast from 'react-hot-toast'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))
const Loader = lazy(() => import('../../components/Loader/Loader'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))


const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendMovies = async () => {
      setError(null)
      setLoading(true)
      setMovies([])
      try {
        const res = await trendReq()
        if(!res) throw new Error(error.message)

        setMovies(res)
      } catch (error) {
        setError(error.message)
        toast.error("Oops, something went wrong!")
      } finally {
        setLoading(false)
      }
    }

    fetchTrendMovies()
  }, [error])

  return (
    <main>
      <div>
        <h1>Most Popular On This Week</h1>
        {loading && <Loader />}
        {error && <ErrorMessage error={error}/>}
        <MovieList movies={movies} />
      </div>
    </main>
  )
}

export default HomePage