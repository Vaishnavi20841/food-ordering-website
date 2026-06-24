const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authenticate');

// CREATE ORDER
router.post('/', authenticate, orderController.createOrder);

// GET USER ORDERS
router.get('/user', authenticate, orderController.getAllUserorders);

// -------------------------
// CANCEL ORDER (NEW)
// -------------------------
router.patch('/:orderId/cancel', authenticate, orderController.cancelOrder);

module.exports = router;