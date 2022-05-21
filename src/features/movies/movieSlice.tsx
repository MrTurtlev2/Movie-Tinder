import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	movies: [],
};
// const API = 'https://tinder.free.beeceptor.com';
// const API = 'https://jsonplaceholder.typicode.com'

const API = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=ff50baa59a96c64b8d7de41b804d51f0';

export const getMoviesAsync = createAsyncThunk(
	'movies/getMoviesAsync', async () => {
		const data = await axios.get(`${API}/movie/popular?${API_KEY}`);
		return data.data.results;
	}
);


export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMoviesAsync.pending, (state, action) => {
			// state.recipes = action.payload;
				console.log('pending');
			})
			.addCase(getMoviesAsync.fulfilled, (state, action) => {
				state.movies = action.payload;
				console.log(action);
				// console.log('fulfield');
			})
			.addCase(getMoviesAsync.rejected, (state, action) => {
				// state.recipes = action.payload;
				console.log('rejected');
			});
	},
});

export const selectMovies = (state: { movies: { movies: any; }; }) => state.movies.movies;

export default moviesSlice.reducer;