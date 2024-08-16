import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import MovieList from "../../components/MovieList/MovieList";
import GenreSelector from "../../components/GenreSelector/GenreSelector";
import {
  requestMoviesByGenres,
  requestGenres,
  requestSearchedMovies,
} from "../../services/apiService";
import { useLanguage } from "../../context/LanguageContext";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genredMovies, setGenredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();

  const query = searchParams.get("query") || "";
  const genreId = searchParams.get("genre") || "-";
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (query) {
        setIsLoading(true);
        try {
          setFilteredMovies([]);
          const data = await requestSearchedMovies(query, language, page);
          setFilteredMovies((prevMovies) =>
            page === 1 ? data.results : [...prevMovies, ...data.results]
          );
          setHasMore(page < data.total_pages);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSearchedMovies();
  }, [query, language, page]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (genreId !== "-") {
        setIsLoading(true);
        try {
          setGenredMovies([]);
          const data = await requestMoviesByGenres(genreId, language, page);
          setGenredMovies((prevMovies) =>
            page === 1 ? data.results : [...prevMovies, ...data.results]
          );
          setHasMore(page < data.total_pages);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMoviesByGenre();
  }, [genreId, language, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await requestGenres(language);
        setGenres(genreData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, [language]);

  const onSearch = (searchedValue) => {
    setSearchParams({ query: searchedValue, page: 1 });
    setFilteredMovies([]);
    setGenredMovies([]);
  };

  const handleGenreChange = (genreId) => {
    setSearchParams({ genre: genreId, page: 1 });
    setGenredMovies([]);
    setFilteredMovies([]);
  };

  const loadMoreMovies = () => {
    setSearchParams((prev) => ({ ...prev, page: Number(page) + 1 }));
  };

  return (
    <>
      <SearchMovie onSearch={onSearch} />
      <GenreSelector
        genres={genres}
        selectedGenre={genreId}
        onGenreChange={handleGenreChange}
      />
      <MovieList
        filteredMovies={filteredMovies}
        genredMovies={genredMovies}
        loadMoreMovies={loadMoreMovies}
        isLoadingMore={isLoading}
        hasMore={hasMore}
      />
    </>
  );
};

export default MoviesPage;
