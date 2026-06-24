const Razorpay = require("razorpay");

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  console.log("🔍 Razorpay ENV CHECK:", {
    key_id,
    key_secret: key_secret ? "LOADED" : "MISSING"
  });

  if (!key_id || !key_secret) {
    throw new Error("Missing Razorpay env variables");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

module.exports = getRazorpay;