const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");
const authenticate = require("../middleware/authenticate");

// ======================
// RESTAURANTS
// ======================

// CREATE
router.post("/", authenticate, restaurantController.createRestaurant);

// GET ALL
router.get("/", restaurantController.getAllRestaurants);

// ⭐ IMPORTANT: PUT SEARCH BEFORE :id
router.get("/search", restaurantController.findRestaurantByName);

// GET BY ID
router.get("/:id", restaurantController.findRestaurantById);

// ======================
// FAVORITES
// ======================
router.post("/:id/favorite", authenticate, restaurantController.addToFavorite);
router.delete("/:id/favorite", authenticate, restaurantController.removeFromFavorite);

module.exports = router;