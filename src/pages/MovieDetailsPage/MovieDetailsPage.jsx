import { Suspense, lazy, useEffect, useRef, useState } from "react"
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom"
import { movieDetailsReq } from "../../api-service"
import toast from "react-hot-toast"

const Loader = lazy(() => import('../../components/Loader/Loader'))
const ErrorMessage = lazy(() => import('../../components/ErrorMessage/ErrorMessage'))
const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'))

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
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

  const {
    title,
    release_date,
    overview,
    genres,
    poster_path,
    vote_average
  } = movie || {};

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movie && (
        <div>
          <img src={`https://image.tmdb.org/movies/${movieId}/${poster_path}`} alt="movie poster" />
          <p>{title}</p>
          <p>{release_date}</p>
          <p>{overview}</p>
          <p>{genres}</p>
          <p>{vote_average}</p>
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

{/* <>
<Suspense fallback={<Loader />}>
  <Routes>
    <Route path=':movieId/cast' element={<MovieCast />} />
    <Route path=':movieId/reviews' element={<MovieReviews />} />
  </Routes>
</Suspense>
</> */}