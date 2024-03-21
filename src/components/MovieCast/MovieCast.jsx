import { Link, useLocation, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { movieCastReq } from "../../api-service";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {movieId} = useParams()
  const location = useLocation()
  const backLinkRef = useRef(location.state?.from ?? "/movies")

  useEffect(() => {
    if(!movieId) return
    const getCastData = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await movieCastReq(movieId)
        setCast(res)
      } catch (error) {
        setError(error.message)
        toast.error("Oops, something went wrong!")
      } finally {
        setLoading(false)
      }
    }

    getCastData()
  }, [movieId])

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error}/>}
      {cast && cast.map((actor) => {
                  return actor;
                })
                .join(", ")}
      <Link to={backLinkRef.current} >Go Back</Link>
    </>
  )
}

export default MovieCast