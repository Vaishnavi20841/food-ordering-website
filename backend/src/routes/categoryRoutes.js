const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const authenticate = require("../middleware/authenticate");

// CREATE CATEGORY
router.post("/", authenticate, categoryController.createCategory);

// GET CATEGORIES BY RESTAURANT ⭐ FIXED PARAM NAME
router.get(
  "/restaurant/:restaurantId",
  authenticate,
  categoryController.getRestaurantCategory
);

module.exports = router;