import { useState, useEffect } from 'react';
import { API_URL } from '../constants';

function useFetchMovies(searchQuery, sortBy, activeGenre) {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search: searchQuery,
          sortBy: sortBy,
          filter: activeGenre !== 'All' ? activeGenre : '',
          sortOrder: 'asc',
          searchBy: 'title',
        });

        const response = await fetch(`${API_URL}?${params.toString()}`, {
          signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setMovieList(data.data || []);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [searchQuery, sortBy, activeGenre]);

  return { movieList, loading, error };
}

export default useFetchMovies;
