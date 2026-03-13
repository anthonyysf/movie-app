import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import movies from '../data/movies.json'

function MovieListing() {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')
  const navigate = useNavigate()

  const genres = ['All', ...new Set(movies.map(movie => movie.genre))]

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-gray-900 p-8">

      <h1 className="text-white text-4xl font-bold mb-8 text-center">🎬 Movie Library</h1>

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
              className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
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
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MovieListing