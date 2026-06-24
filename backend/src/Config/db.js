const mongoose = require('mongoose')

const mongodbUrl = process.env.MONGO_URI

async function connectDB() {
    try {
        await mongoose.connect(mongodbUrl)
        console.log("MongoDB connected successfully ✅")
    } catch (error) {
        console.error("MongoDB connection failed ❌", error.message)
        process.exit(1)
    }
}

module.exports = connectDB