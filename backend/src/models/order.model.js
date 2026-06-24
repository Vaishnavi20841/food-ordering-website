const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },

  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],

  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  orderStatus: {
  type: String,
  enum: [
    "PENDING",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "COMPLETED",
    "CANCELLED"
  ],
  default: "PENDING",
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

module.exports = Order;