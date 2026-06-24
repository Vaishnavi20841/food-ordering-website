// const express = require('express');
// const router = express.Router();
// const categoryController = require('../controllers/categoryController.js');
// // const authenticate= require('../middleware/authenticate.js');

// router.post('',authenticate , categoryController.createCategory);
// router.get('/category/restaurant/:id',authenticate, categoryController.getRestaurantsCategory);

// module.export = router;


const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');
const authenticate = require('../middleware/authenticate');

// Create category
router.post('/', authenticate, categoryController.createCategory);

// Get categories by restaurant
router.get('/restaurant/:id', authenticate, categoryController.getRestaurantCategory);

module.exports = router;