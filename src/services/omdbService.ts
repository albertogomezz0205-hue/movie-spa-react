const API_URL = import.meta.env.VITE_OMDB_URL;
const API_KEY = import.meta.env.VITE_OMDB_KEY;

export const searchMovies = async (params: Record<string, string>) => {
  const query = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  });

  const response = await fetch(`${API_URL}?${query}`);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};

export const getMovieById = async (id: string) => {
  const response = await fetch(
    `${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`
  );

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
};