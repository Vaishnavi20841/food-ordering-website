
import './App.css';
import {CssBaseline, ThemeProvider } from '@mui/material';
import {darkTheme} from './Theme/DarkTheme';
import CustomerRoute from './Routers/CustomerRoute';
// import { Navbar } from "../component/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getUser } from "./component/State/Authentication/Action";

function App(){
  const dispatch = useDispatch()
  // const jwt= localStorage.getItem("jwt")
  const auth = useSelector((store) => store.auth);
  

  useEffect(() => {
  const token = auth?.jwt || localStorage.getItem("jwt");

  if (token) {
    dispatch(getUser(token));
  }
}, [auth?.jwt, dispatch]);

console.log("TOKEN =", auth?.jwt || localStorage.getItem("jwt"));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      {/* <Navbar/> */}
       {/* <Home/> */}
       {/* <RestaurantDetails/> */}
       {/* <Cart/> */}
      
      {/* <Profile/> */}
      <CustomerRoute/>
   
    </ThemeProvider>
  );
}





export default App;