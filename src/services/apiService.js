import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const API_KEY = import.meta.env.VITE_API_KEY;

const languageMapping = {
  en: "en-US",
  ua: "uk-UA",
};

// trending movies
export const requestTrendingMovies = async (language, page = 1) => {
  const languageCode = languageMapping[language] || "en-US";
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/movie/day?language=${languageCode}&page=${page}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};
// full page movie

export const requestFullPageMovies = async (movieId, language) => {
  const languageCode = languageMapping[language] || "en-US";
  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}?language=${languageCode}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};

// movie by search query
export const requestSearchedMovies = async (searchValue, language, page) => {
  const languageCode = languageMapping[language] || "en-US";
  const { data } = await axios.request({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: searchValue,
      include_adult: false,
      language: languageCode,
      page: page,
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};
//movie cast
export const requestMovieCast = async (movieId, language) => {
  const languageCode = languageMapping[language] || "en-US";

  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    params: { language: languageCode },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};

//movie reviews
export const requestMovieReviews = async (movieId) => {
  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};

//genres
export const requestMoviesByGenres = async (genreId, language, page = 1) => {
  const languageCode = languageMapping[language] || "en-US";

  const { data } = await axios.get(
    "https://api.themoviedb.org/3/discover/movie",
    {
      params: {
        with_genres: genreId,
        page: page,
        language: languageCode,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return data;
};

//list of genres
export const requestGenres = async (language) => {
  const languageCode = languageMapping[language] || "en-US";

  const { data } = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      params: {
        language: languageCode,
      },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return data.genres;
};

//request trailers
export const requestMovieTrailers = async (movieTItle, releaseYear) => {
  const query = `${movieTItle} ${releaseYear} official trailer`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${API_KEY}`;

  const { data } = await axios.get(url);
  return data.items[0];
};
