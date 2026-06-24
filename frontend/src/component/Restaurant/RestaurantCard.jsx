
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Chip, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

import {
  addToFavorite,
  removeFromFavorite,
} from "../State/Authentication/Action";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  // ✅ SAFE FAVORITES STATE
  const favorites = useSelector((state) =>
    Array.isArray(state.auth?.favorites) ? state.auth.favorites : []
  );

  // ✅ SAFE ID CHECK (handles _id or id)
  const restaurantId = restaurant?._id || restaurant?.id;

  // ✅ FAVORITE CHECK (robust)
  const isFav = favorites.some(
    (item) =>
      item &&
      (item._id === restaurantId || item.id === restaurantId)
  );

  // ✅ NAVIGATION (FIXED ROUTE)
  const handleNavigateToRestaurant = () => {
    if (!restaurantId) return;
    navigate(`/restaurant/${restaurantId}`);
  };

  // ✅ FAVORITE HANDLER (SAFE)
  const handleFavoriteClick = () => {
    if (!restaurantId) {
      console.warn("Missing restaurantId", restaurant);
      return;
    }

    if (!jwt) {
      navigate("/login");
      return;
    }

    if (isFav) {
      dispatch(removeFromFavorite({ jwt, restaurantId }));
    } else {
      dispatch(addToFavorite({ jwt, restaurantId }));
    }
  };

  // ✅ PREVENT CRASH IF DATA NOT READY
  if (!restaurant) return null;

  return (
    <Card className="w-[18rem]">
      <div
        className={`${
          restaurant?.open ? "cursor-pointer" : "cursor-not-allowed"
        } relative`}
      >
        {/* IMAGE */}
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={
            restaurant?.images?.[0] ||
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
          }
          alt={restaurant?.name || "restaurant"}
        />

        {/* OPEN / CLOSED BADGE */}
        <Chip
          size="small"
          className="absolute top-2 left-2"
          color={restaurant?.open ? "success" : "error"}
          label={restaurant?.open ? "Open" : "Closed"}
        />

        {/* CONTENT */}
        <div className="p-4 lg:flex w-full justify-between">
          <div className="space-y-1">
            <p
              onClick={handleNavigateToRestaurant}
              className="font-semibold text-lg cursor-pointer"
            >
              {restaurant?.name}
            </p>

            <p className="text-gray-500 text-sm">
              {restaurant?.description}
            </p>

            <p className="text-gray-500 text-sm">
              {restaurant?.cuisineType}
            </p>
          </div>

          {/* FAVORITE BUTTON */}
          <div>
            <IconButton onClick={handleFavoriteClick}>
              {isFav ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;