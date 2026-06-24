const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Restaurant = require("../models/restaurant.model");
const cartService = require("./cart.service");

module.exports = {
  // =========================
  // CREATE ORDER
  // =========================
  async createOrder(orderData, user) {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      const address = orderData.deliveryAddress;
      let savedAddress;

      // =========================
      // ADDRESS HANDLING
      // =========================
      if (address?._id) {
        savedAddress = await Address.findById(address._id);

        if (!savedAddress) {
          throw new Error("Address not found");
        }
      } else {
        savedAddress = await Address.findOne({
          fullName: address.fullName,
          streetAddress: address.streetAddress,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        });

        if (!savedAddress) {
          savedAddress = await Address.create({
            fullName: address.fullName,
            streetAddress: address.streetAddress,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
          });
        }
      }

      // =========================
      // IMPORTANT FIX
      // DO NOT SAVE ADDRESS TO USER HERE
      // Address is already saved by:
      // POST /api/users/address
      // =========================

      // =========================
      // RESTAURANT
      // =========================
      const restaurant = await Restaurant.findById(
        orderData.restaurantId
      );

      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      // =========================
      // CART
      // =========================
      const cart = await cartService.findCartByUserId(user._id);

      if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // =========================
      // ORDER ITEMS
      // =========================
      const orderItems = [];

      for (const item of cart.items) {
        const orderItem = new OrderItem({
          food: item.food,
          ingredients: item.ingredients,
          quantity: item.quantity,
          totalPrice:
            item.quantity * (item.food?.price || 0),
        });

        const savedItem = await orderItem.save();

        orderItems.push(savedItem._id);
      }

      // =========================
      // TOTAL PRICE
      // =========================
      const totalPrice =
        await cartService.calculateCartTotals(cart);

      // =========================
      // CREATE ORDER
      // =========================
      const order = new Order({
        customer: user._id,
        restaurant: restaurant._id,
        deliveryAddress: savedAddress._id,
        items: orderItems,
        totalAmount: totalPrice,
        orderStatus: "PENDING",
        createdAt: new Date(),
      });

      const savedOrder = await order.save();

      // =========================
      // SAVE ORDER IN RESTAURANT
      // =========================
      if (!restaurant.orders) {
        restaurant.orders = [];
      }

      restaurant.orders.push(savedOrder._id);

      await restaurant.save();

      return savedOrder;

    } catch (error) {
      throw new Error(
        `Failed to create order: ${error.message}`
      );
    }
  },

  // =========================
  // CANCEL ORDER
  // =========================
  async cancelOrder(orderId, userId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (
      order.customer.toString() !== userId.toString()
    ) {
      throw new Error(
        "Not authorized to cancel this order"
      );
    }

    if (order.orderStatus !== "PENDING") {
      throw new Error(
        "Order cannot be cancelled at this stage"
      );
    }

    order.orderStatus = "CANCELLED";

    await order.save();

    return order;
  },

  // =========================
  // FIND ORDER BY ID
  // =========================
  async findOrderById(orderId) {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  },

  // =========================
  // USER ORDERS
  // =========================
  async getUserOrder(userId) {
    return await Order.find({
      customer: userId,
    })
      .populate({
        path: "items",
        populate: {
          path: "food",
        },
      })
      .populate("restaurant")
      .populate("deliveryAddress");
  },

  // =========================
  // RESTAURANT ORDERS
  // =========================
  async getOrdersOfRestaurant(
    restaurantId,
    orderStatus
  ) {
    let orders = await Order.find({
      restaurant: restaurantId,
    });

    if (orderStatus) {
      orders = orders.filter(
        (order) =>
          order.orderStatus === orderStatus
      );
    }

    return orders;
  },

  // =========================
  // UPDATE ORDER STATUS
  // =========================
  async updateOrder(orderId, orderStatus) {
    const validStatuses = [
      "PENDING",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(orderStatus)) {
      throw new Error("Invalid order status");
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.orderStatus = orderStatus;

    await order.save();

    return order;
  },
};