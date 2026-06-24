const User = require("../models/user.model");
const Address = require("../models/address.model");

// =========================
// GET USER PROFILE
// =========================
const getUserProfileHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized user",
      });
    }

    // convert mongoose document safely
    const safeUser = user.toObject ? user.toObject() : { ...user };

    delete safeUser.password;

    return res.status(200).json(safeUser);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// ADD ADDRESS
// =========================
const addAddress = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized user",
      });
    }

    const {
      fullName,
      streetAddress,
      city,
      state,
      postalCode,
      country,
    } = req.body;

    // validate required fields (important fix)
    if (!fullName || !streetAddress || !city || !state || !postalCode || !country) {
      return res.status(400).json({
        error: "All address fields are required",
      });
    }

    // create address
    const savedAddress = await Address.create({
      fullName,
      streetAddress,
      city,
      state,
      postalCode,
      country,
    });

    // ensure addresses array exists
    if (!user.addresses) {
      user.addresses = [];
    }

    // prevent duplicates
    const exists = user.addresses.some(
      (id) => id.toString() === savedAddress._id.toString()
    );

    if (!exists) {
      user.addresses.push(savedAddress._id);
      await user.save();
    }

    return res.status(201).json(savedAddress);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// =========================
// GET USER ADDRESSES
// =========================
const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("addresses");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // remove duplicates safely
    const uniqueAddresses = Array.from(
      new Map(
        (user.addresses || []).map((address) => [
          address._id.toString(),
          address,
        ])
      ).values()
    );

    return res.status(200).json(uniqueAddresses);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getUserProfileHandler,
  addAddress,
  getUserAddresses,
};