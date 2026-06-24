const express = require("express");
const router = express.Router();

const foodController = require("../controllers/foodController");
const authenticate = require("../middleware/authenticate");

// CREATE FOOD
router.post("/", authenticate, foodController.createItem);

// GET FOODS BY RESTAURANT
router.get(
  "/restaurant/:restaurantId",
  foodController.getMenuItemsByRestaurantId
);

// SEARCH FOOD
router.get("/search", foodController.searchFood);

// UPDATE AVAILABILITY
router.put("/availability/:id", foodController.updateAvailibilityStatus);

module.exports = router;