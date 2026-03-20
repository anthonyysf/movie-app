// Page for adding a new movie to the Redux store
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addMovie } from '../store/moviesSlice'

function AddMovie() {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [year, setYear] = useState('')
  const [rating, setRating] = useState('')
  const [description, setDescription] = useState('')
  const [poster, setPoster] = useState('')
  const [director, setDirector] = useState('')
  const [cast, setCast] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)

  function handleAdd() {
    if (!title || !genre || !year || !rating || !description || !director) {
      setError('Please fill in all required fields')
      return
    }

    const newMovie = {
      id: movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1,
      title,
      genre,
      year: parseInt(year),
      rating: parseFloat(rating),
      description,
      poster: poster || 'https://via.placeholder.com/300x450?text=No+Poster',
      director,
      cast: cast.split(',').map(c => c.trim()).filter(c => c !== '')
    }

    dispatch(addMovie(newMovie))
    navigate('/movies')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl">

        <h1 className="text-white text-3xl font-bold mb-6">Add New Movie</h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Movie title" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Genre *</label>
            <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="e.g. Action" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Year *</label>
            <input value={year} onChange={e => setYear(e.target.value)} placeholder="e.g. 2023" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Rating *</label>
            <input value={rating} onChange={e => setRating(e.target.value)} placeholder="e.g. 8.5" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Director *</label>
            <input value={director} onChange={e => setDirector(e.target.value)} placeholder="Director name" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Poster URL</label>
            <input value={poster} onChange={e => setPoster(e.target.value)} placeholder="https://..." className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Cast (comma separated)</label>
          <input value={cast} onChange={e => setCast(e.target.value)} placeholder="Actor 1, Actor 2, Actor 3" className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-1 block">Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Movie description..." rows={4} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate('/movies')} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition">
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            Add Movie
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddMovie