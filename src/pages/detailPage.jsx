import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Navbar from "../components/navBar";
import "./detailPage.css";

const API_KEY = "661300719f6661404058437a8a29ac1c";
export default function MovieDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const navigate = useNavigate();

  // Fetch movie details and similar movies
  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadData() {
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        const data1 = await detailsResponse.json();
        setMovie(data1);

        const similarMovieResponse = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${API_KEY}`
        );
        const data2 = await similarMovieResponse.json();
        setSimilar(data2.results || []);
   
    }

    loadData();
  }, [id, type]);

  // Show loading while movie data is not yet fetched
  if (!movie) {
    return (
      <>
        <Navbar />
        <div className="movie-details-page">
          <p style={{ color: "white", padding: "50px", fontSize: "24px" }}>
            Loading...
          </p>
        </div>
      </>
    );
  }

  const bg = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  // Using same logic for seting 7 cards per row
const getSimilarRows = () => {
  const maxItems = 14;
  const itemsPerRow = 7;
  const limitedSimilar = similar.slice(0, maxItems); 
  const rows = Math.ceil(limitedSimilar.length / itemsPerRow);
  const rowArrays = [];

  for (let i = 0; i < rows; i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = startIndex + itemsPerRow;
    rowArrays.push(limitedSimilar.slice(startIndex, endIndex));
  }

  return rowArrays;
};

  return (
    <>
      <Navbar />
      <div
        className="movie-details-page"
        style={{
          backgroundImage: bg
            ? `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bg})`
            : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* setting details */}
        <div className="details-container">
          {poster && <img src={poster} className="details-poster" />}

          <div className="details-text">
            <h1>{movie.title || movie.name}</h1>

            <div className="tags">
              <button className="banner-btn">Play</button>
              <span className="tag">HD</span>
              <span className="tag">
                IMDB: {movie.vote_average?.toFixed(1)}
              </span>
              {movie.runtime && <span className="tag">{movie.runtime} min</span>}
            </div>

            <p className="overview">{movie.overview}</p>

            <div className="info-grid">
              {movie.release_date && (
                <p>
                  <strong>Released:</strong> {movie.release_date}
                </p>
              )}
              {movie.runtime && (
                <p>
                  <strong>Duration:</strong> {movie.runtime} min
                </p>
              )}
              {movie.production_countries?.[0]?.name && (
                <p>
                  <strong>Country:</strong> {movie.production_countries[0].name}
                </p>
              )}
              {movie.genres && (
                <p>
                  <strong>Genres:</strong>{" "}
                  {movie.genres.map((g) => g.name).join(", ")}
                </p>
              )}
              {movie.credits?.cast && (
                <p>
                  <strong>Casts:</strong>{" "}
                  {movie.credits.cast.slice(0, 5).map((c) => c.name).join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="similar">
            <h2 className="similar-heading">You May Also Like</h2>

            {getSimilarRows().map((rowItems, rowIndex) => (
              <div className="similar-row" key={rowIndex}>
                {rowItems.map((m) => (
                  <div
                    key={m.id}
                    className="similar-card"
                    onClick={() => navigate(`/details/${m.id}?type=${type}`)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                    />
                    <FaPlay className="play-icon" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
