
const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json()); // modern way

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const homeRoutes = require("./routes/homeRoutes.js");
app.use("/", homeRoutes);

const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoutes.js");
app.use("/api/users", userRoutes);

const restaurantRoutes = require("./routes/restaurantRoutes.js");
app.use("/api/restaurants", restaurantRoutes)

const orderRoutes = require("./routes/orderRoutes.js"); 
app.use("/api/order", orderRoutes)

const adminOrderRoutes = require("./routes/adminOrderRoutes.js");
app.use("/api/admin/order",adminOrderRoutes)


const cartRoutes=require("./routes/cartRoutes.js"); 
app.use("/api/cart",cartRoutes)

const cartItemRoutes=require("./routes/cartItemRoutes.js"); 
app.use("/api/cart-item",cartItemRoutes) 

const adminRestaurantRoutes=require("./routes/adminRestaurantRoutes.js"); 
app.use("/api/admin/restaurants",adminRestaurantRoutes) 

const categoryRoutes=require("./routes/categoryRoutes.js"); 
app.use("/api/category",categoryRoutes)

const adminCategoryRoutes = require("./routes/adminCategoryRoutes.js")
app.use("/api/admin/category",adminCategoryRoutes)

const adminIngredientRoutes = require("./routes/adminIngredientRoutes.js");
app.use('/api/admin/ingredient',adminIngredientRoutes)

const eventRoutes = require("./routes/eventRoutes.js");
app.use('/api/event',eventRoutes)

const adminEventRoutes = require("./routes/adminEventRoutes.js"); 
app.use("/api/admin/event",adminEventRoutes)
     
const foodRoutes = require('./routes/foodRoutes');
app.use('/api/food', foodRoutes);
     
     module.exports = { app };