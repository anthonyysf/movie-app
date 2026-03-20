import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movies = useSelector(state => state.movies)

  const movie = movies.find(m => m.id === parseInt(id))

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Movie not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">

      <button
        onClick={() => navigate('/movies')}
        className="text-blue-400 hover:underline mb-6 inline-block"
      >
        ← Back to Movies
      </button>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl overflow-hidden flex flex-col md:flex-row">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-72 object-cover"
        />
        <div className="p-8">
          <h1 className="text-white text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{movie.genre} • {movie.year}</p>
          <p className="text-yellow-400 text-sm mb-6">⭐ {movie.rating} / 10</p>

          <h2 className="text-white text-lg font-semibold mb-2">Overview</h2>
          <p className="text-gray-300 mb-6">{movie.description}</p>

          <h2 className="text-white text-lg font-semibold mb-2">Director</h2>
          <p className="text-gray-300 mb-6">{movie.director}</p>

          <h2 className="text-white text-lg font-semibold mb-2">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map(actor => (
              <span
                key={actor}
                className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-full"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default MovieDetails