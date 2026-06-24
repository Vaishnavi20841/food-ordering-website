const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },

  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },

  quantity: {
    type: Number,
    default: 1,
  },

  totalPrice: {
    type: Number,
    default: 0,
  },

  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IngredientItem",
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model(
  "CartItem",
  cartItemSchema
);