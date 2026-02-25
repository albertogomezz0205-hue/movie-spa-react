import type { FavoriteMovie } from "../hooks/useFavorites";

export type SortType = "AZ" | "DATE";

export const sortFavorites = (
  favorites: FavoriteMovie[],
  type: SortType
): FavoriteMovie[] => {
  const copy = [...favorites];

  switch (type) {
    case "AZ":
      return copy.sort((a, b) =>
        a.Title.localeCompare(b.Title)
      );

    case "DATE":
      return copy.sort(
        (a, b) =>
          new Date(b.addedAt).getTime() -
          new Date(a.addedAt).getTime()
      );

    default:
      return copy;
  }
};