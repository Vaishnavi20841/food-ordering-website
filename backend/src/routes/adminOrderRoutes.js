const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const orderController = require("../controllers/orderController");

// -------------------------
// CANCEL ORDER (USER)
// -------------------------
router.patch(
  '/:orderId/cancel',
  authenticate,
  orderController.cancelOrder
);

// -------------------------
// GET RESTAURANT ORDERS
// -------------------------
router.get(
  '/restaurant/:restaurantId',
  authenticate,
  orderController.getAllRestaurantOrder
);

// -------------------------
// UPDATE ORDER STATUS
// -------------------------
router.put(
  '/:orderId/:orderStatus',
  authenticate,
  orderController.updateOrder
);

module.exports = router;