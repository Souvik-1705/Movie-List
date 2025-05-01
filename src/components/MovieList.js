import React from 'react';
import Movie from './Movie'; 

function MovieList({ movies,onDelete }) {
  return (
    <ul>
      {movies.map(movie => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default MovieList;
