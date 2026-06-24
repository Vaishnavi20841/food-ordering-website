

import React, { useState, useEffect } from "react";
import {
  Divider,
  FormControl,
  RadioGroup,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import MenuCard from "./MenuCard";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getRestaurantById,
  getRestaurantCategory,
} from "../State/Restaurant/Action";

import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const RestaurantDetails = () => {
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  const { id } = useParams();

  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const restaurantState = useSelector(
    (store) => store.restaurant
  );

  const menuState = useSelector(
    (store) => store.menu
  );

  const restaurantData =
    restaurantState?.restaurant;

  // Load restaurant details + categories
  useEffect(() => {
    if (!id || !jwt) return;

    dispatch(
      getRestaurantById({
        restaurantId: id,
        jwt,
      })
    );

    dispatch(
      getRestaurantCategory({
        restaurantId: id,
        jwt,
      })
    );
  }, [dispatch, id, jwt]);

  console.log(
  "restaurantState.categories = ",
  restaurantState.categories
);

  // Load foods according to selected category
 useEffect(() => {
  if (!id || !jwt) return;

  const categoryToSend =
    selectedCategory === "all"
      ? undefined
      : selectedCategory;

  const vegetarian = foodType === "vegetarian";
  const nonveg = foodType === "non_vegetarian";
  const seasonal = foodType === "seasonal";

  dispatch(
    getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      vegetarian,
      nonveg,
      seasonal,
      foodCategory: categoryToSend,
    })
  );
}, [id, jwt, selectedCategory, foodType, dispatch]);

  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
  };




console.log("Selected Category =", selectedCategory);
console.log("Food Type =", foodType);


  if (
    restaurantState?.loading ||
    !restaurantData
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading restaurant...
      </div>
    );
  }

  return (
    <div className="px-5 lg:px-20">
      {/* Restaurant Header */}
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home / Restaurant / Details
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
          <div className="lg:col-span-2">
            <img
              src={
                restaurantData?.images?.[0] ||
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              }
              className="w-full h-[500px] object-cover rounded-2xl"
              alt="restaurant"
            />
          </div>

          <div className="flex flex-col gap-3">
            <img
              src={
                restaurantData?.images?.[1] ||
                "https://images.unsplash.com/photo-1513104890138-7c749659a591"
              }
              className="w-full h-[245px] object-cover rounded-2xl"
              alt="restaurant"
            />

            <img
              src={
                restaurantData?.images?.[2] ||
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
              }
              className="w-full h-[245px] object-cover rounded-2xl"
              alt="restaurant"
            />
          </div>
        </div>

        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restaurantData?.name}
          </h1>

          <p className="text-gray-500 mt-1">
            {restaurantData?.description}
          </p>

          <p className="text-gray-500 flex items-center gap-3 mt-3">
            <LocationOnIcon />
            <span>
              {restaurantData?.address?.city}{" "}
              {restaurantData?.address?.country}
            </span>
          </p>

          <p className="text-gray-500 flex items-center gap-3 mt-3">
            <CalendarTodayIcon />
            <span>
              {restaurantData?.openingHour ||
                "Mon-Sun: 9:00 AM - 9:00 PM"}
            </span>
          </p>
        </div>
      </section>

      <Divider />

      {/* Content */}
      <section className="pt-[2rem] lg:flex relative">
        {/* Sidebar */}
        <div className="space-y-10 lg:w-[20%]">
          <div className="space-y-5 lg:sticky top-28">

            {/* Food Type */}
            <Typography variant="h5">
              Food Type
            </Typography>

            <FormControl>
              <RadioGroup
                value={foodType}
                onChange={handleFoodTypeChange}
              >
                {foodTypes.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider />

            {/* Food Category */}
            <Typography variant="h5">
              Food Category
            </Typography>

            <FormControl>
  <RadioGroup
    value={selectedCategory}
    onChange={(e) => {
      console.log(
        "Clicked Category =",
        e.target.value
      );
      setSelectedCategory(e.target.value);
    }}
  >
    <FormControlLabel
      value="all"
      control={<Radio />}
      label="All"
    />

    {restaurantState?.categories?.map((category) => (
      <FormControlLabel
        key={category._id}
        value={category._id}
        control={<Radio />}
        label={category.name}
      />
    ))}
  </RadioGroup>
</FormControl>
          </div>
        </div>

        {/* Foods */}
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menuState?.menuItems?.length > 0 ? (
  menuState.menuItems.map((food) => (
    <MenuCard key={food._id} item={food} />
  ))
) : (
  <p>No foods available</p>
)}

        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;