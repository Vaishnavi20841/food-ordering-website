import React from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "../Restaurant/RestaurantCard";

const Favorites = () => {
  const favorites = useSelector(
    (state) => state.auth.favorites || []
  );

  console.log("favorites =", favorites);
console.log("first favorite =", favorites[0]);
console.log("type =", typeof favorites[0]);

  if (!favorites.length) {
    return (
      <div className="text-center mt-10">
        No favorites yet
      </div>
    );
  }

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">
        My Favorites
      </h1>

      <div className="flex flex-wrap gap-3 justify-center">
  {favorites.map((restaurant, index) => (
    <RestaurantCard
      key={restaurant?._id || restaurant || index}
      restaurant={restaurant}
    />
  ))}
</div>
    </div>
  );
};

export default Favorites;