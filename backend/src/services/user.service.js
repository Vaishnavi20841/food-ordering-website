const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { getUserIdFromToken } = require("../Config/jwtProvider");

module.exports = {

  // =========================
  // CREATE USER
  // =========================
  async createUser(userData) {
    try {
      const { fullName, email, password, role } = userData;

      const isUserExist = await User.findOne({ email });

      if (isUserExist) {
        throw new Error("User already exists with email");
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
      });

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // =========================
  // GET USER BY EMAIL
  // =========================
  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("User not found");
      }

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // =========================
  // FIND USER BY ID
  // =========================
  async findUserById(userId) {
    try {
      const user = await User.findById(userId)
        .populate({
          path: "favorites",
          populate: [
            { path: "address" },
            { path: "owner" },
          ],
        })
        .populate("addresses");

      if (!user) {
        throw new Error(`User not found with id - ${userId}`);
      }

      // Remove duplicate addresses before returning
      if (user.addresses?.length) {
        user.addresses = Array.from(
          new Map(
            user.addresses.map((address) => [
              address._id.toString(),
              address,
            ])
          ).values()
        );
      }

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // =========================
  // USER PROFILE FROM JWT
  // =========================
  async findUserProfileByJwt(jwt) {
    try {
      const userId = getUserIdFromToken(jwt);

      const user = await this.findUserById(userId);

      return user;

    } catch (error) {
      throw new Error(error.message);
    }
  },

  // =========================
  // ALL USERS
  // =========================
  async findAllUsers() {
    try {
      const users = await User.find();

      return users;

    } catch (error) {
      throw new Error(error.message);
    }
  },
};