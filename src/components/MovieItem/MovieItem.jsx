const MovieItem = ({ movie }) => {
  return (
    <>
        <img src={movie.poster_path} alt="movie poster" />
        <div>
            <p>{movie.title}</p>
        </div>
    </>
  )
}

export default MovieItem