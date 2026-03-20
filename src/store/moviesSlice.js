import { createSlice } from '@reduxjs/toolkit'
import moviesData from '../data/movies.json'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: moviesData,
  reducers: {
    addMovie: (state, action) => {
      state.push(action.payload)
    },
    editMovie: (state, action) => {
      const index = state.findIndex(m => m.id === action.payload.id)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteMovie: (state, action) => {
      return state.filter(m => m.id !== action.payload)
    }
  }
})

export const { addMovie, editMovie, deleteMovie } = moviesSlice.actions
export default moviesSlice.reducer