import css from './MovieCast.module.css'

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { movieCastReq } from "../../api-service";

import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import nophoto from '../../assets/img/nophoto.jpg'

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {movieId} = useParams()

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
                  return (
                    <li key={actor.id} className={css.actor}>
                      <img width="150px" src={actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : nophoto} /> 
                      <p>{actor.name}</p>
                      <span>Known as:{" "}</span>
                      <p>{actor.character}</p>
                    </li>
                  );
                })
                }
    </>
  )
}

export default MovieCast