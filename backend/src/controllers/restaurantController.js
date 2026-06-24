const mongoose = require("mongoose");

const restaurantService = require("../services/restaurant.service");
const userService = require("../services/user.service");

module.exports = {

  // ======================
  // CREATE RESTAURANT
  // ======================
  createRestaurant: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const restaurant = await restaurantService.createRestaurant(
        req.body,
        user
      );

      return res.status(200).json(restaurant);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  // ======================
  // GET ALL RESTAURANTS
  // ======================
  getAllRestaurants: async (req, res) => {
    try {
      const restaurants = await restaurantService.getAllRestaurants();

      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  // ======================
  // GET RESTAURANT BY ID
  // ======================
  findRestaurantById: async (req, res) => {
    try {
      const { id } = req.params;

      console.log("Restaurant ID =", id);

      // ✅ VALIDATION (fixes 400 errors)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid restaurant id format",
        });
      }

      const restaurant = await restaurantService.findRestaurantById(id);

      if (!restaurant) {
        return res.status(404).json({
          message: "Restaurant not found",
        });
      }

      return res.status(200).json(restaurant);
    } catch (error) {
      console.log("ERROR FINDING RESTAURANT:", error);

      return res.status(500).json({
        error: error.message,
      });
    }
  },

  // ======================
  // SEARCH RESTAURANT
  // ======================
  findRestaurantByName: async (req, res) => {
    try {
      const { keyword } = req.query;

      const restaurants = await restaurantService.searchRestaurant(keyword);

      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  // ======================
  // DELETE RESTAURANT
  // ======================
  deleteRestaurantById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid restaurant id",
        });
      }

      await restaurantService.deleteRestaurant(id);

      return res.status(200).json({
        message: "Restaurant deleted successfully",
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  // ======================
  // UPDATE STATUS
  // ======================
  updateRestaurantStatus: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid restaurant id",
        });
      }

      const restaurant = await restaurantService.updateRestaurantStatus(id);

      return res.status(200).json(restaurant);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  // ======================
  // FAVORITES
  // ======================
  addToFavorite: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await restaurantService.addToFavorite(id, req.user);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  },

  removeFromFavorite: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await restaurantService.removeFromFavorite(
        id,
        req.user
      );

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
};