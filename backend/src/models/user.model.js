// const mongoose=require('mongoose');


// const UserSchema = new mongoose.Schema({
//     fullName: String,
//     email: String,
//     password: String,
//     role:{
//         type: String,
//         enum:["ROLE_CUSTOMER" , "ROLE_RESTAURANT_OWNER"],
//         default:"ROLE_CUSTOMER",
//     },
//     orders:[       
//          {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "order",
//          }
//     ],
//     favorites:
//         [{ name: String, description: String , images:[String] }],
//     addresses:[
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Address",
//          },
//     ],   
    
// });

// const User = mongoose.model("User" , UserSchema)
// module.exports=User;



const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // 🔐 SECURITY FIX
    password: {
      type: String,
      required: true,
      select: true
    },

    role: {
      type: String,
      enum: ["ROLE_CUSTOMER", "ROLE_RESTAURANT_OWNER"],
      default: "ROLE_CUSTOMER"
    },

    // ✅ FIXED (Order -> Order model name must match)
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
      }
    ],

    // 👍 Better approach (keep simple OR change later)
    favorites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant"
  }
],

    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;