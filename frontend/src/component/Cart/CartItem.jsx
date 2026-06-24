import React from "react";
import { IconButton, Chip } from "@mui/material";

import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { useDispatch } from "react-redux";

import {
  updateCartItem,
  removeCartItem,
  findCart,
} from "../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Increase Quantity
  const handleIncrease = async () => {
    const reqData = {
      jwt: localStorage.getItem("jwt"),
      data: {
        cartItemId: item._id,
        quantity: item.quantity + 1,
      },
    };

    await dispatch(updateCartItem(reqData));

    // Refresh cart
    dispatch(findCart(localStorage.getItem("jwt")));
  };

  // Decrease Quantity
  const handleDecrease = async () => {
    // If quantity is 1 remove item
    if (item.quantity === 1) {
      await dispatch(
        removeCartItem({
          cartItemId: item._id,
          jwt: localStorage.getItem("jwt"),
        })
      );

      dispatch(findCart(localStorage.getItem("jwt")));
      return;
    }

    const reqData = {
      jwt: localStorage.getItem("jwt"),
      data: {
        cartItemId: item._id,
        quantity: item.quantity - 1,
      },
    };

    await dispatch(updateCartItem(reqData));

    // Refresh cart
    dispatch(findCart(localStorage.getItem("jwt")));
  };

 return (
  <div className="px-5 py-5 border-b hover:bg-zinc-900/20 transition-all duration-300">
    <div className="flex items-center gap-5">

      {/* Food Image */}
      <img
        className="
          w-24
          h-24
          object-cover
          rounded-xl
          shadow-md
        "
        src={
          item?.food?.images?.[0] ||
          "https://images.unsplash.com/photo-1513104890138-7c749659a591"
        }
        alt={item?.food?.name}
      />

      {/* Food Details */}
      <div className="flex justify-between items-center w-full">

        <div>

          <h2 className="font-bold text-lg">
            {item?.food?.name}
          </h2>

          <p className="text-pink-500 font-bold text-lg mt-1">
            ₹{item?.totalPrice}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center mt-3 bg-zinc-900 rounded-xl w-fit px-2">

            <IconButton onClick={handleDecrease}>
              <RemoveCircleOutlineOutlinedIcon
                color="error"
              />
            </IconButton>

            <span className="mx-2 font-bold text-lg">
              {item?.quantity}
            </span>

            <IconButton onClick={handleIncrease}>
              <AddCircleOutlineOutlinedIcon
                color="success"
              />
            </IconButton>

          </div>

        </div>

      </div>
    </div>

    {/* Ingredients */}
    <div className="mt-4 flex flex-wrap gap-2">

      {item?.ingredients?.length > 0 ? (
        item.ingredients.map((ingredient, index) => (
          <Chip
            key={index}
            label={ingredient?.name || "Ingredient"}
            size="small"
            color="secondary"
            variant="outlined"
          />
        ))
      ) : (
        <Chip
          label="No Ingredients"
          size="small"
          variant="outlined"
        />
      )}

    </div>
  </div>
);
};

export default CartItem;