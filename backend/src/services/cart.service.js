const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Food = require("../models/food.model");

module.exports = {

// =====================================
// CREATE CART
// =====================================
async createCart(userId) {
const cart = new Cart({
customer: userId,
items: [],
total: 0,
});

return await cart.save();


},

// =====================================
// FIND USER CART
// =====================================
async findCartByUserId(userId) {
let cart = await Cart.findOne({ customer: userId })
.populate({
path: "items",
populate: [
{
path: "food",
populate: {
path: "restaurant",
},
},
{
path: "ingredients",
},
],
});


if (!cart) {
  cart = await this.createCart(userId);
}

// recalculate total
cart.total = cart.items.reduce(
  (sum, item) => sum + (item.totalPrice || 0),
  0
);

await cart.save();

return cart;


},

// =====================================
// ADD ITEM TO CART
// =====================================
async addItemToCart(req, userId) {
    console.log("SERVICE REQ =", req);
  console.log("USER ID =", userId);

let cart = await Cart.findOne({ customer: userId });


if (!cart) {
  cart = await this.createCart(userId);
}

const food = await Food.findById(req.foodId);

if (!food) {
  throw new Error("Food not found");
}

// Check if same food already exists
const existingItem = await CartItem.findOne({
  cart: cart._id,
  food: food._id,
  userId,
});

if (existingItem) {
  existingItem.quantity += req.quantity || 1;
  existingItem.totalPrice =
    existingItem.quantity * food.price;

  await existingItem.save();
} else {
  const cartItem = new CartItem({
    food: food._id,
    cart: cart._id,
    quantity: req.quantity || 1,
    ingredients: req.ingredients || [],
    userId,
    totalPrice: food.price * (req.quantity || 1),
  });

  const savedCartItem = await cartItem.save();

  cart.items.push(savedCartItem._id);
  await cart.save();
}

return await this.findCartByUserId(userId);


},

// =====================================
// UPDATE QUANTITY
// =====================================
async updateCartItemQuantity(cartItemId, quantity) {
const cartItem = await CartItem.findById(cartItemId)
.populate("food");


if (!cartItem) {
  throw new Error("Cart Item not found");
}

cartItem.quantity = quantity;
cartItem.totalPrice =
  quantity * cartItem.food.price;

await cartItem.save();

return cartItem;


},

// =====================================
// REMOVE ITEM
// =====================================
async removeItemFromCart(cartItemId, user) {
const cart = await Cart.findOne({
customer: user._id,
});


if (!cart) {
  throw new Error("Cart not found");
}

const cartItem = await CartItem.findById(cartItemId);

if (!cartItem) {
  throw new Error("Cart item not found");
}

cart.items = cart.items.filter(
  (id) => id.toString() !== cartItemId.toString()
);

await cart.save();

await CartItem.findByIdAndDelete(cartItemId);

return await this.findCartByUserId(user._id);


},

// =====================================
// CLEAR CART
// =====================================
async clearCart(user) {
const cart = await Cart.findOne({
customer: user._id,
});


if (!cart) {
  throw new Error("Cart not found");
}

await CartItem.deleteMany({
  cart: cart._id,
});

cart.items = [];
cart.total = 0;

await cart.save();

return cart;


},

// =====================================
// CALCULATE TOTAL
// =====================================
async calculateCartTotals(cart) {
let total = 0;

for (const item of cart.items) {
  total += item.totalPrice || 0;
}

return total;

},
};
