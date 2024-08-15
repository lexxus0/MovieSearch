import { useState, useEffect } from "react";
import SearchMovie from "../../components/SearchMovie/SearchMovie";
import MovieList from "../../components/MovieList/MovieList";
import GenreSelector from "../../components/GenreSelector/GenreSelector";
import {
  requestMoviesByGenres,
  requestGenres,
} from "../../services/apiService";
import { useLanguage } from "../../context/LanguageContext";

const MoviesPage = ({ onSearch, filteredMovies, setFilteredMovies }) => {
  const [genredMovies, setGenredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("-");
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { language } = useLanguage();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreData = await requestGenres(language);
        setGenres(genreData);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      }
    };

    fetchGenres();
  }, [language]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (selectedGenre === "-") return;

      setIsLoading(true);
      try {
        const moviesData = await requestMoviesByGenres(
          searchQuery,
          selectedGenre,
          language,
          page
        );
        setGenredMovies((prevMovies) => [...moviesData.results]);
        setTotalPages(moviesData.total_pages);
        setHasMore(page < moviesData.total_pages);
        setFilteredMovies([]);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, page, language]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setGenredMovies([]);
    setPage(1);
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <SearchMovie onSearch={onSearch} />
      <GenreSelector
        genres={genres}
        selectedGenre={selectedGenre}
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
