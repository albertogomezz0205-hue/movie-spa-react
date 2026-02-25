import { useEffect, useRef } from "react";

interface MovieDetail {
  Title: string;
  Genre: string;
  Plot: string;
  Actors: string;
}

interface Props {
  movie: MovieDetail | null;
  onClose: () => void;
}

export const MovieModal = ({ movie, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Enfocar el modal al abrir
  useEffect(() => {
    if (movie && modalRef.current) {
      modalRef.current.focus();
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          style={closeButton}
        >
          ✖
        </button>

        <h2 id="modal-title">{movie.Title}</h2>
        <p><strong>Género:</strong> {movie.Genre}</p>
        <p><strong>Sinopsis:</strong> {movie.Plot}</p>
        <p><strong>Actores:</strong> {movie.Actors}</p>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#1e1e1e",
  color: "white",
  padding: "2rem",
  width: "500px",
  borderRadius: "10px",
  outline: "none",
  position: "relative" as const,
};

const closeButton = {
  position: "absolute" as const,
  top: "1rem",
  right: "1rem",
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "1.2rem",
  cursor: "pointer",
};