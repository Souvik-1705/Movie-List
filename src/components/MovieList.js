import React from 'react';
import Movie from './Movie'; 

function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(movie => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
        />
      ))}
    </ul>
  );
}

export default MovieList;
