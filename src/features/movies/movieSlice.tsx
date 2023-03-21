import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {choseMoviesAsync, getMoviesAsync} from '../../services/movieService';

export interface MoviesState {
    fetchMovieStatus: string,
    postMovieStatus: string,
    movies: []
}

const initialState: MoviesState = {
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

export const selectMovies = (state: RootState) => state.movies.movies;

export default moviesSlice.reducer;