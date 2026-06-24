import { api } from "../../config/api";
import * as actionTypes from "./ActionType";

// ======================
// CREATE ORDER
// ======================
export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_ORDER_REQUEST });

    try {
      const { data } = await api.post(
        "/api/order",
        reqData.order,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.CREATE_ORDER_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ORDER_FAILURE,
        payload: error.response?.data?.error || error.message,
      });

      throw error;
    }
  };
};

// ======================
// CANCEL ORDER (FIXED)
// ======================
export const cancelOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CANCEL_ORDER_REQUEST });

    try {
      const { data } = await api.patch(
        `/api/order/${reqData.orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.CANCEL_ORDER_SUCCESS,
        payload: data.order, // backend: { message, order }
      });

      return data.order; // IMPORTANT for .then()
    } catch (error) {
      dispatch({
        type: actionTypes.CANCEL_ORDER_FAILURE,
        payload: error.response?.data?.error || error.message,
      });

      throw error;
    }
  };
};

// ======================
// GET USER ORDERS
// ======================
export const getUsersOrders = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.GET_USERS_ORDER_REQUEST });

    try {
      const { data } = await api.get("/api/order/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      dispatch({
        type: actionTypes.GET_USERS_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_USERS_ORDER_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };
};