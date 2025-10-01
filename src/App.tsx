import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Header";
import Gallery from "./Gallery";
import Search from "./Search";
import Detail from "./Detail";
import axios from 'axios';

// movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  popularity: number;
  genre_ids: number[]; 
}

// define return type
interface MovieResponse {
  results: Movie[];
}

interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

function App() {
  const apiKey = "fa7ea1e3cfbbafe4078fee5910dfb90f";

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
  async function fetchMovies() {
    try {
      const allMovies: Movie[] = [];
      const seen = new Set<number>(); 

      for (let page = 1; page <= 10; page++) {
        const response = await axios.get<MovieResponse>(
          `${popularUrl}&page=${page}`
        );

        response.data.results.forEach((movie) => {
          if (!seen.has(movie.id)) {  
            seen.add(movie.id);      
            allMovies.push(movie);    
          }
        });
      }

      setMovies(allMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  fetchMovies();
}, [popularUrl]);

  // fetch genre
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get<GenreResponse>(genreUrl);
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, [genreUrl]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Gallery movies={movies} genres={genres} />} />
        <Route path="/search" element={<Search movies={movies} />} />
        <Route path="/detail/:id" element={<Detail movies={movies} />} />
      </Routes>
    </div>
  );
}

export default App;
