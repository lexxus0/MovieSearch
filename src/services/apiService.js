const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

import axios from "axios";

// trending movies
const optionsTrending = {
  method: "GET",
  url: "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const requestTrendingMovies = async () => {
  const { data } = await axios.request(optionsTrending);
  return data;
};

// full page movie
const optionsFullPage = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie_id?language=en-US",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

export const requestFullPageMovies = async () => {
  const { data } = await axios.request(optionsFullPage);
  return data;
};

// movie by search query
export const requestSearchedMovies = async (searchedValue) => {
  const { data } = await axios.request({
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: {
      query: searchedValue,
      include_adult: true,
      language: "en-US",
      page: 1,
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjU3NDRkMDZmZjk4ZjJjOTgwZDI2ODYyNTE2YzhjMCIsIm5iZiI6MTcyMzQ4NzQ4NS4yOTc1ODQsInN1YiI6IjY2YmE1MjFjNjJiZjY1MmNjZWE5MThhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YdHHUttVcoOQIXZYKfvzCEEqof75s1NxpsY9bY8a2a0",
    },
  });
  return data;
};
