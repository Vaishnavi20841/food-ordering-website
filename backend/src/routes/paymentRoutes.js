const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const paymentController = require("../controllers/paymentController");

// Payment route
router.post(
  "/create-order",
  authenticate,
  paymentController.createPaymentOrder
);

module.exports = router;