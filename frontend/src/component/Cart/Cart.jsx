import React, { useEffect, useState } from "react";
import {
  Divider,
  Card,
  Button,
  Box,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";



import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";

import AddressCard from "./AddressCard";
import CartItem from "./CartItem";
import axios from "axios";
import { API_URL } from "../config/api";

import { findCart, clearCartAction } from "../State/Cart/Action";



  const openRazorpay = (
  razorpayOrder,
  deliveryAddress,
  restaurantId,
  token,
  dispatch
) => {
  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: "rzp_test_T56J6OSVGikiwg",
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    order_id: razorpayOrder.id,

    handler: async function (response) {
      try {
        console.log("PAYMENT SUCCESS:", response);

        await axios.post(
          `${API_URL}/api/order`,
          {
            deliveryAddress,
            restaurantId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(clearCartAction());

        alert("Order Placed Successfully ✅");

        window.location.href = "/my-profile/orders";
      } catch (error) {
        console.log("ORDER CREATE ERROR:", error);
        alert("Order Creation Failed");
      }
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const initialValues = {
  streetAddress: "",
  city: "",
  state: "",
  postalCode: "",
};

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((store) => store.cart);

  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  // =========================
  // FETCH ADDRESSES
  // =========================
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const { data } = await axios.get(`${API_URL}/api/users/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(data);
    } catch (error) {
      console.log("Fetch Address Error:", error);
    }
  };

  // =========================
  // INIT CART + ADDRESSES
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(findCart(token));
      fetchAddresses();
    }
  }, [dispatch]);

  // =========================
  // SAVE ADDRESS
  // =========================
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("jwt");

      await axios.post(
        `${API_URL}/api/users/address`,
        {
          fullName: "Customer",
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: "India",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchAddresses();
      resetForm();
      setOpen(false);
    } catch (error) {
      console.log("Save Address Error:", error);
    }
  };

  // =========================
  // CREATE ORDER FLOW
  // =========================
  const createOrderUsingSelectedAddress = async (address) => {
    try {
      if (!cartItems?.length) {
        alert("Cart is empty");
        return;
      }

      const token = localStorage.getItem("jwt");

      const rawRestaurant = cartItems?.[0]?.food?.restaurant;

      const restaurantId =
        typeof rawRestaurant === "object"
          ? rawRestaurant?._id
          : rawRestaurant;

      if (!restaurantId) {
        alert("Restaurant not found");
        return;
      }

      const deliveryAddress = {
        _id: address?._id,
        streetAddress: address?.streetAddress,
        city: address?.city,
        state: address?.state,
        postalCode: address?.postalCode,
        country: address?.country || "India",
      };

      // =========================
      // STEP 1: CREATE DB ORDER
      // =========================
      // await axios.post(
      //   `${API_URL}/api/order`,
      //   { deliveryAddress, restaurantId },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      // =========================
      // STEP 2: CREATE RAZORPAY ORDER
      // =========================
      const { data: razorpayOrder } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: totalPay,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("RAZORPAY ORDER:", razorpayOrder);

      // =========================
      // STEP 3: OPEN PAYMENT
      // =========================
      openRazorpay(
  razorpayOrder,
  deliveryAddress,
  restaurantId,
  token,
  dispatch
);

    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data || error);
      alert("Order Failed");
    }
  };

  // =========================
  // BILL CALCULATION
  // =========================
  const itemTotal =
    cartItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0) || 0;

  const deliveryFee = cartItems?.length ? 21 : 0;
  const gst = cartItems?.length ? Math.round(itemTotal * 0.05) : 0;

  const totalPay = itemTotal + deliveryFee + gst;

  // =========================
  // CLEAR CART
  // =========================
  const handleClearCart = () => {
    dispatch(clearCartAction());
  };

  return (
    <>
      <main className="lg:flex">

        {/* LEFT */}
        <section className="lg:w-[35%] min-h-screen border-r">
          <h1 className="text-2xl font-bold text-center py-6">
            Cart
          </h1>

          {loading ? (
            <p>Loading...</p>
          ) : cartItems?.length ? (
            cartItems.map((item) => (
              <div key={item._id}>
                <CartItem item={item} />
                <Divider />
              </div>
            ))
          ) : (
            <p className="text-center">Cart Empty</p>
          )}

          <Card className="m-4 p-5 rounded-2xl shadow-lg bg-zinc-900">

  <div className="flex items-center gap-2 mb-4">
    <ReceiptLongIcon color="primary" />
    <h2 className="font-bold text-xl">
      Bill Details
    </h2>
  </div>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span>Item Total</span>
      <span>₹{itemTotal}</span>
    </div>

    <div className="flex justify-between">
      <span className="flex items-center gap-1">
        <LocalShippingIcon fontSize="small" />
        Delivery Fee
      </span>
      <span>₹{deliveryFee}</span>
    </div>

    <div className="flex justify-between">
      <span>GST (5%)</span>
      <span>₹{gst}</span>
    </div>

    <Divider />

    <div className="flex justify-between text-lg font-bold">
      <span>Total Pay</span>
      <span className="text-green-500">
        ₹{totalPay}
      </span>
    </div>

  </div>

  <Button
    fullWidth
    color="error"
    variant="outlined"
    sx={{ mt: 3 }}
    onClick={handleClearCart}
  >
    Clear Cart
  </Button>

</Card>
        </section>

        {/* RIGHT */}
        <section className="lg:w-[65%] p-5">
          <h1 className="text-3xl text-center">
            Choose Address
          </h1>

          <div className="flex gap-5 flex-wrap justify-center mt-5">

            {addresses.map((a) => (
              <AddressCard
                key={a._id}
                item={a}
                showButton={true}
                handleSelectAddress={createOrderUsingSelectedAddress}
              />
            ))}

            <Card
  className="
  w-72
  h-64
  flex
  flex-col
  justify-center
  items-center
  cursor-pointer
  hover:scale-105
  transition-all
  duration-300
  border-2
  border-dashed
  border-pink-500
  "
  onClick={() => setOpen(true)}
>

  <AddLocationAltIcon
    sx={{
      fontSize: 60,
      color: "#ec4899",
    }}
  />

  <h2 className="text-xl font-bold mt-3">
    Add New Address
  </h2>

  <p className="text-gray-500 text-center px-4 mt-2">
    Save delivery locations for faster checkout
  </p>

</Card>

          </div>
        </section>
      </main>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Field as={TextField} name="streetAddress" fullWidth label="Street" />
                </Grid>

                <Grid item xs={12}>
                  <Field as={TextField} name="city" fullWidth label="City" />
                </Grid>

                <Grid item xs={12}>
                  <Field as={TextField} name="state" fullWidth label="State" />
                </Grid>

                <Grid item xs={12}>
                  <Field as={TextField} name="postalCode" fullWidth label="Postal Code" />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" fullWidth>
                    Save Address
                  </Button>
                </Grid>

              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;