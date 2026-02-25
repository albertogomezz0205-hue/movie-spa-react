import { useEffect, useState } from "react";

export interface FavoriteMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  addedAt: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: any) => {
    const exists = favorites.some(f => f.imdbID === movie.imdbID);
    if (exists) return;

    setFavorites([
      ...favorites,
      { ...movie, addedAt: new Date().toISOString() }
    ]);
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.imdbID !== id));
  };

  return { favorites, addFavorite, removeFavorite };
};