import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../pages/signup.css";
export default function TrendingNow() {
  const [movies, setMovies] = useState([]);
  const API_KEY = "661300719f6661404058437a8a29ac1c";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );

      const data = await response.json();
      console.log(data);

      setMovies(data.results.slice(5, 12));
    }
    fetchMovies();
    // Used depenedency array here so the effect runs only once
  }, []);

  return (
   <div>
  <h2 className="title">Trending Now</h2>
  <div className="signup-trending-cards-row">
    {movies.map((movie, index) => (
      <div
        className="signup-trending-card"
        key={movie.id}
        onClick={() =>
          navigate("/signin", {
            state: { redirectToDetailPage: movie.id },
          })
        }
      >
        <span className="rank">{index + 1}</span>

        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        />

        <FaPlay className="play-icon" />
      </div>
    ))}
  </div>
</div>

  );
}
