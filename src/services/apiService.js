const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
import axios from "axios";

// trending movies
const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const requestTrendingMovies = async () => {
  const { data } = await axios.request(options);
  return data;
};

// full page movie

export const requestFullPageMovies = async (movieId) => {
  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    headers: {
      accept: "application.json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  return data;
};

// movie by search query
export const requestSearchedMovies = async (searchedValue) => {
  const { data } = await axios.request({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: searchedValue,
      include_adult: false,
      language: "en-US",
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
export const requestMovieCast = async (movieId) => {
  const { data } = await axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
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
