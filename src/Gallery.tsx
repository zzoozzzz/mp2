import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
}

interface GalleryProps {
  movies: Movie[];
  genres: { id: number; name: string }[];
}

function Gallery({ movies, genres }: GalleryProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const navigate = useNavigate();

  // add/remove the tag
  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  // filter by genre
  const filteredMovies =
    selectedGenres.length === 0
      ? movies
      : movies.filter((movie) =>
          selectedGenres.every((g) => movie.genre_ids.includes(g))
        );

  return (
    <div className="galleryPage">
      {/* genre tag*/}
      <div className="genreTags">
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`tag ${selectedGenres.includes(genre.id) ? "active" : ""}`}
            onClick={() => toggleGenre(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      
      <div className="App">
        {filteredMovies.map((movie, index) => (
          <div
            key={movie.id}
            className="movieContainer"
            onClick={() =>
              navigate(`/detail/${movie.id}`, {
                state: { movies: filteredMovies, index }, // return with filtered result
              })
            }
            style={{ cursor: "pointer" }}
          >
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
