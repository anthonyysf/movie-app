// Movie listing page with search, filter, and delete confirmation modal
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMovie } from '../store/moviesSlice'

function MovieListing() {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [movieToDelete, setMovieToDelete] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)

  const genres = ['All', ...new Set(movies.map(movie => movie.genre))]

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  function handleDeleteClick(e, movie) {
    e.stopPropagation()
    setMovieToDelete(movie)
    setShowDeleteModal(true)
  }

  function confirmDelete() {
    dispatch(deleteMovie(movieToDelete.id))
    setShowDeleteModal(false)
    setMovieToDelete(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">

      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bold">🎬 Movie Library</h1>
        <button
          onClick={() => navigate('/movies/add')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Movie
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search movies..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredMovies.map(movie => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
              className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 relative"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-white text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-400 text-sm mt-1">{movie.genre} • {movie.year}</p>
                <p className="text-yellow-400 text-sm mt-1">⭐ {movie.rating}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/movies/edit/${movie.id}`) }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, movie)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-sm text-center">
            <h2 className="text-white text-xl font-bold mb-2">Delete Movie</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to delete <span className="text-white font-semibold">{movieToDelete?.title}</span>?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default MovieListing