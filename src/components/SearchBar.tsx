import { useState } from "react";

interface Props {
  onSearch: (params: Record<string, string>) => void;
}

export const SearchBar = ({ onSearch }: Props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const params: Record<string, string> = {
      s: title.trim(),
    };

    if (type) params.type = type;
    if (year) params.y = year;

    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Buscar película..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={styles.select}
      >
        <option value="">Todos</option>
        <option value="movie">Película</option>
        <option value="series">Serie</option>
        <option value="episode">Episodio</option>
      </select>

      <input
        type="number"
        placeholder="Año"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>
        Buscar
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap" as const,
    marginTop: "1rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1e1e1e",
    color: "white",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#1e1e1e",
    color: "white",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    background: "#ff4c4c",
    color: "white",
    cursor: "pointer",
  },
};