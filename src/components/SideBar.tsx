import { useState, useEffect } from "react";

import { Button } from "./Button";

import { GenreResponseProps } from "../App";
import { api } from "../services/api";

interface SideBarProps {
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export const SideBar = ({
  handleClickButton,
  selectedGenreId,
}: SideBarProps) => {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(({ id, title, name }) => (
          <Button
            key={String(id)}
            title={title}
            iconName={name}
            onClick={() => handleClickButton(id)}
            selected={selectedGenreId === id}
          />
        ))}
      </div>
    </nav>
  );
};
