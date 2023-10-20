import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";

function DetailMovie() {
  const { id } = useParams();
  const [film, setFilm] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.request(
          `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`,
          {
            method: "GET",
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFilm(response.data.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getMovie();
  }, [token, id]);

  if (!film) {
    return <div>LOADING...</div>;
  }
  console.log(film.genres);
  return (
    <>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{film.title}</h5>
              <p class="card-text">{film.overview}.</p>
              <p>Genre: {film.genres?.map((genre) => genre.name).join(", ")}</p>
              <p>Score : {film.vote_average}</p>
              <p class="card-text">
                <small>{film.release_date}</small>
              </p>
              <Link to={`/`}>
                <button className="btn btn-danger">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailMovie;
