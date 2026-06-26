const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const connectDB = require("./Config/db.js");

const app = express();

// =====================
// CORS
// =====================
const allowedOrigins = [
  "http://localhost:3000",
  "https://food-ordering-website-gob3.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// =====================
// BODY PARSER
// =====================
app.use(express.json());

// =====================
// STATIC FILES
// =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =====================
// DEBUG (optional)
// =====================
console.log("ENV LOADED ✔");

// =====================
// MODELS (ensure schemas are registered)
// =====================
require("./models/restaurant.model");
require("./models/address.model");
require("./models/food.model");
require("./models/category.model");
require("./models/order.model");
require("./models/ingredientItem.model");
require("./models/ingredientCategory.model");

// =====================
// ROUTES IMPORTS
// =====================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const adminIngredientRoutes = require("./routes/adminIngredientRoutes");
const adminCategoryRoutes = require("./routes/adminCategoryRoutes");
// =====================
// ROUTES MOUNTING (IMPORTANT FIX)
// =====================

// AUTH
app.use("/auth", authRoutes);

// USERS
app.use("/api/users", userRoutes);

// RESTAURANTS ⭐ FIX FOR /api/restaurants 404
app.use("/api/restaurants", restaurantRoutes);

// CATEGORY ⭐ FIX FOR /api/category
app.use("/api/category", categoryRoutes);

// FOOD ⭐ FIX FOR /api/food
app.use("/api/food", foodRoutes);

// ORDER ⭐ needed for checkout
app.use("/api/order", orderRoutes);

app.use("/api/cart", cartRoutes);

// PAYMENT
app.use("/api/payment", paymentRoutes);

app.use('/api/admin/ingredient', adminIngredientRoutes);

app.use('/api/admin/category', adminCategoryRoutes);

// =====================
// SERVER START
// =====================
const PORT = process.env.PORT || 5454;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.log("DB connection error:", error);
  }
});