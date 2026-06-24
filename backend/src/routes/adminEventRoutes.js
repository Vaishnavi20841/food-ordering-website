const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router.post(
    '/restaurant/:restaurantId',
    eventController.createEvents
);

router.get(
    '/restaurant/:restaurantId',
    eventController.findRestaurantsEvents
);

router.delete(
    '/:id',
    eventController.deleteEvents
);

module.exports = router; // ✅ IMPORTANT (you forgot this)