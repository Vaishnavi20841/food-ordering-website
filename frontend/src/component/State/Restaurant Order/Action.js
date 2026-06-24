import * as actionTypes from "./ActionType";

import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  GET_RESTAURANTS_ORDER_FAILURE,
} from "./ActionType";

 import { api } from "../../config/api";
import axios from "axios";


// ======================
// UPDATE ORDER STATUS
// ======================

export const updateOrderStatus =
  ({ orderId, orderStatus, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ORDER_STATUS_REQUEST,
      });

      const response = await api.put(
        `/api/admin/orders/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const updatedOrder = response.data;

      console.log(
        "updated order status",
        updateOrder
      );

      dispatch({
        type: UPDATE_ORDER_STATUS_SUCCESS,
        payload: updateOrder,
      });
    } catch (error) {
      console.log("update order error", error);

      dispatch({
        type: UPDATE_ORDER_STATUS_FAILURE,
        payload: error.message,
      });
    }
  };



  export const fetchRestaurantsOrder =
  ({ restaurantId, orderStatus, jwt }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_RESTAURANTS_ORDER_REQUEST,
      });

      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: {
            order_status: orderStatus,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const orders = data;

      console.log(
        "restaurants order ----- ",
        orders
      );

      dispatch({
        type: GET_RESTAURANTS_ORDER_SUCCESS,
        payload: orders,
      });

    } catch (error) {
      console.log(
        "fetch restaurants order error",
        error
      );

      dispatch({
        type: GET_RESTAURANTS_ORDER_FAILURE,
        payload: error.message,
      });
    }
  };

// export const getRestaurantsOrder =
//   ({ restaurantId, orderStatus, jwt }) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: GET_RESTAURANTS_ORDER_REQUEST,
//       });

//       const response = await api.get(
//         `/api/admin/order/restaurant/${restaurantId}`,
//         {
//           params: {
//             order_status: orderStatus,
//           },
//           headers: {
//             Authorization: `Bearer ${jwt}`,
//           },
//         }
//       );

//       console.log(
//         "restaurant orders",
//         response.data
//       );

//       dispatch({
//         type: GET_RESTAURANTS_ORDER_SUCCESS,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log("restaurant order error", error);

//       dispatch({
//         type: GET_RESTAURANTS_ORDER_FAILURE,
//         payload: error.message,
//       });
//     }
//   };