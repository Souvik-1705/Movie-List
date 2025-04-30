
import './App.css';
import MovieList from './components/MovieList';
import { useEffect, useState ,useCallback} from 'react';

function App() {
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);

  const fetchMoviesHandler= useCallback(async function fetchMoviesHandler(){
      setIsLoading(true);
      setError(null);

      try{
        const response= await fetch("https://api.themoviedb.org/3/discover/movie?api_key=323e3fe5a8237f5319c4b400fb4bd2d9")
        if(!response.ok){
          throw new Error("Something Went Wrong");
        }
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
         
      }
      catch(error){
        setError(error);
      }
      setIsLoading(false);
    
  },[]);

      useEffect(()=>{
        fetchMoviesHandler();
      },[fetchMoviesHandler]);
  return (
    <div className="App">

     <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
     </section>

     <section>
      {!isLoading && movies.length>0 && <MovieList movies={movies}/>}
      {!isLoading && movies.length===0 && !error && <p>Found no Movies.</p>}
      {!isLoading && error && <p>{error.message}</p>}
      {isLoading &&  <p>Loading...</p>}
     </section>

    </div>
  );
}

export default App;
