import axios from "axios";

export const API_URL = "https://food-ordering-website-m6qv.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
});

// console.log("API FILE LOADED");
// console.log("API_URL =", API_URL);