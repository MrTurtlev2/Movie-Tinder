import { createSlice } from '@reduxjs/toolkit';
import { getMoviesAsync } from '../../services/movieService';

const initialState = {
	movies: [],
    dataStatus: 'pending'
};


export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMoviesAsync.pending, (state) => {
                state.dataStatus = 'pending';
			})
			.addCase(getMoviesAsync.fulfilled, (state, action) => {
				state.movies = action.payload;
			})
			.addCase(getMoviesAsync.rejected, (state) => {
				state.dataStatus = 'rejected';
			});
	},
});

export const selectMovies = (state: { movies: { movies: any; }; }) => state.movies.movies;

export default moviesSlice.reducer;