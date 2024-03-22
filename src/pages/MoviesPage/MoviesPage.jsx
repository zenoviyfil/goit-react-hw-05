import { lazy, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { queryReq } from '../../api-service'
import { toast } from 'react-hot-toast'

const MovieList = lazy(() => import('../../components/MovieList/MovieList'))
const Loader = lazy(() => import('../../components/Loader/Loader'))
const SearchForm = lazy(() => import('../../components/SearchForm/SearchForm'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))



const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const query = searchParams.get("query") ?? ""

  useEffect(() => {
    if(!searchParams) return
    const fetchQueryMovies = async () => {
      setLoading(true)
      setError(null)
      setMovies([])
      try {
        const res = await queryReq(query)
        if(!res) throw new Error(error.message)

        setMovies(res)
      } catch (error) {
        setError(error.message)
        toast.error("Sorry, there is no movie matching your search query!")
      } finally {
        setLoading(false)
      }
    }

    if(!query) return
    fetchQueryMovies()
  }, [query, error, searchParams])

  const handleSearch = (query) => {
    const nextParams = query !== "" ? {query} : {}
    setSearchParams(nextParams)
  }

  return (
    <main>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <SearchForm onSearch={handleSearch} />
      <MovieList movies={movies} />
    </main>
  )
}

export default MoviesPage