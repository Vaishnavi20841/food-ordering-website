const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticate = require("../middleware/authenticate");

router.get(
  "/profile",
  authenticate,
  userController.getUserProfileHandler
);

router.post(
  "/address",
  authenticate,
  userController.addAddress
);

router.get(
  "/address",
  authenticate,
  userController.getUserAddresses
);

module.exports = router;