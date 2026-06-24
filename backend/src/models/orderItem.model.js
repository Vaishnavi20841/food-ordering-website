const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: Number,
  ingredients: [String],
  totalPrice: Number,
});

// ✅ SAFE MODEL CREATION (IMPORTANT FIX)
const OrderItem =
  mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema);

module.exports = OrderItem;