import React from "react";
import Navbar from "../component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import RestaurantDetails from "../component/Restaurant/RestaurantDetails";
import Cart from "../component/Cart/Cart";
import Profile from "../component/Profile/Profile";
import Auth from "../component/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account/login" element={<Auth />} />

        <Route path="/account/register" element={<Auth />} />

        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/my-profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default CustomerRoute;