import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedData);
  }, []);

  const addFavorite = (movie) => {
    const updFavorites = [...favorites, movie];
    setFavorites(updFavorites);
    localStorage.setItem("favorites", JSON.stringify(updFavorites));
  };

  const removeFavorite = (movieId) => {
    const updFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updFavorites);
    localStorage.setItem("favorites", JSON.stringify(updFavorites));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
