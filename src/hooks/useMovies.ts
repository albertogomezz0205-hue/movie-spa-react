import { useState, useRef, useCallback } from "react";
import { searchMovies } from "../services/omdbService";

export const useMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState<Record<string, string>>({});

  const observer = useRef<IntersectionObserver | null>(null);

  const search = async (params: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = {
        ...params,
        page: "1",
      };

      const data = await searchMovies(queryParams);

      setMovies(data.Search || []);
      setTotalResults(Number(data.totalResults));
      setPage(1);
      setCurrentQuery(params);
    } catch (err: any) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading) return;
    if (page * 10 >= totalResults) return;

    const nextPage = page + 1;

    try {
      setLoading(true);

      const data = await searchMovies({
        ...currentQuery,
        page: nextPage.toString(),
      });

      setMovies((prev) => [...prev, ...(data.Search || [])]);
      setPage(nextPage);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const lastMovieRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalResults]
  );

  return {
    movies,
    loading,
    error,
    search,
    lastMovieRef,
  };
};