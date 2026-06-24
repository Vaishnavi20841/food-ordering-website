import { api } from "../../config/api";
import * as actionTypes from "./ActionType";

// ======================
// FIND CART
// ======================
export const findCart = (token) => async (dispatch) => {
  dispatch({
    type: actionTypes.FIND_CART_REQUEST,
  });

  try {
    const { data } = await api.get("/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: actionTypes.FIND_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.FIND_CART_FAILURE,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// ======================
// GET ALL CART ITEMS
// ======================
export const getAllCartItems =
  (token) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_CART_ITEMS_REQUEST,
    });

    try {
      const { data } = await api.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: actionTypes.GET_ALL_CART_ITEMS_SUCCESS,
        payload: data.items,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_CART_ITEMS_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

// ======================
// ADD ITEM TO CART
// ======================
export const addItemsToCart =
  (reqData) => async (dispatch) => {
    dispatch({
      type: actionTypes.ADD_ITEMS_TO_CART_REQUEST,
    });

    try {
      const { data } = await api.put(
        "/api/cart/add",
        reqData.cartItem,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );

      dispatch({
        type: actionTypes.ADD_ITEMS_TO_CART_SUCCESS,
        payload: data,
      });

      // Refresh cart
      dispatch(findCart(reqData.token));

    } catch (error) {
      dispatch({
        type: actionTypes.ADD_ITEMS_TO_CART_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

// ======================
// UPDATE CART ITEM
// ======================
export const updateCartItem =
  (reqData) => async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_CARTITEM_REQUEST,
    });

    try {
      const { data } = await api.put(
        "/api/cart/update",
        reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.UPDATE_CARTITEM_SUCCESS,
        payload: data,
      });

      // Refresh Cart
      dispatch(findCart(reqData.jwt));

    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_CARTITEM_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

// ======================
// REMOVE CART ITEM
// ======================
export const removeCartItem =
  ({ cartItemId, jwt }) =>
  async (dispatch) => {

    dispatch({
      type: actionTypes.REMOVE_CARTITEM_REQUEST,
    });

    try {
      await api.delete(
        `/api/cart/${cartItemId}/remove`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      dispatch({
        type: actionTypes.REMOVE_CARTITEM_SUCCESS,
        payload: cartItemId,
      });

      // Refresh Cart
      dispatch(findCart(jwt));

    } catch (error) {
      dispatch({
        type: actionTypes.REMOVE_CARTITEM_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };

// ======================
// CLEAR CART
// ======================
export const clearCartAction =
  () => async (dispatch) => {

    dispatch({
      type: actionTypes.CLEAR_CART_REQUEST,
    });

    try {
      const token = localStorage.getItem("jwt");

      const { data } = await api.put(
        "/api/cart/clear",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: actionTypes.CLEAR_CART_SUCCESS,
        payload: data,
      });

      // Refresh Cart
      dispatch(findCart(token));

    } catch (error) {
      dispatch({
        type: actionTypes.CLEAR_CART_FAILURE,
        payload: error.response?.data?.error || error.message,
      });
    }
  };