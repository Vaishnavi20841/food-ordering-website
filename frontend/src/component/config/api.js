import axios from "axios";

export const API_URL = "http://localhost:5454";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    
  },
});

// console.log("API FILE LOADED");
// console.log("API_URL =", API_URL);