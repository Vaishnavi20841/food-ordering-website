const mongoose = require('mongoose');

//Define the Food Schema
const FoodSchema = new mongoose.Schema({
    name:String,
    description: String,
    price: Number,
    foodCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',

    },
    images: [String],
   available: {
    type: Boolean,
    default: true,
  },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
    },
    isVegetarian: {
    type: Boolean,
    default: false,
  },

  isSeasonal: {
    type: Boolean,
    default: false,
  },


    ingredients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'IngredientItem',

    }],
    creationDate: {
        type: Date,
        default: Date.now,
    },
});

// Define and export the Food model
const Food= mongoose.model('Food', FoodSchema);
module.exports= Food;