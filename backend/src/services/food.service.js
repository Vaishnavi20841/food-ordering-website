


const Food = require("../models/food.model.js");

module.exports = {

  async createFood(data, restaurant) {
    try {
      const food = new Food({
        foodCategory: data.foodCategory,
        creationDate: new Date(),
        description: data.description,
        images: data.images || [],
        name: data.name,
        price: data.price,
        isSeasonal: data.seasonal,
        isVegetarian: data.vegetarian,
        restaurant: restaurant._id,
        ingredients: data.ingredients || [],
      });

      await food.save();

      restaurant.foods.push(food._id);
      await restaurant.save();


      const populatedFood = await Food.findById(food._id)
      .populate({
        path: "ingredients",
        populate: {
          path: "category",
          select: "name",
        },
      });

      return populatedFood;
    } catch (error) {
      throw new Error(`Failed to create food: ${error.message}`);
    }
  },

  async getRestaurantsFood(
    restaurantId,
    vegetarian,
    nonveg,
    seasonal,
    foodCategory
  ) {
    try {
      let query = { restaurant: restaurantId };

      if (vegetarian === "true") {
        query.isVegetarian = true;
      }

      if (nonveg === "true") {
        query.isVegetarian = false;
      }

      if (seasonal === "true") {
        query.isSeasonal = true;
      }

      if (foodCategory) {
        query.foodCategory = foodCategory;
      }

      const foods = await Food.find(query)
  .populate({
    path: "ingredients",
    populate: {
      path: "category",
      select: "name",
    },
  });

console.log(
  "FOODS AFTER POPULATE =",
  JSON.stringify(foods, null, 2)
);
      return foods;
    } catch (error) {
      throw new Error(`Failed to retrieve restaurant's food: ${error.message}`);
    }
  },

  async searchFood(keyword) {
    try {
      let query = {};

      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: "i" } },
        ];
      }

      return await Food.find(query);
    } catch (error) {
      throw new Error(`Failed to search for food: ${error.message}`);
    }
  },

  async updateAvailibilityStatus(foodId) {
    try {
      const food = await Food.findById(foodId).populate([
        { path: "ingredients", populate: { path: "category", select: "name" } },
        "foodCategory",
        { path: "restaurant", select: "name" },
      ]);

      if (!food) {
        throw new Error(`Food not found with ID ${foodId}`);
      }

      food.available = !food.available;
      await food.save();

      return food;
    } catch (error) {
      throw new Error(
        `Failed to update availability status: ${error.message}`
      );
    }
  },

  async findFoodById(foodId) {
    try {
      const food = await Food.findById(foodId);

      if (!food) {
        throw new Error(`Food not found with ID ${foodId}`);
      }

      return food;
    } catch (error) {
      throw new Error(`Failed to find food: ${error.message}`);
    }
  },
};