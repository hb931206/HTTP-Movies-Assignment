import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ history, addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log("ID params ", id);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Res is: ", res);
        getMovieList();
        history.push(`/`);
      })
      .catch((err) => console.log("The Error is", err.message));
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>
      <div
        className="update-button"
        onClick={() => {
          history.push(`/update-movie/${id}`);
        }}
      >
        Update
      </div>
    </div>
  );
}

export default Movie;
