import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";

const API_KEY = "661300719f6661404058437a8a29ac1c";

export default function DashboardFilteredContent() {
  const { type } = useParams();
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // for the adjustment of page when it is scrolled dowm
      window.scrollTo(0, 0);
    async function fetchSections() {
      let config = [];

      if (type === "movies") {
        config = [
          {
            title: "Trending Movies",
            url: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          },
          {
            title: "Top Rated Movies",
            url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
          },
          {
            title: "Upcoming Movies",
            url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
          },
        ];
      }

      if (type === "tvshows") {
        config = [
          {
            title: "Trending TV Shows",
            url: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
          },
          {
            title: "Top Rated TV Shows",
            url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
          },
          {
            title: "Airing Today",
            url: `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`,
          },
        ];
      }

      if (type === "mylist") {
        config = [
          {
            title: "Saved Movies ",
            url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
            sectionType: "movie",
          },
          {
            title: "Saved TV Shows",
            url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
            sectionType: "tv",
          },
        ];
      }

      // fetching all sections at once
      const sectionsData = await Promise.all(
        config.map(async (section) => {
          const response = await fetch(section.url);
          const data = await response.json();
          return {
            title: section.title,
            items: data.results.slice(0, 14),
            sectionType: section.sectionType,
          };
        })
      );

      setSections(sectionsData);
    }

    fetchSections();
  }, [type]);

  return (
    <div className="filtered-content">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h2 className="category-title">{section.title}</h2>

          <div className="rows">
            {section.items.slice(0, 7).map((item) => (
              <div key={item.id} className="cards">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  onClick={() =>
                    navigate(
                      `/details/${item.id}?type=${
                        section.sectionType ||
                        (type === "tvshows" ? "tv" : "movie")
                      }`
                    )
                  }
                />
                <FaPlay className="play-icon" />
              </div>
            ))}
          </div>

          <div className="rows">
            {section.items.slice(7, 14).map((item) => (
              <div key={item.id} className="cards">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title}
                  onClick={() =>
                    navigate(
                      `/details/${item.id}?type=${
                        section.sectionType ||
                        (type === "tvshows" ? "tv" : "movie")
                      }`
                    )
                  }
                />
                <FaPlay className="play-icon" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

