import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser } from "../State/Authentication/Action";

const UserProfile = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
  };

  return (
    <div
      className="min-h-[80vh]
      flex flex-col
      justify-center
      items-center"
    >
      <AccountCircleIcon sx={{ fontSize: "9rem" }} />

      <h1 className="text-2xl font-bold mt-4">
        {auth.user?.fullName}
      </h1>

      <p className="text-gray-500">
        {auth.user?.email}
      </p>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: 4 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;