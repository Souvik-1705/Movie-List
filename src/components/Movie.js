import React from 'react';
import "../styles/Movie.css";

function Movie({id,title,releaseDate,overview,onDelete}) {
  return (
    <li className='movie'>
        <h2>{title}</h2>
        <h3>{releaseDate}</h3>
        <p>{overview}</p>
        <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  )
}

export default Movie;