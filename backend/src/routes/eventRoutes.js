const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// get all events
router.get('/', eventController.findAllEvents);

module.exports = router;

