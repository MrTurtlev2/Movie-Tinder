import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMovies, getMoviesAsync } from './features/movies/movieSlice';
import Card from './components/Card';
import {theme} from './constants/theme'
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/common/Layout';

const App = () => {

  const [currentCard, setCurrentCard] = useState(0)

  const moviesArray = useSelector(selectMovies);
  const dispatch = useDispatch();

	useEffect(()=> {
		dispatch(getMoviesAsync());
	}, [dispatch]);


  const handleChoseMovie = () => {
    if(currentCard === moviesArray.length -1) {
      setCurrentCard(0)
    } else {
      setCurrentCard(currentCard + 1)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {moviesArray.map((item, index) => {
          if(currentCard === index) {
            return (
              <Card
              key={item.id}
              {...item}
              index={index + 1}
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
