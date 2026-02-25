import { useState } from "react";
import { useMovies } from "./hooks/useMovies";
import { useFavorites } from "./hooks/useFavorites";
import { SearchBar } from "./components/SearchBar";
import { MovieCard } from "./components/MovieCard";
import { MovieModal } from "./components/MovieModal";
import { getMovieById } from "./services/omdbService";
import { sortFavorites, type SortType } from "./utils/sortFavorites";

function App() {
  const { movies, loading, error, search, lastMovieRef } = useMovies();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [sortType, setSortType] = useState<SortType>("DATE");

  const handleMoreInfo = async (id: string) => {
    const data = await getMovieById(id);
    setSelectedMovie(data);
  };

  const sortedFavorites = sortFavorites(favorites, sortType);

  return (
    <div style={styles.container}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <h2>⭐ Favoritos</h2>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value as SortType)}
          style={styles.select}
        >
          <option value="DATE">Fecha</option>
          <option value="AZ">A-Z</option>
        </select>

        {sortedFavorites.length === 0 && (
          <p style={{ opacity: 0.6 }}>No hay favoritos</p>
        )}

        {sortedFavorites.map((fav) => (
          <div key={fav.imdbID} style={styles.favoriteItem}>
            <span>{fav.Title}</span>
            <button onClick={() => removeFavorite(fav.imdbID)}>
              ✖
            </button>
          </div>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h1>🎬 Movie SPA</h1>

        <SearchBar onSearch={search} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && movies.length === 0 && (
          <p style={{ opacity: 0.6 }}>No hay resultados</p>
        )}

        {/* GRID */}
        <div style={styles.grid}>
          {movies.map((movie: any, index: number) => {
            if (movies.length === index + 1) {
              return (
                <div ref={lastMovieRef} key={movie.imdbID}>
                  <MovieCard
                    movie={movie}
                    onMoreInfo={handleMoreInfo}
                    onAddFavorite={addFavorite}
                  />
                </div>
              );
            }

            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onMoreInfo={handleMoreInfo}
                onAddFavorite={addFavorite}
              />
            );
          })}
        </div>

        {/* SKELETON LOADER */}
        {loading && (
          <div style={styles.skeletonContainer}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={styles.skeletonCard} />
            ))}
          </div>
        )}
      </main>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  },

  sidebar: {
    width: "280px",
    padding: "1.5rem",
    backgroundColor: "#1e1e1e",
    borderRight: "1px solid #333",
  },

  main: {
    flex: 1,
    padding: "2rem",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "1rem",
    marginTop: "2rem",
  },

  favoriteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  },

  select: {
    marginBottom: "1rem",
    width: "100%",
  },

  skeletonContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  },

  skeletonCard: {
    width: "180px",
    height: "270px",
    background:
      "linear-gradient(90deg, #1e1e1e 25%, #2a2a2a 50%, #1e1e1e 75%)",
    backgroundSize: "200% 100%",
    animation: "loading 1.5s infinite",
    borderRadius: "8px",
  },
};

export default App;