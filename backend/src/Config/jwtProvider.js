// require('dotenv').config();
// const jwt = require("jsonwebtoken");

// const SECRET_KEY = process.env.JWT_SECRET; // ✅ must match .env

// const generateToken = (userId) => {
//     if (!SECRET_KEY) {
//         throw new Error("JWT_SECRET is missing"); // helpful error
//     }
//     return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
// };

// const getUserIdFromToken = (token) => {
//     return jwt.verify(token, SECRET_KEY).userId;
// };

// module.exports = { generateToken, getUserIdFromToken };

require('dotenv').config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is missing in environment variables");
}

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = { generateToken, getUserIdFromToken };