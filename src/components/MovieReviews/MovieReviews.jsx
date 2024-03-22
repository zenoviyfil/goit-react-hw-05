import css from './MovieReviews.module.css'
import dateFormat from 'dateformat';

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { movieReviewsReq } from "../../api-service";

import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {movieId} = useParams()

  useEffect(() => {
    if(!movieId) return
    const getCastData = async () => {
      setLoading(true)
      setError(false)
      try {
        const res = await movieReviewsReq(movieId)
        setReviews(res)
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
      {reviews && reviews.map((review) => {
                  return (
                    <div key={review.id} className={css.reviewDiv}>
                      <p className={css.reviewAuth}>{review.author}</p>
                      <p className={css.reviewContent}>{review.content}</p>
                      <div className={css.reviewDate}>
                        <p className={css.reviewCreated}>Created{": "}{dateFormat(`${review.created_at}`, "mmmm dS, yyyy (hh:mm:ss)")}</p>
                        <p className={css.reviewUpdated}>Updated{": "}{dateFormat(`${review.updated_at}`, "mmmm dS, yyyy (hh:mm:ss)")}</p>
                      </div>
                    </div>
                  );
                })
                }
    </>
  )
}

export default MovieReviews