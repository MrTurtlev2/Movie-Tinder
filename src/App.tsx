import { useEffect, useState } from 'react';
import { selectPopularMovies } from './features/movies/movieSlice';
import Card from './components/Card';
import {theme} from './constants/theme'
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/common/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getPopularMoviesAsync, getUpcomingMoviesAsync } from './services/movieService';
import { Menu } from './components/Menu';

enum MenuOptionEnum {
  Popular = 'popular',
  Upcoming = 'upcoming'
}

const App = () => {

  const [currentCard, setCurrentCard] = useState(0);
  const [selectedMenuOption, setSelectedMenuOption] = useState(MenuOptionEnum.Popular);
  // const [moviesArray, setoviesArray] = useState(0);

  const moviesArray = useAppSelector(selectPopularMovies);
  const dispatch = useAppDispatch();

	useEffect(()=> {
		dispatch(getPopularMoviesAsync());
    dispatch(getUpcomingMoviesAsync());
	}, [dispatch]);


  const handleChoseMovie = () => {
    setTimeout(function() {
      if(currentCard === moviesArray.length -1) {
        setCurrentCard(0)
      } else {
        setCurrentCard(currentCard + 1)
      }
    }, 1000);
  }

  const selectMovieType = (val : any) => {
    setSelectedMenuOption(val);
  }

  console.log(selectedMenuOption)

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Menu selectedOption={(val : any)=> selectMovieType(val)} />
        {moviesArray.map((item : any, index : number) => {
          if(currentCard === index) {
            return (
              <Card
              key={item.id}
              {...item}
              currentCard={currentCard}
              onCloseMovie={handleChoseMovie}/>
            )
          } else { return null}
            
        })}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
