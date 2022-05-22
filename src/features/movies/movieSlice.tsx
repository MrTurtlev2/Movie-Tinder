import { createSlice } from '@reduxjs/toolkit';
import { choseMoviesAsync, getMoviesAsync } from '../../services/movieService';

const initialState = {
	movies: [],
    fetchMovieStatus: 'pending',
	postMovieStatus: 'pending'
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMoviesAsync.pending, (state) => {
                state.fetchMovieStatus = 'pending';
			})
			.addCase(getMoviesAsync.fulfilled, (state, action) => {
				state.movies = action.payload;
			})
			.addCase(getMoviesAsync.rejected, (state) => {
				state.fetchMovieStatus = 'rejected';
			})

			.addCase(choseMoviesAsync.pending, (state) => {
				state.postMovieStatus = 'pending';
			})
			.addCase(choseMoviesAsync.fulfilled, (state) => {
				state.postMovieStatus = 'fulfilled';
			})
			.addCase(choseMoviesAsync.rejected, (state) => {
				state.postMovieStatus = 'rejected';
			})
	},
});

export const selectMovies = (state: { movies: { movies: any; }; }) => state.movies.movies;

export default moviesSlice.reducer;