
import './App.css';
import MovieList from './components/MovieList';
import { useState } from 'react';

function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);

  async function fetchMoviesHandler(){
      setIsLoading(true);
      const response= await fetch("https://api.themoviedb.org/3/discover/movie?api_key=323e3fe5a8237f5319c4b400fb4bd2d9")
      const data= await response.json();
      
        const transformedMovies=data.results.map(movieData=>{
            return{
              id:movieData.id,
              title: movieData.title,
              overview:movieData.overview,
              releaseDate:movieData.release_date
            }
        })
        setMovies(transformedMovies);
        setIsLoading(false);
  }
  return (
    <div className="App">

     <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
     </section>

     <section>
      {!isLoading && movies.length>0 && <MovieList movies={movies}/>}
      {!isLoading && movies.length===0 && <p>Found no Movies.</p>}
      {isLoading && <p>Loading...</p>}
     </section>

    </div>
  );
}

export default App;
