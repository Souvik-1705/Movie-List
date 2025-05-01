
import './App.css';
import AddMovie from './components/AddMovie';
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
        const response= await fetch("https://react-http-59d41-default-rtdb.firebaseio.com/movies.json")
        if(!response.ok){
          throw new Error("Something Went Wrong");
        }
        const data= await response.json();

        const loadedMovies=[];
        for(const key in data){
          loadedMovies.push({
            id:key,
            title:data[key].title,
            overview:data[key].overview,
            releaseDate:data[key].releaseDate
          })
        }
        
          setMovies(loadedMovies);
         
      }
      catch(error){
        setError(error);
      }
      setIsLoading(false);
    
  },[]);

      useEffect(()=>{
        fetchMoviesHandler();
      },[fetchMoviesHandler]);

      async function addMovieHandler(movie) {
        const response = await fetch('https://react-http-59d41-default-rtdb.firebaseio.com//movies.json', {
          method: 'POST',
          body: JSON.stringify(movie),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Added movie:', data);
        fetchMoviesHandler();
      }

      async function deleteMovieHandler(id) {
        await fetch(
          `https://react-http-59d41-default-rtdb.firebaseio.com/movies/${id}.json`,
          {
            method: 'DELETE',
          }
        );
        
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      }
    

  return (
    <div className="App">

      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>

     <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
     </section>
     <section>
  {!isLoading && movies.length > 0 && (
    <MovieList movies={movies} onDelete={deleteMovieHandler} />
  )}
  {!isLoading && movies.length === 0 && !error && <p>Found no Movies.</p>}
  {!isLoading && error && <p>{error.message}</p>}
  {isLoading && <p>Loading...</p>}
</section>

    </div>
  );
}

export default App;
