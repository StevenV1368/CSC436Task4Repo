import React from 'react';
import { useState, useEffect } from 'react'
import Movies from './components/Movies';
import SearchBar from './components/SearchBar';
import movieData from './utils/movies';

function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [sort , setSort] = useState(true);

  const sortingHandler = () => {
  setMovies(movies.sort((a,b)=>{
    if(sort){
      setSort(false);
      return a.length-b.length;
    }
    else{
      setSort(true);
      return b.length-a.length;
    }
  }))
}

  useEffect(() => {
    setMovies(movieData.filter(movie => {
      return (movie.title.toUpperCase().includes(search.toUpperCase())) &&
         ([NaN,0].includes(parseInt(maxLength,10)) || parseInt(maxLength,10) >= movie.length )
     }));

  }, [search, maxLength]);

  

  return (
    <>
    
      {/* Header Bar for Searching */}
      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        maxLength={maxLength} 
        setMaxLength={setMaxLength}
        sortMovies={sortingHandler}
        
      />
      {/* Output the Movies */}
      <Movies movies={movies} />
    </>
  )
}

  export default App;