const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurantController.js');
const authenticate = require('../middleware/authenticate.js');

router.post('/', authenticate, RestaurantController.createRestaurant);

router.delete(
    '/:id',
    authenticate,
    RestaurantController.deleteRestaurantById
);

router.put(
    '/:id/status',
    authenticate,
    RestaurantController.updateRestaurantStatus
);

router.get(
    '/user',
    authenticate,
    RestaurantController.findRestaurantByUserId
);

module.exports = router;