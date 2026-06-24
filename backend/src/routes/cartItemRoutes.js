const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const authenticate = require('../middleware/authenticate');

// update cart item quantity
router.put(
  '/update',
  authenticate,
  cartController.updateCartItemQuantity
);

// remove item from cart
router.delete(
  '/:id/remove',
  authenticate,
  cartController.removeItemFromCart
);

module.exports = router;