import React from 'react';
import "../styles/Movie.css";

function Movie({title,releaseDate,overview}) {
  return (
    <li className='movie'>
        <h2>{title}</h2>
        <h3>{releaseDate}</h3>
        <p>{overview}</p>
    </li>
  )
}

export default Movie;