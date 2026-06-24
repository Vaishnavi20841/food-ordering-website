const getRazorpay = require("../config/razorpay");

const createPaymentOrder = async (req, res) => {
  try {
    const razorpay = getRazorpay(); // ONLY HERE

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createPaymentOrder };