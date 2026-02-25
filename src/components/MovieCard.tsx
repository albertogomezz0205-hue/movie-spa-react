interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface Props {
  movie: Movie;
  onMoreInfo: (id: string) => void;
  onAddFavorite: (movie: Movie) => void;
}

export const MovieCard = ({
  movie,
  onMoreInfo,
  onAddFavorite,
}: Props) => {
  return (
    <div style={styles.card}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title}
        style={styles.image}
      />

      <div style={styles.content}>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>

        <button onClick={() => onMoreInfo(movie.imdbID)}>
          Más info
        </button>

        <button onClick={() => onAddFavorite(movie)}>
          ⭐ Favorito
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "220px",
    background: "#1e1e1e",
    color: "white",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover" as const,
  },
  content: {
    padding: "1rem",
  },
};