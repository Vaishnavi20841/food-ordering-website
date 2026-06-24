import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../State/Authentication/Action";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "ROLE_CUSTOMER",
};

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Too short")
    .required("Full Name is required"),

  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  role: Yup.string().required("Role is required"),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Register Data:", values);

    dispatch(
      registerUser({
        userData: values,
        navigate,
      })
    );
  };

  return (
    <div>
      <Typography variant="h5" align="center">
        Register
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="fullName"
              label="Full Name"
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              error={
                touched.confirmPassword &&
                Boolean(errors.confirmPassword)
              }
              helperText={
                touched.confirmPassword &&
                errors.confirmPassword
              }
            />

            <Field
              as={TextField}
              select
              fullWidth
              margin="normal"
              name="role"
              label="Select Role"
            >
              <MenuItem value="ROLE_CUSTOMER">
                Customer
              </MenuItem>

              <MenuItem value="ROLE_RESTAURANT_OWNER">
                Restaurant Owner
              </MenuItem>
            </Field>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Register
            </Button>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?
              <Button
                onClick={() =>
                  navigate("/account/login")
                }
              >
                Login
              </Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;