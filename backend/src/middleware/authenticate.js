const userService = require("../services/user.service");
const { getUserIdFromToken } = require("../Config/jwtProvider");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

   

    const userId = getUserIdFromToken(token);

   

    const user = await userService.findUserById(userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("AUTH ERROR =", error.message);

    return res.status(401).json({
      error: error.message
    });
  }
};

// ✅ CRITICAL FIX (this was missing)
module.exports = authenticate;