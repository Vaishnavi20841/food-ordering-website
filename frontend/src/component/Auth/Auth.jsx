import React from "react";
import { Modal, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { style } from "../Cart/Cart";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate("/");
  };

  const open =
    location.pathname === "/account/register" ||
    location.pathname === "/account/login";

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box sx={style}>
        {location.pathname === "/account/register" ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </Box>
    </Modal>
  );
};

export default Auth;