import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getMoviesAsync } from '../../services/movieService';
import { MoviesState, selectMovies } from './movieSlice';
  
  describe('fetching data works', () => {
    const initialState: MoviesState = {
        fetchMovieStatus: 'pending',
        postMovieStatus: 'pending',
        movies: []
    };
    it('should handle initial state', () => {
        expect(initialState).toEqual({
            fetchMovieStatus: 'pending', 
            postMovieStatus: 'pending',
            movies: []
        })
    });

    it('should fetch movies', () => {
        const moviesArray = useAppSelector(selectMovies);
        const dispatch = useAppDispatch();

        useEffect(()=> {
            dispatch(getMoviesAsync());
        }, [dispatch]);
        expect(moviesArray.length).toBeGreaterThan(0);
    });
});