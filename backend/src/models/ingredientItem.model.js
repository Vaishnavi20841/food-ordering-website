const mongoose = require('mongoose');

// Define the ingredient Schema
const ingredientItemSchema = new mongoose.Schema({
    name: String,
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'IngredientCategory',
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    inStoke:{
        type: Boolean,
        default: true,
    }
});

// Define and export the Ingredient model
const IngredientItem = mongoose.model('IngredientItem', ingredientItemSchema);
module.exports = IngredientItem;