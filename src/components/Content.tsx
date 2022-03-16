import { useState, useEffect } from "react";

import { MovieCard } from "./MovieCard";
import { GenreResponseProps } from "../App";
import { api } from "../services/api";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}

export const Content = ({ selectedGenreId, selectedGenre }: ContentProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(({ imdbID, Title, Poster, Runtime, Ratings }) => (
            <MovieCard
              key={imdbID}
              title={Title}
              poster={Poster}
              runtime={Runtime}
              rating={Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
