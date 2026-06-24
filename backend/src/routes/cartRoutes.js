const express = require('express');
const router = express.Router();
console.log("🔥 CART ROUTES LOADED");

const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

router.put('/add', authenticate, cartController.addItemToCart);
router.get('/', authenticate, cartController.findUserCart);
router.put('/update', authenticate, cartController.updateCartItemQuantity);
router.delete('/:id/remove', authenticate, cartController.removeItemFromCart);
router.put('/clear', authenticate, cartController.clearCart);

module.exports = router;