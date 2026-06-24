import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  REMOVE_FROM_FAVORITE_REQUEST,
  REMOVE_FROM_FAVORITE_SUCCESS,
  REMOVE_FROM_FAVORITE_FAILURE,
  LOGOUT,
} from "./ActionType";

import { API_URL } from "../../config/api";

/* ================= REGISTER ================= */
export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signup`,
      reqData.userData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.jwt,
    });

    reqData.navigate("/account/login");
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

/* ================= LOGIN (FIXED NAVIGATION BUG) ================= */
export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_URL}/auth/signin`,
      reqData.userData
    );

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.jwt,
    });

    // ✅ FIXED LOGIC
    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};



export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const token = localStorage.getItem("jwt");

    const { data } = await axios.get(
      `${API_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

/* ================= ADD FAVORITE ================= */
export const addToFavorite = ({ restaurantId }) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });

  try {
    const token = localStorage.getItem("jwt");
    dispatch(getUser(token));

    const { data } = await axios.post(
      `${API_URL}/api/restaurants/${restaurantId}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
  type: ADD_TO_FAVORITE_SUCCESS,
  payload: data,
});

dispatch(getUser());

  } catch (error) {
    dispatch({
      type: ADD_TO_FAVORITE_FAILURE,
      payload: error,
    });
  }
};

/* ================= REMOVE FAVORITE ================= */
export const removeFromFavorite = ({ restaurantId }) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITE_REQUEST });

  try {
    const token = localStorage.getItem("jwt");
    dispatch(getUser(token));

    await axios.delete(
      `${API_URL}/api/restaurants/${restaurantId}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
  type: REMOVE_FROM_FAVORITE_SUCCESS,
  payload: restaurantId,
});

dispatch(getUser());

  } catch (error) {
    dispatch({
      type: REMOVE_FROM_FAVORITE_FAILURE,
      payload: error,
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");

  dispatch({ type: LOGOUT });
};