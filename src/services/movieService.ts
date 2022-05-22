import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const API = 'https://tinder.free.beeceptor.com';
// const API = 'https://jsonplaceholder.typicode.com'
const API = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=ff50baa59a96c64b8d7de41b804d51f0';

export const getPopularMoviesAsync = createAsyncThunk(
	'movies/getPopularMoviesAsync', async () => {
		const data = await axios.get(`${API}/movie/popular?${API_KEY}`);
		console.log(data.data.results);
		return data.data.results;
	}
);

export const getUpcomingMoviesAsync = createAsyncThunk(
	'movies/getUpcomingMoviesAsync', async () => {
		const data = await axios.get(`${API}/movie/upcoming?${API_KEY}`);
		console.log(data.data.results);
		return data.data.results;
	}
);

export const choseMoviesAsync = createAsyncThunk(
	'movies/choseMoviesAsync', async ({id, decision} : any) => {
		const data = await axios.post(`${API}/recomendations/${id}/${decision}`, {id, decision});
		return data.data.results;
	}
);