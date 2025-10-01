import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
}

interface SearchProps {
  movies: Movie[];
}

function Search({ movies }: SearchProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  // 过滤
  const filtered = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  // 排序
  const sorted = [...filtered].sort((a, b) => {
    if (query.trim()) {
      // 优先以 query 开头的
      const aStarts = a.title.toLowerCase().startsWith(query.toLowerCase());
      const bStarts = b.title.toLowerCase().startsWith(query.toLowerCase());

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
    }

    // 正常排序逻辑
    let comparison = 0;
    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "popularity") {
      comparison = a.popularity - b.popularity;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return (
    <div className="searchPage">
      {/* search bar */}
      <input
        type="text"
        placeholder="Roll the Reel"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* sort */}
      <div className="sortOptions">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Title</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* asc/desc */}
      <div className="orderButtons">
        <button
          className={order === "asc" ? "active" : ""}
          onClick={() => setOrder("asc")}
        >
          Ascending
        </button>
        <button
          className={order === "desc" ? "active" : ""}
          onClick={() => setOrder("desc")}
        >
          Descending
        </button>
      </div>

      {/* search result */}
      <ul className="resultsList">
        {sorted.map((movie, index) => (
          <li
            key={movie.id}
            className="resultItem"
            onClick={() =>
              navigate(`/detail/${movie.id}`, {
                state: { movies: sorted, index }, // return the sorted result
              })
            }
            style={{ cursor: "pointer" }}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div>
              <h3>{movie.title}</h3>
              <p>Popularity: {movie.popularity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
