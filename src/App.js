import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMovies, getMoviesAsync } from './features/movies/movieSlice';
import Card from './components/Card';
import {theme} from './constants/theme'
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/common/Layout';

const App = () => {

  const moviesArray = useSelector(selectMovies);
  const dispatch = useDispatch();

	useEffect(()=> {
		dispatch(getMoviesAsync());
	}, [dispatch]);


  return (
    <ThemeProvider theme={theme}>
      <Layout>
        {moviesArray.map((item, index) => <Card {...item} key={item.id} index={index} />)}
      </Layout>
    
    </ThemeProvider>
  );
}

export default App;
