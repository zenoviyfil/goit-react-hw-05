const MovieItem = ({ movie: {title, poster_path, release_date, vote_average} }) => {
  return (
    <>
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="movie poster" />
        <div>
            <p>Title: {`"${title}"`}</p>
            <p>Release Date: {`"${release_date}"`}</p>
            <p>Rating: {vote_average.toFixed(1)}/10</p>
        </div>
    </>
  )
}

export default MovieItem