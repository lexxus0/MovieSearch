const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
import axios from "axios";

const languageMapping = {
  en: "en-US",
  ua: "uk-UA",
};

// trending movies
export const requestTrendingMovies = async (language) => {
  console.log(language);
  const languageCode = languageMapping[language] || "en-US";
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/trending/movie/day?language=${languageCode}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const { data } = await axios.request(options);
  console.log(data);

  return data;
};
// full page movie

export const requestFullPageMovies = async (movieId, language) => {
  const languageCode = languageMapping[language] || "en-US";
  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}?language=${languageCode}`,
    headers: {
      accept: "application.json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};

// movie by search query
export const requestSearchedMovies = async (searchedValue, language) => {
  const languageCode = languageMapping[language] || "en-US";
  const { data } = await axios.request({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: searchedValue,
      include_adult: false,
      language: languageCode,
      page: 1,
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
      accept: "application.json",
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
      accept: "application.json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};
