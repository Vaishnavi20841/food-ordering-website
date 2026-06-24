const mongoose = require("mongoose");

const RestaurantSchema= new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  cuisineType: String,
  address:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Address",
  },
  contactInformation:{
    phone: String,
    email: String,
  },
  openingHours: String,
  orders: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Order",
    },
  ],
  numRating:Number,
  images: [String],

  registrationDate: {
    type: Date,
    default: Date.now,
  },
  open: {
  type: Boolean,
  default: true,
},
  foods: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
    },
  ],

});

const Restaurant = mongoose.model("Restaurant",RestaurantSchema);
module.exports=Restaurant;