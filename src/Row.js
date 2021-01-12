import React, { useState, useEffect, useRef } from "react";
import axios from "./axios";
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Error.css";

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState([]);
  const baseURL = "https://images.tmdb.org/t/p/original";
  const [trailerURL, setTrailerURL] = useState("");
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    width: "100%",
    height: "390px;",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerURL) {
      setTrailerURL("");
    } else {
      movieTrailer(
        movie?.name || movie?.orginal_name || movie?.original_title || ""
      )
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
          setIsFound(true);
        })
        .catch((error) => {
          setIsFound(false);
          toClose(false);
        });
    }
  };
  let errRef = useRef();
  const handler = (event) => {
    if (!errRef.current.contains(event.target)) setIsFound(true);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handler);
  });

  const toClose = (value) => {
    setIsFound(value);
  };
  return (
    <div className="row">
      <div ref={errRef} className={`error ${isFound && "hide"}`}>
        <div className="error_contents">
          <h1 className="error_msg">Video Not Found</h1>
          <button className="error_button" onClick={() => toClose(true)}>
            Close
          </button>
        </div>
      </div>
      <h1> {title} </h1>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLarge && "row_posterLarge"}`}
              src={`${baseURL}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={`${
                movie?.name || movie?.orginal_name || movie?.original_title
              }`}
            />
          );
        })}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
}
export default Row;
