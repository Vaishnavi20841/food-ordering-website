import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { pink } from "@mui/material/colors";
import "./Navbar.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Person from "@mui/icons-material/Person";
import { useSelector } from "react-redux";


export const Navbar = () => {
  const auth = useSelector((store) => store.auth);
  const { cartItems } = useSelector((store) => store.cart);

  
  const navigate = useNavigate();

  // ✅ FIX 1: ADD STATE (IMPORTANT)
  const [query, setQuery] = useState("");

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };

  

  return (
    <Box className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">

      {/* LOGO */}
      <div className="lg:mr-10 cursor-pointer flex items-center">
        <li
          onClick={() => navigate("/")}
          className="logo font-semibold text-gray-300 text-2xl list-none"
        >
          Vynora
        </li>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-2 lg:space-x-10">

        {/* SEARCH */}
        <div className="relative bg-white rounded-md flex items-center">

  <input
    type="text"
    placeholder="Search restaurants..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="outline-none px-3 py-1 w-[200px] pr-8 rounded-md text-black"
  />

  <SearchIcon
    onClick={() => navigate(`/?search=${query}`)}
    className="absolute right-2 text-gray-500 cursor-pointer"
    style={{ fontSize: "18px" }}
  />

</div>

        {/* USER */}
        {auth.user ? (
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              bgcolor: "white",
              color: pink.A400,
              cursor: "pointer",
            }}
          >
            {auth.user?.fullName?.[0]?.toUpperCase()}
          </Avatar>
        ) : (
          <IconButton onClick={() => navigate("/account/login")}>
            <Person />
          </IconButton>
        )}

        {/* CART */}
        <IconButton onClick={() => navigate("/cart")}>
          <Badge color="primary" badgeContent={cartItems?.length || 0}>
            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
          </Badge>
        </IconButton>

      </div>
    </Box>
  );
};

export default Navbar;