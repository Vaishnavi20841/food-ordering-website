const ingredientService = require("../services/ingredient.service.js");

module.exports = {
  createIngredientCategory: async (req, res) => {
    try {
      const { name, restaurantId } = req.body;

      const items = await ingredientService.createIngredientsCategory(
        name,
        restaurantId
      );

      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  },

  createIngredient: async (req, res) => {
    try {
      const { restaurantId, name, ingredientCategoryId } = req.body;

      const item = await ingredientService.createIngredientItem(
        restaurantId,
        name,
        ingredientCategoryId
      );

      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  },

  updateStoke: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await ingredientService.updateStoke(id);

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  },

  restaurantsIngredient: async (req, res) => {
    try {
      const { id } = req.params;

      const items =
        await ingredientService.findRestaurantsIngredientsCategoryByRestaurantId(id);

      res.status(200).json(items);
    } catch {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  restaurantsIngredientCategory: async (req, res) => {
    try {
      const { id } = req.params;

      const items =
        await ingredientService.findIngredientsCategoryByRestaurantId(id);

      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};