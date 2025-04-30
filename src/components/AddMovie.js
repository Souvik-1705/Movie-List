import React, { useRef } from 'react';
import "../styles/AddMovie.css";

function AddMovie(props) {
    const titleRef=useRef();
    const openingTextRef=useRef();
    const releaseDateRef=useRef();

    function submitHandler(event){
        event.preventDefault();

        const movie={
            title:titleRef.current.value,
            overview:openingTextRef.current.value,
            releaseDate:releaseDateRef.current.value
        };
        props.onAddMovie(movie);
    }
  return (
    <form onSubmit={submitHandler}>
        <div>
            <label>Title</label>
            <input type='text' ref={titleRef}/>
        </div>

        <div>
            <label>Opening Text</label>
            <textarea type='text' ref={openingTextRef}></textarea>
        </div>

        <div>
            <label>Release Date</label>
            <input type='text' ref={releaseDateRef}/>
        </div>
        <button type='submit'>Submit</button>
    </form>
  )
}

export default AddMovie;