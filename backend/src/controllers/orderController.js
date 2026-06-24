const orderService = require("../services/order.service.js");

module.exports = {

  // -------------------------
  // CREATE ORDER
  // -------------------------
  createOrder: async (req, res) => {
    try {
      const orderData = req.body;
      const user = req.user;

      if (!orderData) {
        return res.status(400).json({
          error: "Please provide valid request body",
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized user",
        });
      }

      const savedOrder = await orderService.createOrder(orderData, user);

      return res.status(200).json(savedOrder);

    } catch (error) {
      return res.status(400).json({
        error: error.message || "Failed to create order",
      });
    }
  },

  // -------------------------
  // GET USER ORDERS
  // -------------------------
  getAllUserorders: async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          error: "Unauthorized user",
        });
      }

      const orders = await orderService.getUserOrder(user._id);

      return res.status(200).json(orders);

    } catch (error) {
      return res.status(400).json({
        error: error.message || "Failed to fetch orders",
      });
    }
  },

  // -------------------------
  // CANCEL ORDER (FIXED)
  // -------------------------
  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const user = req.user;

      if (!orderId) {
        return res.status(400).json({
          error: "Order ID is required",
        });
      }

      const cancelledOrder = await orderService.cancelOrder(
        orderId,
        user._id
      );

      return res.status(200).json({
        message: "Order cancelled successfully",
        order: cancelledOrder,
      });

    } catch (error) {
      return res.status(400).json({
        error: error.message || "Failed to cancel order",
      });
    }
  },

  // -------------------------
  // GET RESTAURANT ORDERS
  // -------------------------
  getAllRestaurantOrder: async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { order_status } = req.query;

      if (!restaurantId) {
        return res.status(400).json({
          error: "Restaurant ID is required",
        });
      }

      const orders = await orderService.getOrdersOfRestaurant(
        restaurantId,
        order_status
      );

      return res.status(200).json(orders);

    } catch (error) {
      return res.status(400).json({
        error: error.message || "Failed to fetch restaurant orders",
      });
    }
  },

  // -------------------------
  // UPDATE ORDER STATUS
  // -------------------------
  updateOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.body;

      if (!orderId) {
        return res.status(400).json({
          error: "Order ID is required",
        });
      }

      if (!orderStatus) {
        return res.status(400).json({
          error: "Order status is required",
        });
      }

      const updatedOrder = await orderService.updateOrder(
        orderId,
        orderStatus
      );

      return res.status(200).json(updatedOrder);

    } catch (error) {
      return res.status(400).json({
        error: error.message || "Failed to update order",
      });
    }
  },
};