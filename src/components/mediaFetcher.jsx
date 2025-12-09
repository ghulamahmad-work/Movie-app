import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../pages/dashboard.css"; // use your existing styles

const API_KEY = "661300719f6661404058437a8a29ac1c";
// Passing props
export default function MediaFetcher({
  title,
  type,
  endpoint,
  rows = 2,
  limit = 14,
}) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
// Fetching API at once
  useEffect(() => {
    async function fetchItems() {
        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setItems(data.results.slice(0, limit));
     
    }

    fetchItems();
  }, [endpoint, limit]);
// Setting 7 items per row 
const itemsPerRow = Math.ceil(items.length / rows);
const rowArrays = [];
for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
  const startIndex = rowIndex * itemsPerRow;
  const endIndex = startIndex + itemsPerRow
  const rowItems = items.slice(startIndex, endIndex);
  rowArrays.push(rowItems);
}

  return (
    <div className="media-section">
      <h2 className="category-title">{title}</h2>
      {rowArrays.map((rowItems, index) => (
        <div className="rows" key={index}>
          {rowItems.map((item) => (
            <div className="cards" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                onClick={() =>
                  navigate(`/details/${item.id}?type=${type || "movie"}`)
                }
              />
              <FaPlay className="play-icon" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
