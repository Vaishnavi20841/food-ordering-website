const Food = require("../models/food.model");

// =====================
// CREATE FOOD
// =====================
exports.createItem = async (req, res) => {
  try {
    const food = new Food({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  foodCategory: req.body.foodCategory,
  restaurant:req.body.restaurant || req.body.restaurantId,
  images: req.body.images || [],
  ingredients: req.body.ingredients || [], // ADD THIS LINE
  isVegetarian: req.body.isVegetarian,
  isSeasonal: req.body.isSeasonal,
  available: req.body.available ?? true,
});
    const savedFood = await food.save();
    return res.status(201).json(savedFood);

  } catch (error) {
    console.log("CREATE FOOD ERROR:", error);
    return res.status(500).json({ message: "Failed to create food" });
  }
};

// =====================
// GET FOODS BY RESTAURANT (FIX FOR YOUR 404)
// =====================
exports.getMenuItemsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { vegetarian, nonveg, seasonal, food_category } = req.query;

    let filter = { restaurant: restaurantId };

    // ⭐ CATEGORY FILTER (THIS WAS MISSING)
    if (food_category && food_category !== "all") {
  filter.foodCategory = food_category;
}

    // ⭐ VEG FILTER
    if (vegetarian === "true") {
      filter.isVegetarian = true;
    }

    if (nonveg === "true") {
      filter.isVegetarian = false;
    }

    if (seasonal === "true") {
      filter.isSeasonal = true;
    }

  const foods = await Food.find(filter)
  .populate({
    path: "ingredients",
    populate: {
      path: "category",
      model: "IngredientCategory",
    },
  })
  .populate({
    path: "foodCategory",
    model: "Category",
  });

return res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// =====================
// SEARCH FOOD
// =====================
exports.searchFood = async (req, res) => {
  try {
    const { keyword } = req.query;

    const foods = await Food.find({
      name: { $regex: keyword, $options: "i" },
    });

    return res.status(200).json(foods);

  } catch (error) {
    console.log("SEARCH ERROR:", error);
    return res.status(500).json({ message: "Search failed" });
  }
};

// =====================
// UPDATE AVAILABILITY
// =====================
exports.updateAvailibilityStatus = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    food.available = !food.available;

    await food.save();

    return res.status(200).json(food);

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    return res.status(500).json({ message: "Update failed" });
  }
};