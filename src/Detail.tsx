import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Detail.css"

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  popularity: number;
}

function Detail({ movies: globalMovies }: { movies: Movie[] }) {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { movies?: Movie[]; index?: number };

  // 使用 state.movies（搜索或过滤后的列表），否则 fallback 到全局
  const movieList = state?.movies ?? globalMovies;
  const currentIndex =
    state?.index !== undefined
      ? state.index
      : movieList.findIndex((m) => m.id === Number(id));

  const movie = movieList[currentIndex];

  if (!movie) return <div>Movie not found</div>;

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/detail/${movieList[currentIndex - 1].id}`, {
        state: { movies: movieList, index: currentIndex - 1 },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < movieList.length - 1) {
      navigate(`/detail/${movieList[currentIndex + 1].id}`, {
        state: { movies: movieList, index: currentIndex + 1 },
      });
    }
  };

  return (
    <div className="detailPage">
      {/* 背景图 */}
      <div
        className="detailBackdrop"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/* 前景内容 */}
      <div className="detailContent">
        <h1 className="detailTitle">{movie.title}</h1>
        <div className="detailMeta">
          <span>Release: {movie.release_date}</span>
          <span>Rating: {movie.vote_average}</span><br />
          <span>Popularity: {movie.popularity}</span>
        </div>
        <p className="detailOverview">{movie.overview}</p>

        <div className="navButtons">
          <button onClick={handlePrev} disabled={currentIndex === 0}>
             <button>{FaArrowLeft({})}</button>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === movieList.length - 1}
          >
            <button>{FaArrowRight({})}</button>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
