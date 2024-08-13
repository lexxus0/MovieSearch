import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import css from "./StarRating.module.css";
import { useState } from "react";

const getStarRating = (rating) => {
  const totalStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;
  return { totalStars, hasHalfStar };
};

const StarRating = ({ rating }) => {
  const { totalStars, hasHalfStar } = getStarRating(rating);

  return (
    <div className={css.container}>
      <div className={css.stars}>
        {Array.from({ length: 5 }, (_, index) => {
          if (index < totalStars) {
            return <FaStar key={index} color="#FFD700" />;
          }
          if (index === totalStars && hasHalfStar) {
            return <FaStarHalfAlt key={index} color="#FFD700" />;
          }
          return <FaRegStar key={index} color="#FFD700" />;
        })}
      </div>
    </div>
  );
};

export default StarRating;
