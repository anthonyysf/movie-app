import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MovieListing from './pages/MovieListing'
import MovieDetails from './pages/MovieDetails'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies" element={
          <ProtectedRoute>
            <MovieListing />
          </ProtectedRoute>
        } />
        <Route path="/movies/:id" element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        } />
        <Route path="/movies/add" element={
          <ProtectedRoute>
            <AddMovie />
          </ProtectedRoute>
        } />
        <Route path="/movies/edit/:id" element={
          <ProtectedRoute>
            <EditMovie />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App