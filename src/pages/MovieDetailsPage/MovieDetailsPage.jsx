import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { movieDetailsReq } from "../../api-service"
import toast from "react-hot-toast"

const Loader = lazy(() => import('../../components/Loader/Loader'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'))

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {movieId} = useParams()
  const location = useLocation()
  const backLinkRef = useRef(location.state?.from ?? "/movies")

  useEffect(() => {
    if(!movieId) return
    const getMovieData = async () => {
      setLoading(true)
      setError(false)
      setMovie([])
      try {
        const res = await movieDetailsReq(movieId)
        setMovie(res)
      } catch (error) {
        setError(error.message)
        toast.error("Oops, something went wrong!")
      } finally {
        setLoading(false)
      }
    }

    getMovieData()
  }, [movieId])

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movie && (
        <div>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" />
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
          <p>Genres:{" "}
            {movie.genres &&
              movie.genres
                .map((genre) => {
                  return genre.name;
                })
                .join(", ")}
          </p>
          <p>{movie.vote_average.toFixed(1)}/10</p>
        </div>
      )}
      <div>
        <Link to={backLinkRef.current} >Go Back</Link>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Movie Reviews</Link>
      </div>
      <Suspense fallback={<Loader />} >
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default MovieDetailsPage