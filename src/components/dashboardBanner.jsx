import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboardBanner.css";

const API_KEY = "661300719f6661404058437a8a29ac1c";

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const navigate = useNavigate();

  // Fetching trending movies
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();
      const top10 = data.results.slice(0, 10);
      setMovies(top10);
      setBannerMovie(top10[0]);
    }

    fetchMovies();
  }, []);

  // For the autorotation of banner movie
  useEffect(() => {
    if (!movies.length) return;

    let index = 0;
    const interval = setInterval(() => {
      //% movies.length will force it to act like a loop
      index = (index + 1) % movies.length;
      setBannerMovie(movies[index]);
    }, 6000);

    return () => clearInterval(interval);
    // using movies in dependency array so it only runs when the movies are loaded
  }, [movies]);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: bannerMovie
          ? `url("https://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}")`
          : "none",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{bannerMovie?.title}</h1>
        <p className="banner-description">{bannerMovie?.overview}</p>

        <button
          className="banner-btn"
          onClick={() => navigate(`/details/${bannerMovie.id}?type=movie`)}
        >
          Play
        </button>

        <button className="banner-btn">More Info</button>
      </div>
    </div>
  );
}
