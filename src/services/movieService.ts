import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = 'https://tinder.free.beeceptor.com';
// const API = 'https://jsonplaceholder.typicode.com'
const API = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=ff50baa59a96c64b8d7de41b804d51f0';

export const getMoviesAsync = createAsyncThunk(
	'movies/getMoviesAsync', async () => {
		const data = await axios.get(`${API}/movie/popular?${API_KEY}`);
		console.log(data.data.results);
		return data.data.results;
	}
);