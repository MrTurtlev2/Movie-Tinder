import { createSlice } from '@reduxjs/toolkit';
import { choseMoviesAsync, getPopularMoviesAsync, getUpcomingMoviesAsync } from '../../services/movieService';

const initialState = {
	movies: [],
    fetchPopularMovieStatus: 'pending',
	fetchUpcomingMovieStatus: 'pending',
	postMovieStatus: 'pending'
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPopularMoviesAsync.pending, (state) => {
                state.fetchPopularMovieStatus = 'pending';
			})
			.addCase(getPopularMoviesAsync.fulfilled, (state, action) => {
				state.movies = action.payload;
			})
			.addCase(getPopularMoviesAsync.rejected, (state) => {
				state.fetchPopularMovieStatus = 'rejected';
			})


			.addCase(getUpcomingMoviesAsync.pending, (state) => {
                state.fetchUpcomingMovieStatus = 'pending';
			})
			.addCase(getUpcomingMoviesAsync.fulfilled, (state, action) => {
				state.movies = action.payload;
			})
			.addCase(getUpcomingMoviesAsync.rejected, (state) => {
				state.fetchUpcomingMovieStatus = 'rejected';
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

export const selectPopularMovies = (state: { movies: { movies: any; }; }) => state.movies.movies;

export default moviesSlice.reducer;