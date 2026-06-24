// const req = require("express/lib/request");
const { generateToken } = require("../Config/jwtProvider");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    const jwt = generateToken(user._id);

    // IMPORTANT: hide password
    user.password = undefined;

    return res.status(201).send({
      jwt,
      message: "register success",
      user,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password required" });
    }

    
    
const user = await userService.getUserByEmail(email);

// 🔥 ADD THIS (STEP 1 DEBUG)
console.log("EMAIL:", email);
console.log("USER FOUND:", user);
console.log("USER PASSWORD:", user?.password);

    // 🔥 IMPORTANT CHECK (prevents crash)
     if (!user || !user.password) {
      return res.status(404).send({ message: "User not found or password missing" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const jwt = generateToken(user._id);

    // hide password before sending response
   user.password = undefined;
    return res.status(200).send({
      jwt,
      message: "login success",
      user,
    });

  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};