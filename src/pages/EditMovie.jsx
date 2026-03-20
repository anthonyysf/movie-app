// Page for editing an existing movie in the Redux store
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editMovie } from '../store/moviesSlice'

function EditMovie() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const movie = movies.find(m => m.id === parseInt(id))

  const [title, setTitle] = useState(movie?.title || '')
  const [genre, setGenre] = useState(movie?.genre || '')
  const [year, setYear] = useState(movie?.year || '')
  const [rating, setRating] = useState(movie?.rating || '')
  const [description, setDescription] = useState(movie?.description || '')
  const [poster, setPoster] = useState(movie?.poster || '')
  const [director, setDirector] = useState(movie?.director || '')
  const [cast, setCast] = useState(movie?.cast?.join(', ') || '')
  const [error, setError] = useState('')

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Movie not found.</p>
      </div>
    )
  }

  function handleEdit() {
    if (!title || !genre || !year || !rating || !description || !director) {
      setError('Please fill in all required fields')
      return
    }

    dispatch(editMovie({
      id: movie.id,
      title,
      genre,
      year: parseInt(year),
      rating: parseFloat(rating),
      description,
      poster,
      director,
      cast: cast.split(',').map(c => c.trim()).filter(c => c !== '')
    }))

    navigate('/movies')
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl">

        <h1 className="text-white text-3xl font-bold mb-6">Edit Movie</h1>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Genre *</label>
            <input value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Year *</label>
            <input value={year} onChange={e => setYear(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Rating *</label>
            <input value={rating} onChange={e => setRating(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Director *</label>
            <input value={director} onChange={e => setDirector(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Poster URL</label>
            <input value={poster} onChange={e => setPoster(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-sm mb-1 block">Cast (comma separated)</label>
          <input value={cast} onChange={e => setCast(e.target.value)} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-6">
          <label className="text-gray-400 text-sm mb-1 block">Description *</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate('/movies')} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition">
            Cancel
          </button>
          <button onClick={handleEdit} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditMovie